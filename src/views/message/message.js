import { getList } from './message.service'

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
        size: 20,
        total: 0,
      },
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
        keyword: this.search.keyword,
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
          nickname: 'lelk',
          email: '1947549029@qq.com',
          time: 1548221490638,
          message: '有事找你，收到请回复！'
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
    del (id) {
      const params = {
        'id': id
      }
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