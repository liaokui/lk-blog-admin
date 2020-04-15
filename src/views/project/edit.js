import ImgManage from '../../components/imgManage.vue'
import Tinymce from '../../components/tinymce.vue'

export default {
  components: {
    ImgManage,
    Tinymce
  },
  data () {
    return {
      imgAction: '/api/upload',
      loading: false,
      editForm: {
        id: null,
        title: null,
        tag: [],
        imgList: [],
        cover: null,
        githubAddress: null,
        showAddress: null,
        introduction: null,
        content: 'Welcome to Use Tinymce Editor',
      },
      tagList: [
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
      ],
      rules: {
        title: [
          { required: true, message: '标题不能为空!', trigger: 'blur' },
        ],
        introduction: [
          { required: true, message: '简介不能为空!', trigger: 'blur' },
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
      this.getDetail(this.id);
    } else {
      this.mode = 'add';
    }
  },
  methods: {
    getDetail(id) {
      // const params = {
      //   'id': this.id
      // }
      let details = {
        content: '<p>Welcome to Use Tinymce Editor</p><p>文章详情描述！</p><p><img class="wscnph" src="http://150.109.105.237:7001/public/uploads/dfa0e943fd590cb8db900bba6cab25ca.jpg" /></p>',
        cover: "http://150.109.105.237:7001/public/uploads/46fa23ea8d48e73cfb743d623c3e6661.jpg",
        tag: '1,2',
        title: "cs",
        githubAddress: 'www.baoidu.com',
        showAddress: 'www.baoidu.com',
        introduction: '项目简介项目简介项目简介项目简介项目简介项目简介',
      }
      this.editForm.title = details.title
      this.editForm.cover = details.cover
      this.editForm.githubAddress = details.githubAddress
      this.editForm.showAddress = details.showAddress
      this.editForm.introduction = details.introduction
      this.editForm.tag = details.tag.split(',').map( val => parseInt(val)) 
      this.editForm.imgList = []
      this.editForm.imgList.push({
        name: '封面',
        url: details.cover
      })
      this.editForm.content = details.content
      // getCaptcha(params).then(res => {
        
      // }, error => {
      //   this.message.error(error)
      //   this.loading = false;
      // });
    },
    handleForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const params = {
            'title': this.editForm.title,
            'githubAddress': this.editForm.githubAddress,
            'showAddress': this.editForm.showAddress,
            'introduction': this.editForm.introduction,
            'tag': this.editForm.tag.join(','),
            'content': this.editForm.content,
            'cover': this.editForm.cover,
          }
          console.log(params)
          // addArticle(params).then(res => {
          //   if (res.code === 200) {
              
          //   }
          // }, error => {
          //   this.message.error(error)
          //   this.loading = false;
          // });
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
    add (params) {
      params
    },
    edit (params) {
      params
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