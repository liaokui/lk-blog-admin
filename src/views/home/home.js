import { getAmount, getHostTag } from './home.service'
import * as echarts from 'echarts'

export default {
  components: {},
  data () {
    return {
      articleAmount: 0,
      projectAmount: 0,
      messageAmount: 0,
      tagAmount: 0,
      currentTime: new Date(),
      dataList: [],
      colorList: ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C'],
      hostTagList: []
    }
  },
  created () {
    this.getAmountDate()
    this.getHostTagList()
  },
  methods: {
    getAmountDate () {
      getAmount().then(res => {
        if (res && res.status === 'success') {
          if (res.data && Array.isArray(res.data)) {
            this.dataList = res.data
            res.data.map(item => {
              if (item.type === 'article') {
                this.articleAmount = item.amount
              } else if(item.type === 'project') {
                this.projectAmount = item.amount
              } else if(item.type === 'message') {
                this.messageAmount = item.amount
              } else if(item.type === 'tag') {
                this.tagAmount = item.amount
              }
            })
            this.initPieChart()
          }
        }
      }, error => {
        this.message.error(error)
        this.loading = false;
      });
    },
    getHostTagList () {
      getHostTag().then(res => {
        if (res && res.status === 'success') {
          if (res.data && Array.isArray(res.data)) {
            this.hostTagList = res.data
            this.initLinearChart()
          }
        }
      }, error => {
        this.message.error(error)
        this.loading = false;
      });
    },
    initPieChart() {
      const pieChart = echarts.init(document.getElementById('pieChart'))
      const pieObj = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 10,
            data: this.dataList.map( item => item.label )
        },
        series: [
            {
                name: '饼状图',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: this.dataList.map( (item, index) => {
                  return {
                    value: item.amount,
                    name: item.label,
                    itemStyle: {
                      color: this.colorList[index]
                    }
                  }
                })
            }
        ]
      }
      pieChart.setOption(pieObj)
    },
    initLinearChart() {
      const linearChart = echarts.init(document.getElementById('linearChart'))
      const linearObj = {
        tooltip: {},
        legend: {},
        xAxis: { type: 'category' },
        yAxis: {},
        series: [
          {
            type: 'bar',
            color: '#E6A23C',
          },
          {
            type: 'bar',
            color: '#F56C6C',
          }
        ],
        dataset: {
          source: this.hostTagList
        },
      }
      linearChart.setOption(linearObj)
    },
    init () {
      setInterval(() => {
        this.currentTime = new Date()
      }, 1000)
    }
  },
  mounted () {
    this.$nextTick(function() {
      this.init();
    });
  }
}