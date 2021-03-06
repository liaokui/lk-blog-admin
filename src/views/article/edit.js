import ImgManage from '../../components/imgManage.vue'
import Tinymce from '../../components/tinymce.vue'
import { getToken } from '../../utils/auth.js'
import { addArticle, editArticle, getArticleDetail, getTagList } from './article.service'

export default {
  components: {
    ImgManage,
    Tinymce
  },
  data () {
    return {
      imgAction: '/api/upload',
      imgHeaders: {
        'Authorization': getToken()
      },
      loading: false,
      editForm: {
        id: null,
        title: null,
        author: null,
        tag: [],
        imgList: [],
        cover: null,
        content: 'Welcome to Use Tinymce Editor',
      },
      tagList: [],
      rules: {
        title: [
          { required: true, message: '标题不能为空!', trigger: 'blur' },
        ],
        author: [
          { required: true, message: '作者不能为空!', trigger: 'blur' },
        ],
        tag: [
          { required: true, message: '标签至少选一个!', trigger: 'change' },
        ],
        cover: [
          { required: true, message: '封面不能为空!', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '内容不能为空!', trigger: 'blur' },
        ]
      },
      msg: '',
      disabled: false,
    }
  },
  created () {
    if (this.$route.query && this.$route.query.id) {
      this.id = this.$route.query.id;
      this.mode = 'edit';
      this.getDetail();
    } else {
      this.mode = 'add';
      this.getTagList()
    }
  },
  methods: {
    // 获取标签列表
    getTagList() {
      this.tagList = []
      getTagList().then(res => {
        if (res && res.status === 'success') {
          this.tagList = res.data.map( tag => {
            return {
              value: tag._id,
              label: tag.tagName
            }
          })
        }
      }, error => {
        this.message.error(error)
        this.loading = false;
      });
    },
    // 获取文章详情
    getDetail() {
      const params = {
        'id': this.id
      }
      getArticleDetail(params).then( async res => {
        if (res && res.status === 'success') {
          let details = res.data
          this.editForm.title = details.title
          this.editForm.author = details.author
          this.editForm.cover = details.cover
          this.editForm.imgList = []
          this.editForm.imgList.push({
            name: '封面',
            url: details.cover
          })
          this.editForm.content = details.content
          await this.getTagList()
          this.editForm.tag = details.tagId.map(tag => {
            return tag._id
          })
        }
      }, error => {
        this.message.error(error)
      });
    },
    // 处理表单
    handleForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const params = {
            'title': this.editForm.title,
            'author': this.editForm.author,
            'tagId': this.editForm.tag,
            'content': this.editForm.content,
            'cover': this.editForm.cover,
          }
          if (this.mode === 'add') {
            this.add(params);
          } else {
            params.id = this.id;
            this.edit(params);
          }
        } else {
          return false;
        }
      })
    },
    // 添加文章
    add (params) {
      this.loading = true;
      addArticle(params).then(res => {
        if (res && res.status === 'success') {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.loading = false;
          this.resetForm()
        }
      }, error => {
        this.message.error(error)
        this.loading = false;
      });
    },
    // 编辑文章
    edit (params) {
      this.loading = true;
      editArticle(params).then(res => {
        if (res && res.status === 'success') {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.loading = false;
          this.resetForm()
          this.getDetail()
        }
      }, error => {
        this.message.error(error)
        this.loading = false;
      });
    },
    // 表单内容和验证重置
    resetForm() {
      this.$refs['editForm'].resetFields();
      this.editForm.imgList = []
    },
    imgHandleChange(file, fileList) {
      this.editForm.imgList = fileList.slice();
    },
    imgHandleSuccess(response) {
      this.editForm.cover = process.env.VUE_APP_imgReadUrl + response.url;
      this.$refs.editForm.validateField('imgList');
      this.$message({
        message: '封面图上传成功',
        type: 'success',
      });
    },
    imgHandleRemove() {
      this.editForm.imgList = [];
      this.editForm.cover = null;
    },
    imgHandleError() {
      this.$message.error('上传出错');
    },
    init () {
    }
  },
  mounted () {
  }
}