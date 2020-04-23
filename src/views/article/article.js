import { getArticleList, removeArticle, publishArticle  } from './article.service'
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
        size: 10,
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
    // 分页获取文章列表
    getPage(page) {
      this.page.num = page ? page : this.page.num;
      this.list = [];
      let params = {
        keyword: this.search.keyword,
        status: this.search.status,
        pageSize: this.page.size,
        pageNumber: this.page.num,
      };
      this.loading = true;
      getArticleList(params).then(res => {
        if (res && res.status === 'success') {
          if (res.data && res.data.list && Array.isArray(res.data.list)) {
            this.list = res.data.list.map( item => {
              return item
            })
            this.page.total = res.data.count;
            this.loading = false;
          }
        }
      }, error => {
        this.loading = false;
        this.$message.error(error);
      });
    },
    // 删除文章
    del (id) {
      const params = {
        'id': id
      }
      removeArticle(params).then(res => {
        if (res && res.status === 'success') {
          this.getPage()
          this.$message({
            message: res.msg,
            type: 'success'
          })
        }
      }, error => {
        this.message.error(error)
      });
    },
    // 发布 or 撤销发布
    publish(id, status) {
      const params = {
        'id': id,
        'status': status,
      }
      publishArticle(params).then(res => {
        if (res && res.status === 'success') {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.getPage(1)
        }
      }, error => {
        this.message.error(error)
        this.loading = false;
      });
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