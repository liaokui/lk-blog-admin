<template>
  <div id='message'>
    <div class="search">
      <el-form label-width="60px" :inline="true">
        <el-form-item label="关键词:">
					<el-input placeholder="请输入内容" size="small" v-model="search.keyword"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="small" @click="getPage(1)">搜索</el-button>
				</el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table v-loading="loading" :data="list" border fit highlight-current-row style="width: 100%">
        <el-table-column align="center" label="ID" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column width="160px" align="center" label="时间">
          <template slot-scope="scope">
            <span>{{ scope.row.time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>

        <el-table-column width="100px" align="center" label="昵称">
          <template slot-scope="scope">
            <span>{{ scope.row.nickname }}</span>
          </template>
        </el-table-column>

        <el-table-column width="180px" label="邮箱">
          <template slot-scope="scope">
            <span>{{ scope.row.email }}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="300px" label="留言">
          <template slot-scope="scope">
            <span>{{ scope.row.message }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="danger" size="small" icon="el-icon-delete" @click="del(scope.row.is)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
          background
          @current-change="getPage"
          layout="total, prev, pager, next, jumper"
          :current-page.sync="page.num"
          :page-size="page.size"
          :total="page.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import index from './message'
  export default index
</script>
<style rel='stylesheet/scss' scoped lang='scss'>
  @import './message.scss';
</style>