<template>
	<div id="imgmanage">
		<div class="box">
			<div class="info clearfix">
				<p>{{totalNum}}张图片。<span>{{ word }}</span></p>
			</div>
			<div class="list">
				<ul class="clearfix" ref="imgBox" id="imgBox" @dragover="ondragover($event)" @drop="drop($event)">
					<li class="imgLi" v-for="(item, index) in unFileList" :key="index" draggable="true" @drag="drag($event)" @mousedown="getCoordinate($event)">
						<img :src="item.url" alt="" :id="item.uid">
						<span>
              <i class="icon el-icon-delete" @click="clearFile(item.uid, item.id)"></i>
            </span>
						<p v-if="item.status==='success'">
							<i class="el-icon-check"></i>
						</p>
						<div class="progress" v-if="item.percent > 0 && item.percent < 100">
							<el-progress :width="88" type="circle" :percentage="item.percent" style="margin: 11px 10px"></el-progress>
						</div>
					</li>
					<li class="add">
						<el-upload
								class="upload-demo"
								ref="upload"
								:headers="uploadHeaders"
								:action="imgApiUrl"
								:multiple="true"
								:on-change="onChange"
								:on-progress="uploading"
								:on-success="handleSuccess"
								:on-remove="handleRemove"
								:on-error="handleError"
								:file-list="fileList"
								list-type="picture"
								:auto-upload="false">
							<el-button slot="trigger" size="small" class="addBtn">继续添加</el-button>
							<el-button slot="tip" :loading="loading" type="primary" size="small" class="subBtn btn-primary" @click="submitUpload()">开始上传
							</el-button>
							<i slot="trigger" class="icon el-icon-plus"></i>
						</el-upload>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>

  import $ from 'jquery';
  import {getToken} from '@/utils/auth';

  export default {
    name: 'imgManage',
    props: {
      action: {
        type: String,
        default: () => {
          return null;
        },
      },
      imgList: {
        type: Array,
        default: () => {
          return [];
        },
      },
      isHeader: {
        type: Boolean,
        default: () => {
          return true;
        },
      },
      promptText: {
        type: String,
        default: () => {
          return '';
        },
      }
    },
    data() {
      return {
        loading: false,
        fileList: [],
        totalSize: 0,
        mouseOneLength: 0,
      };
    },
    computed: {
      imgApiUrl() {
        return this.action;
      },
      unFileList() {
        return this.imgList;
      },
      totalNum() {
        return this.imgList.length;
      },
      uploadHeaders(){
				return this.isHeader ? {
					'Authorization': 'Bearer ' + getToken(),
				} : {}
      },
      word() {
        return this.promptText;
      }
    },
    methods: {
      // 上传服务器
      submitUpload() {
        this.$refs.upload.submit();
      },
      // 上传服务器成功钩子
      handleSuccess(response, file) {
        let imgObj;
        this.loading = false;
        this.$emit('validate-change');
        for (let i = 0; i < this.unFileList.length; i++) {
          if (this.unFileList[i].uid === file.uid) {
            imgObj = document.getElementById(this.unFileList[i].uid);
            file.trimSize = {
              width: imgObj.naturalWidth,
              height: imgObj.naturalHeight,
            };
            this.unFileList.splice(i, 1, file);
            return true;
          }
        }
      },
      // 删除图片钩子
      handleRemove() {

      },
      // 上传服务器失败钩子
      handleError(err, file) {
        this.loading = false;
        this.$message({
          message: '上传失败,请重试!',
          type: 'warning',
        });
        for (let i = 0; i < this.unFileList.length; i++) {
          if (this.unFileList[i].uid === file.uid) {
            this.unFileList.splice(i, 1);
            return true;
          }
        }
        this.loading = false;
      },
      // 上传服务器过程钩子
      uploading(event, file) {
        this.loading = true;
        for (let i = 0; i < this.unFileList.length; i++) {
          if (this.unFileList[i].uid === file.uid) {
            file.percent = parseInt(event.percent);
            this.unFileList.splice(i, 1, file);
            return true;
          }
        }
      },
      // 选择图片 上传 上传完成钩子
      onChange(file) {
        if (file.status === 'fail') {
          return true;
        }
        let isSame = false;
        for (let i = 0; i < this.unFileList.length; i++) {
          if (this.unFileList[i].uid === file.uid) {
            this.unFileList.splice(i, 1, file);
            isSame = true;
            return true;
          }
        }
        if ( !isSame) {
          this.unFileList.push(file);
        }
        this.$emit('validate-change');
      },
      // 删除图片
      clearFile(uid, id) {
        for (let i = 0; i < this.unFileList.length; i++) {
          if (uid && this.unFileList[i].uid === uid) {
            this.$refs.upload.handleRemove(this.unFileList[i]);
            this.unFileList.splice(i, 1);
            return true;
          }
          if (id && this.unFileList[i].id === id) {
            this.$refs.upload.handleRemove(this.unFileList[i]);
            this.unFileList.splice(i, 1);
            return true;
          }
        }
      },
      // 删除所有图片
      clearAllFile() {
        for (let i = 0; i < this.unFileList.length; i++) {
          this.$refs.upload.handleRemove(this.unFileList[i]);
        }
      },
      getCoordinate($event) {
        this.mouseOneLength = $($event.target).offset().left + 55 - $event.pageX;
      },
      drag($event) {
        $($event.target).parents('li').addClass('current');
      },
      ondragover($event) {
        if ($($event.target)[0].tagName == 'IMG') {
          let that = $($event.target).parents('li');
          // let left = that.offset().left;
          $('#imgBox .imgLi').removeClass('leftShadow').removeClass('rightShadow');
          if ($event.pageX - that.offset().left - 55 + this.mouseOneLength > 0) {
            that.addClass('rightShadow');
          } else {
            that.addClass('leftShadow');
          }
          $('#imgBox .current').removeClass('leftShadow').removeClass('rightShadow');
        }
        $event.preventDefault();
      },
      drop($event) {
        $event.preventDefault();
        if ($($event.target)[0].tagName == 'IMG' && !$($event.target).parents('li.imgLi').hasClass('current')) {
          let one = $('#imgBox .current').index();
          let two = $($event.target).parents('li.imgLi').index();
          let isLeft = $event.pageX - $($event.target).parents('li').offset().left - 55 + this.mouseOneLength < 0;
          this.transposition(one, two, isLeft);
        }
        $('#imgBox li').removeClass('leftShadow').removeClass('rightShadow').removeClass('current');
      },
      transposition(indexOne, indexTwo, isLeft) {
        let arr = this.unFileList;
        let one = arr[indexOne];
        if (indexOne < indexTwo) {
          if (isLeft) {
            arr.splice(indexTwo, 0, one);
          } else {
            arr.splice(indexTwo + 1, 0, one);
          }
          arr.splice(indexOne, 1);
        } else {
          arr.splice(indexOne, 1);
          if (isLeft) {
            arr.splice(indexTwo, 0, one);
          } else {
            arr.splice(indexTwo + 1, 0, one);
          }
        }
        return arr;
      },
      init() {
        //IE下需要在document的mousemove里面取消默认事件;要用原生JS的事件不能用JQuery
//        document.onmousemove = function(e){
//          var ev = e || event;
//          ev.cancelBubble=true;
//          ev.returnValue = false;
//        }
      },
    },
    mounted() {
      this.$nextTick(function() {
        this.init();
      });
    },
  };

</script>
<style rel="stylesheet/scss" lang="scss">
	#imgmanage {
		.add {
			.el-upload-list--picture .el-upload-list__item {
				display: none !important;
			}
		}
	}

</style>
<style scoped rel="stylesheet/scss" lang="scss">
	.is-error #imgmanage .box {
		border: 1px solid #FF4949;
	}

	#imgmanage {
		width: 632px;
		height: 360px;

		.box {
			width: 632px;
			height: 360px;
			padding: 0;
			position: relative;
			overflow: hidden;
			border: 1px solid #DCDFE6;

			.info {
				height: 50px;
				margin: 0 10px;
				border-bottom: 1px solid #DCDFE6;

				p {
					float: left;
					color: #878787;
					font-size: 14px;
					line-height: 50px;

					span {
						color: #E6A23C;
						font-size: 12px;
					}
				}

				button {
					float: right;
					margin: 9px 0;

					&:last-child {
						margin-right: 10px;
					}
				}
			}

			.list {
				width: calc(100% + 17px);
				height: 310px;
				padding: 10px;
				overflow-y: scroll;
				overflow-x: hidden;
				position: static;

				ul {
					display: block;

					li {
						display: block;
						width: 110px;
						height: 110px;
						position: relative;
						float: left;
						margin-left: 10px;
						overflow: hidden;
						cursor: -webkit-grab;

						&:nth-child(n+6) {
							margin-top: 10px;
						}

						&:last-child {
							position: static;
							border: 1px solid #DCDFE6;

							&:hover {
								border: 1px solid #B4B7BF;

								i {
									color: #B4B7BF;
								}
							}

							.addBtn {
								position: absolute;
								top: 9px;
								right: 130px;
							}

							.subBtn {
								position: absolute;
								top: 9px;
								right: 20px;
							}

							i {
								display: block;
								margin: 0 25px;
								color: #DCDFE6;
								font-size: 60px;
								text-align: center;
								line-height: 108px;
								cursor: pointer;
							}
						}

						&:hover {
							span {
								display: block;
							}
						}

						img {
							display: block;
							height: 100%;
							position: absolute;
							top: 0;
							left: 50%;
							transform: translateX(-50%);
							bottom: 0;
							margin: auto;
						}

						span {
							display: none;
							width: 24px;
							height: 24px;
							position: absolute;
							top: 0;
							right: 0;
							cursor: pointer;
							z-index: 10;
							background-color: rgba(0, 0, 0, .5);

							i {
								display: block;
								margin: 0 auto;
								color: #ffffff;
								font-size: 12px;
								text-align: center;
								line-height: 24px;
							}
						}

						.progress {
							height: 100%;
							position: relative;
							background-color: rgba(255, 255, 255, 0.5);
						}

						p {
							display: block;
							width: 80px;
							height: 40px;
							position: absolute;
							bottom: -17px;
							right: -40px;
							color: #fff;
							font-size: 20px;
							text-indent: 23px;
							background-color: #67c23a;
							transform: rotateZ(-36deg);

							i {
								display: block;
								line-height: 24px;
								transform: rotateZ(30deg);
							}
						}

						&.add {
							.el-upload-list--picture .el-upload-list__item {
								display: none !important;
							}
						}
					}
				}
			}
		}

		.current {
			/*cursor: move!important;*/
			/*img {*/
			/*cursor: move!important;*/
			/*}*/
		}

		.leftShadow {
			box-shadow: -5px 1px 5px #666;
		}

		.rightShadow {
			box-shadow: 5px 1px 5px #666;
		}
	}
</style>
