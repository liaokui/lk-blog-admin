<template>
  <div id='manage'>
    <div class="menu" :style="{'width': isCollapse ? '56px':'210px'}">
      <p class="title" :style="{'color': isCollapse ? 'transparent':'#ffffff'}">LK-blog后台管理</p>
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu :default-active="routerIndex"
                :collapse="isCollapse"
                background-color="#304156"
                text-color="#bfcbd9"
                active-text-color="#409EFF"
                mode="vertical"
                @select="handleSelect">
            <el-menu-item index="home">
                <i class="iconfont iconhome menuIcon"></i>
                <router-link :to="{'path': '/manage/home'}">首页</router-link>
            </el-menu-item>
            <el-menu-item index="article">
              <i class="iconfont iconarticle menuIcon"></i>
              <router-link :to="{'path': '/manage/article'}">文章管理</router-link>
            </el-menu-item>
            <el-menu-item index="project">
              <i class="iconfont iconproject menuIcon"></i>
              <router-link :to="{'path': '/manage/project'}">项目管理</router-link>
            </el-menu-item>
            <el-menu-item index="message">
              <i class="iconfont iconmessage menuIcon"></i>
              <router-link :to="{'path': '/manage/message'}">留言管理</router-link>
            </el-menu-item>
            <el-menu-item index="tag">
              <i class="iconfont icontag menuIcon"></i>
              <router-link :to="{'path': '/manage/tag'}">标签管理</router-link>
            </el-menu-item>
          </el-menu>
      </el-scrollbar>
    </div>
    <div class="main" :style="{'marginLeft': isCollapse ? '56px':'210px','width': isCollapse ? 'calc(100% - 56px)':'calc(100% - 210px)'}">
      <el-scrollbar>
        <div class="header clearfix">
          <div class="leftItem collapseBtn">
            <i :class="isCollapse ? 'el-icon-s-unfold':'el-icon-s-fold'" @click="isCollapse = !isCollapse"></i>
          </div>
          <div class="leftItem">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item v-for="(item, index) in navigation" :key="index">
                <router-link  v-if="index !== navigation.length - 1" :to="{'path': item.link}">{{ item.label }}</router-link>
                <span v-if="index === navigation.length - 1">{{ item.label }}</span>
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="rightItem exit">
            <span @click="signOut()">退出登录</span>
          </div>
          <div class="rightItem welcome">
             <p>欢迎，<span>Admin</span></p>
          </div>
        </div>
        <div class="message">
            <p class="news clearfix">
              <i class="iconfont iconmessage tag"></i>
              <span>{{ message.nickname }}</span>
              <span>({{ message.email }})</span>
              <span>[{{ message.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}]</span>
              <span>留言  <i class="el-icon-arrow-right"></i></span>
            </p>
        </div> 
        <div class="content">
          <router-view></router-view>
        </div>
        <div class="footer">
          <p>Copyright © 2020 LK. All rights reserved.</p>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
  import index from './manage'
  export default index
</script>
<style rel='stylesheet/scss' lang="scss">
  #manage {
    .el-menu {
      border-right: solid 1px #304156;
    }
    .el-scrollbar {
      height: 100%;
      .el-scrollbar__wrap {
        overflow-x: hidden;
        .el-backtop i {
          display: block;
          width: 100%;
          height: 40px;
          font-size: 20px;
          font-weight: bold;
          line-height: 44px;
          text-align: center;
          cursor: pointer;
        }
      }
    }
    .scrollbar-wrapper {
      overflow-x: hidden !important;
    }
    .el-breadcrumb {
      line-height: 30px;
      font-size: 14px;
    }
  }
</style>
<style rel='stylesheet/scss' scoped lang='scss'>
    @import './manage.scss';
</style>


