<template>
  <div id='articleEdit'>
    <el-form :model="editForm" :rules="rules" ref="editForm" label-width="80px" class="editForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="标题:" prop="title">
            <el-input v-model="editForm.title"></el-input>
          </el-form-item>
        </el-col>  
        <el-col :span="12">
           <el-form-item label="作者:" prop="author">
            <el-input v-model="editForm.author"></el-input>
          </el-form-item>
        </el-col>  
      </el-row>  
      
     
      <el-form-item label="标签:" prop="tag">
        <el-select v-model="editForm.tag" multiple placeholder="请选择" style="width: 100%">
          <el-option
            v-for="item in tagList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="封面:" prop="cover" class="is-required">
					<el-upload
							class="upload-demo"
							:action="imgAction"
							:on-change="imgHandleChange"
							:on-success="imgHandleSuccess"
							:on-remove="imgHandleRemove"
							:on-error="imgHandleError"
							:limit='1'
							list-type="picture"
							:file-list="editForm.imgList">
						<el-button size="mini" type="primary" class="btn-primary">选择图片上传</el-button>
						<span slot="tip" class="upload-span" style="margin-left: 10px">
							只能上传jpg/png文件，且不超过500kb</span>
					</el-upload>
      </el-form-item>
      <el-form-item label="正文:" prop="content">
        <tinymce
          ref="editor"
          v-model="editForm.content"
          :disabled="disabled"></tinymce>
      </el-form-item>
      <el-form-item>
        <router-link :to="{ path: '/manage/article'}">
					<el-button>返回</el-button>
				</router-link>
				<el-button type="primary" :loading="loading" @click="handleForm('editForm')" style="margin-left: 20px">确 定
				</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import index from './edit'
  export default index
</script>
<style rel='stylesheet/scss' scoped lang='scss'>
  @import './article.scss';
</style>