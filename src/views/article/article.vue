<template>
  <div id='article'>
    <div class="search">
      <el-form label-width="60px" :inline="true">
        <el-form-item label="状态:">
          <el-radio-group v-model="search.status" size="small" @change="getPage">
            <el-radio-button v-for="(item, index) in statusList" :key="index" :label="item.value">{{ item.label }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="关键词:">
					<el-input placeholder="请输入内容" size="small" clearable v-model="search.keyword"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="small" @click="getPage(1)">搜索</el-button>
				</el-form-item>
        <el-form-item>
					<el-button class="addBtn" type="success"  size="small">
            <router-link :to="{'path': '/manage/article/edit'}">添加文章</router-link>
          </el-button>
				</el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table v-loading="loading" :data="list" border fit highlight-current-row style="width: 100%">
        <el-table-column align="center" label="ID" width="210">
          <template slot-scope="scope">
            <span>{{ scope.row._id }}</span>
          </template>
        </el-table-column>

        <el-table-column width="160px" align="center" label="时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>

        <el-table-column width="100px" align="center" label="作者">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>

        <el-table-column width="180px" label="标签">
          <template slot-scope="scope">
            <el-tag v-for="(tag, index) in scope.row.tagId" :key="index" size="mini">
              {{ tag.tagName }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column class-name="status-col" label="状态" width="90">
          <template slot-scope="{row}">
            <el-tag :type="row.status | statusFilter('showType')">
              {{ row.status | statusFilter('label') }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column min-width="300px" label="标题">
          <template slot-scope="{row}">
            <router-link :to="'/example/edit/'+row.id" class="link-type">
              <span>{{ row.title }}</span>
            </router-link>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="220">
          <template slot-scope="scope">
            <router-link v-if="scope.row.status === 0" :to="{'path': '/manage/article/edit', 'query': {'id': scope.row._id}}">
              <el-button type="primary" size="mini">
                编辑
              </el-button>
            </router-link>
            <el-button v-if="scope.row.status === 0" type="success" size="mini" @click="publish(scope.row._id, 1)">发表</el-button>
            <el-button v-if="scope.row.status === 1" type="warning" size="mini" @click="publish(scope.row._id, 0)">撤销发表</el-button>
            <el-button v-if="scope.row.status === 0" type="danger" size="mini" @click="del(scope.row._id)">删除</el-button>
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
  import index from './article'
  export default index
</script>
<style rel='stylesheet/scss' lang='scss'>
  #article {
    .search {
      .el-form-item:last-child {
        float: right;
        margin-right: 0;
      }
    }
    .table {
      .el-tag {
        margin-right: 5px;
      }
      .el-button {
        margin-left: 10px;
      }
    }
  }
</style>
 
<style rel='stylesheet/scss' scoped lang='scss'>
  @import './article.scss';
</style>
