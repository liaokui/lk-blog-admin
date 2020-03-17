<template>
  <div id='home'>
    <header>
      <p>blog</p>
    </header>
    <section>
      <div id="productList"
           class="clearfix">
        <el-row :gutter="60">
          <el-col :span="8"
                  v-for="(o, index) in productList"
                  :key="index">
            <div class="product">
              <div class="imgBox">
                <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                     alt="">
              </div>
              <p>标题标题标题标题标题</p>
              <div class="labelBox clearfix">
                <span>标签1</span>
                <span>标签2</span>
                <span>标签3</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <svg width="883px"
           height="584px"
           viewBox="0 0 883 584"
           version="1.1"
           xmlns="http://www.w3.org/2000/svg"
           xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
          <linearGradient x1="50%"
                          y1="0%"
                          x2="50%"
                          y2="100%"
                          id="a">
            <stop stop-color="#F7FAFC"
                  offset="0%"></stop>
            <stop stop-color="#DFEBF7"
                  offset="100%"></stop>
          </linearGradient>
        </defs>
        <path d="M835.746-2.683c58.652 62.415 62.704 127.241 12.158 194.48C772.084 292.655 402.786 394.5 283.349 387.5 203.725 382.833 108.61 449-2 586V-14L835.746-2.683z"
              fill="url(#a)"
              fill-rule="evenodd"></path>
      </svg>
    </section>
    <footer>
      <p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
    </footer>
  </div>
</template>
<script>
  import index from './home'
  export default index
</script>
<style rel='stylesheet/scss' lang='scss'>
@import './home.scss';
</style>


