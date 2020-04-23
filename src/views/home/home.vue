<template>
  <div id='home'>
    <div class="totalData">
      <el-row :gutter="50">
        <el-col :span="15">
          <el-row :gutter="20" class="numData">
            <el-col :span="12">
              <el-card class="box-card">
                <div class="total clearfix">
                  <div class="info">
                    <p class="title">文章</p>
                    <p class="num">{{ articleAmount }}</p>
                  </div>
                  <div class="icon">
                    <i class="iconfont iconarticle"></i>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="box-card">
                <div class="total clearfix">
                  <div class="info">
                    <p class="title">项目</p>
                    <p class="num">{{ projectAmount }}</p>
                  </div>
                  <div class="icon">
                    <i class="iconfont iconproject"></i>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="box-card">
                <div class="total clearfix">
                  <div class="info">
                    <p class="title">留言</p>
                    <p class="num">{{ messageAmount }}</p>
                  </div>
                  <div class="icon">
                    <i class="iconfont iconmessage"></i>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="box-card">
                <div class="total clearfix">
                  <div class="info">
                    <p class="title">标签</p>
                    <p class="num">{{ tagAmount }}</p>
                  </div>
                  <div class="icon">
                    <i class="iconfont icontag"></i>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="9">
          <div class="date">
             <el-card class="box-card">
               <div slot="header" class="clearfix">
                  <span>当前时间</span>
               </div>
               <div class="time clearfix">
                 <div class="left">
                    <div class="md">
                      <p class="month">{{ currentTime | parseTime('{m}') }}月</p>
                      <p class="day">{{ currentTime | parseTime('{d}') }}</p>
                      <p class="week">星期 {{ currentTime | parseTime('{a}') }}</p>
                    </div>
                 </div>
                 <div class="right">
                   <p>{{ currentTime | parseTime('{h}:{i}:{s}') }}</p>
                 </div>
               </div>
             </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="chartBox">
      <el-row :gutter="50">
        <el-col :span="9">
           <el-card class="box-card">
             <div id="pieChart"></div>
           </el-card>
        </el-col>
        <el-col :span="15">
          <el-card class="box-card">
             <div id="linearChart"></div>
           </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import index from './home'
  export default index
</script>
<style rel='stylesheet/scss' lang='scss'>
  #home{
    .totalData {
        .numData {
          .el-card__body {
            padding: 0;
          }
          .el-col {
            &:nth-child(1) {
              .total {
                border-left: 4px solid #67c23a;
                .info p.title {
                    color: #67c23a;
                }
              }
            }
            &:nth-child(2) {
              .total {
                border-left: 4px solid #409eff;
                .info p.title {
                    color: #409eff;
                }
              }
            }
            &:nth-child(3) {
              margin-top: 20px;
              .total {
                border-left: 4px solid #e6a23c;
                .info p.title {
                    color: #e6a23c;
                }
              }
            }
            &:nth-child(4) {
              margin-top: 20px;
              .total {
                border-left: 4px solid #f56c6c;
                .info p.title {
                    color: #f56c6c;
                }
              }
            }
          }
        }
    }
  }


</style>
<style rel='stylesheet/scss' scoped lang='scss'>
  @import './home.scss';
</style>