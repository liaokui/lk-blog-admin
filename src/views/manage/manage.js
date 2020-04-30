import { removeToken, removeUid, removeUsername } from '../../utils/auth'
import { getMessageList } from './manage.server'

export default {
  components: {},
  data () {
    return {
      productList: [1, 2, 3, 4, 5, 6],
      isCollapse: false,
      message: {}
    }
  },
  computed: {
    routerIndex () {
      return this.$route.meta.belong
    },
    navigation () {
      return this.$route.meta.navigation.map((nav, index, arr) => {
        if (this.$route.query && Object.keys(this.$route.query).length > 0 && index === arr.length - 1) {
          nav.label = '编辑'
        }
        return nav
      })
    }
  },
  created () {
    this.getNewMessage()
  },
  methods: {
    handleSelect () {
      this.isCollapse = false
    },
    // 获取最新留言
    getNewMessage () {
      let params = {
        pageSize: 1,
        pageNumber: 1,
      };
      getMessageList(params).then(res => {
        if (res && res.status === 'success') {
          if (res.data && res.data.list && Array.isArray(res.data.list)) {
            this.message = res.data.list[0]
          }
        }
      }, error => {
        this.$message.error(error);
      });
    },
    signOut () {
      removeToken()
      removeUsername()
      removeUid()
      this.$router.push({path: '/login'});
    }
  },
  mounted () {
   
  }
}
