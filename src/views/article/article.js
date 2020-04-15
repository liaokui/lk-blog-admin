import { getList } from './article.service'
import { StatusList } from '../../utils/common'

export default {
  components: {},
  data () {
    return {
      loading: false,
      list: [],
      search: {
        keyword: null,
        status: null,
      },
      page: {
        num: 1,
        size: 20,
        total: 0,
      },
    }
  },
  computed: {
    statusList () {
      let list = StatusList.slice()
      list.unshift({
        label: '全部',
        value: null
      })
      return list
    }
  },
  filters: {
    statusFilter (status, key) {
      return StatusList.filter( item => {
        return status === item.value
      })[0][key]
    }
  },
  created () {
    this.getPage(1);
  },
  methods: {
    getPage (page) {
      this.page.num = page ? page : this.page.num;
      this.list = [];
      let params = {
        status: this.search.status,
        pageSize: this.page.size,
        pageNumber: this.page.num - 1,
      };
      // this.loading = true;
      // getList(params).then(res => {
        // if (res && res.list && Array.isArray(res.list)) {
        //   this.list = res.list.map( item => {
        //     return item
        //   })
        this.list.push({
          id: 1,
          title: '项目不知道如何做性能优化？不妨试一下代码分割',
          author: 'LELK',
          time: 1548221490638,
          status: 1,
          tag: [
            {
              label: 'HTML',
              value: 1
            },
            {
              label: 'CSS',
              value: 2
            },
            {
              label: 'JavaScript',
              value: 3
            },
            {
              label: 'Vue',
              value: 4
            },
            {
              label: 'Element-ui',
              value: 5
            },
          ],
          cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
        })
      this.page.total = 1;
          // this.page.total = res.total;
      //     this.loading = false;
      //   // }
      // }, error => {
      //   this.loading = false;
      //   this.$message.error(error);
      // });
    },
    init () {
    }
  },
  mounted () {
    this.$nextTick(function() {
      this.init();
    });
  }
}