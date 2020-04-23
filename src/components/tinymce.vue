<template>
	<div id="tinymce">
		<editor v-model="myValue"
      :id="tinymceId"
      :init="init"
      :disabled="disabled">
    </editor>
    <el-dialog
      title="提示"
      :visible.sync="uploadImgDialog.status"
      width="672px">
      <img-manage ref="imgManage" :action="imgAction" :imgList="imgList"></img-manage>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()">取 消</el-button>
        <el-button type="primary" @click="addImg()">确 定</el-button>
      </span>
    </el-dialog>
	</div>
</template>

<script>
import ImgManage from '../components/imgManage.vue'
import tinymce from 'tinymce/tinymce' //tinymce默认hidden，不引入不显示
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
// 编辑器插件plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import 'tinymce/plugins/image'// 插入上传图片插件
import 'tinymce/plugins/media'// 插入视频插件
import 'tinymce/plugins/table'// 插入表格插件
import 'tinymce/plugins/lists'// 列表插件
import 'tinymce/plugins/wordcount'// 字数统计插件
export default {
	components:{
    Editor,
    ImgManage
	},
	name:'tinymce',
	props: {
    id: {
      type: String,
      default: function() {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: 'lists image media table wordcount uploadImg'
    },
    toolbar: {
      type: [String, Array],
      default: 'undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table uploadImg | removeformat'
    },
    height: {
      type: [Number, String],
      required: false,
      default: 500
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    }
	},
	data(){
		return{
      imgAction: '/api/upload',
      tinymceId: this.id,
			init: {
        language_url: '/static/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/static/tinymce/skins/ui/oxide',
        // skin_url: '/js/skins/ui/oxide-dark',//暗色系
        width: this.width,
        height: this.height,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false
      },
      myValue: this.value,
      uploadImgDialog: {
        title: null,
        status: null,
      },
      imgList: [],
		}
  },
  created() {
    this.addPlugins()
  },
	mounted () {
    
	},
	methods: {
    addPlugins() {
      let that = this
      tinymce.PluginManager.add('uploadImg', function(editor) {
        var openDialog = function () {
            that.openDialog()
        };
        
        // 注册一个工具栏按钮名称
        editor.ui.registry.addButton('uploadImg', {
          icon: 'upload',
          tooltip: '上传图片',
          onAction: function () {
            openDialog();
          }
        });

        // 注册一个菜单项名称 menu/menubar
        editor.ui.registry.addMenuItem('uploadImg', {
          icon: 'upload',
          text: '上传图片',
          onAction: function() {
            openDialog();
          }
        });

        return {
          getMetadata: function () {
            return  {
              name: "uploadImg",
            };
          }
        };
      });
    },
    openDialog() {
      this.imgList = []
      this.uploadImgDialog.status = true
    },
    closeDialog() {
      this.uploadImgDialog.status = false
      this.imgList = []
    },
    addImg() {
      this.imageSuccessCBK(this.imgList)
      this.closeDialog()
    },
    imageSuccessCBK(arr) {
      const _this = this
      arr.forEach( img => {
        if(img.response){
          window.tinymce.get(_this.tinymceId).insertContent(`<img class="wscnph" src="${process.env.VUE_APP_imgReadUrl + img.response.url}" >`)
        }
      })
    }
	},
	watch: {
    value (newValue) {
      this.myValue = newValue
    },
    myValue (newValue) {
      this.$emit('input', newValue)
    }
	}
}
	
</script>
<style rel='stylesheet/scss' lang='scss'>
  #tinymce{
    .el-dialog__body {
        padding: 0px 20px 10px 20px;
    }
  }
</style>