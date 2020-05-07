import { getMessageList, removeMessage } from './message.service'

export default {
  components: {},
  data () {
    return {
      loading: false,
      list: [],
      search: {
        keyword: null,
      },
      page: {
        num: 1,
        size: 10,
        total: 0,
      },
    }
  },
  created () {
    this.getPage(1);
  },
  methods: {
    // 分页获取留言列表
    getPage (page) {
      this.page.num = page ? page : this.page.num;
      this.list = [];
      let params = {
        keyword: this.search.keyword,
        pageSize: this.page.size,
        pageNumber: this.page.num,
      };
      this.loading = true;
      getMessageList(params).then(res => {
        if (res && res.status === 'success') {
          if (res.data && res.data.list && Array.isArray(res.data.list)) {
            this.list = res.data.list.map(item => {
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
    // 删除留言
    del (id) {
      const params = {
        'id': id
      }
      this.$confirm('此操作将删除该留言, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeMessage(params).then(res => {
          if (res && res.status === 'success') {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.getPage(1)
          }
        }, error => {
          this.message.error(error)
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
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