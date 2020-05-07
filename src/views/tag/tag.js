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
      this.$confirm('此操作将删除该标签, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
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