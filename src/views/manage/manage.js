export default {
  components: {},
  data () {
    return {
      productList: [1, 2, 3, 4, 5, 6],
      isCollapse: false,
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
  },
  methods: {
    handleSelect () {
      this.isCollapse = false
    },
    signOut () {
      
    }
  },
  mounted () {
   
  }
}
