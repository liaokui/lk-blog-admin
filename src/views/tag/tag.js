export default {
  components: {},
  data () {
    return {
      tagList: [],
      tagVisible: false,
      tagValue: null,
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.tagList = []
      this.tagList = [
        {
          label: '标签1',
          value: 1
        },
        {
          label: '标签2',
          value: 2
        },
        {
          label: '标签3',
          value: 3
        },
        {
          label: '标签4',
          value: 4
        }
      ]
      this.tagList = this.tagList.map((tag, index) => {
        let type
        if (index % 4 === 0) {
           type = null
        } else if (index % 4 === 1) {
           type = 'success'
        } else if (index % 4 === 2) {
           type = 'warning'
        } else {
           type = 'danger'
        }
        return {
          type,
          ...tag
        }
      })
      // getCaptcha(params).then(res => {
        
      // }, error => {
      //   this.message.error(error)
      //   this.loading = false;
      // });
    },
    showAddInput () {
      this.tagValue = null
      this.tagVisible = true
      setTimeout(() => {
        this.$refs.saveTagInput.focus()
      }, 1)
    },
    add () {
      if (this.tagValue) {
        const params = {
          'tag': this.tagValue
        }
        // getCaptcha(params).then(res => {
          
        // }, error => {
        //   this.message.error(error)
        //   this.loading = false;
        // });
        console.log(params)
        this.tagVisible = false
      }
    },
    del (id) {
      const params = {
        'id': id
      }
      console.log(params)
      // getCaptcha(params).then(res => {
        
      // }, error => {
      //   this.message.error(error)
      //   this.loading = false;
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