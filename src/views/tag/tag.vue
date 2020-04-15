<template>
  <div id='tag'>  
    <div class="tagList">
      <el-tag
        v-for="(tag, index) in tagList"
        closable :key="index"
        :type="tag.type"
        :disable-transitions="false"
        @close="del(tag.value)">{{tag.label}}</el-tag>
      <el-input
        v-if="tagVisible"
        v-model="tagValue"
        ref="saveTagInput"
        size="small"
        style="width: 120px"
        @keyup.enter.native="add()"
        @blur="add()">
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showAddInput()">+ 添加</el-button>
    </div>
  </div>
</template>
<script>
  import index from './tag'
  export default index
</script>
<style rel='stylesheet/scss' scoped lang='scss'>
  @import './tag.scss';
</style>