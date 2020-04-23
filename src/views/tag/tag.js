import { getTagList, createTag, removeTag} from './tag.service'

export default {
  components: {},
  data () {
    return {
      list: [],
      tagVisible: false,
      tagValue: null,
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 获取标签列表
    getList () {
      this.list = []
      getTagList().then(res => {
        if (res && res.status === 'success') {
          if (res.data && Array.isArray(res.data)) {
            this.list = res.data.map((tag, index) => {
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
          }
        }
      }, error => {
        this.message.error(error)
      });
    },
    // 显示添加框
    showAddInput () {
      this.tagValue = null
      this.tagVisible = true
      setTimeout(() => {
        this.$refs.saveTagInput.focus()
      }, 1)
    },
    // 新增
    add () {
      if (this.tagValue) {
        const params = {
          'tagName': this.tagValue
        }
        createTag(params).then(res => {
          if (res && res.status === 'success') {
            this.getList()
            this.$message({
              message: res.msg,
              type: 'success'
            })
          }
        });
        this.tagVisible = false
      }
    },
    // 删除
    del (id) {
      const params = {
        'id': id
      }
      removeTag(params).then(res => {
        if (res && res.status === 'success') {
          this.getList()
          this.$message({
            message: res.msg,
            type: 'success'
          })
        }
      }, error => {
        this.message.error(error)
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