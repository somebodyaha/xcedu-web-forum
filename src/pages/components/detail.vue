<template>
  <div class="home">
    <el-card class="box-card infinite-list-wrapper" style="overflow:auto">
      <div slot="header" class="dss">
        <div style="font-size:16px">最新动态</div>
        <div style="font-weight:bold">发帖子</div>
      </div>
      <div v-infinite-scroll="load" class="list" infinite-scroll-disabled="disabled">
        <div v-for="(item,index) of counts" :key="index" class="text item list-item">
          <el-row>
            <el-col :span="2">
              <div>
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
              </div>
            </el-col>
            <el-col :span="22">
              <div style="font-weight:bold" class="dss">
                <div>一杯凉的白开水</div>
                <!-- <div><i class="el-icon-arrow-down" /></div> -->
                <el-dropdown trigger="click" @command="choose">
                  <span class="el-dropdown-link">
                    <i class="el-icon-arrow-down el-icon--right" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="a">黄金糕</el-dropdown-item>
                    <el-dropdown-item command="b">狮子头</el-dropdown-item>
                    <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
                    <el-dropdown-item command="d">双皮奶</el-dropdown-item>
                    <el-dropdown-item command="e">蚵仔煎</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div>
                <div class="mt-10 text-color-grey">6月9日  16:59发布</div>
              </div>
              <div class="mt-10">
                <el-tag type="danger" size="mini">置顶</el-tag>
                <span style="font-weight:bold" class="size-large">我的偶像</span>
              </div>
              <div class="mt-20">

                <span v-html="section" />
                <span class="color" style="cursor:pointer" @click="expand">展开全文</span>
                <span v-if="false" class="color" style="cursor:pointer" @click="retract">收起全文</span>
              </div>
              <div class="mt-20">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="url"
                  :preview-src-list="srcList"
                />
              </div>
              <div class="text-r mt-20 text-color-grey">
                <span class="mr-40" style="cursor:pointer" @click.stop="showTag(index)">
                  <i class="icon-msg mr-3" />
                  <span>10</span>
                </span>
                <span class="mr-40" style="cursor:pointer">
                  <i class="el-icon-platform-eleme mr-3" />
                  <span>20</span>
                </span>
                <span style="cursor:pointer">
                  <i class="icon-star-hollow mr-3" />
                  <span>收藏</span>
                </span>
              </div>
              <div id="targetDiv" class="mt-20 fa-more replay">
                <transition name="el-fade-in-linear">
                  <el-card v-show="tag[index]" ref="operate">
                    <!-- <div class="top" /> -->
                    <div style="display:flex">
                      <el-col :span="2" class="mr-10">
                        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                      </el-col>
                      <el-col :span="22">
                        <el-input v-model="input" placeholder="请输入内容" />
                      </el-col>
                    </div>
                    <div class="dss mt-10">
                      <el-col :span="2" class="mr-10">
                        <div />
                      </el-col>
                      <el-col :span="22" class="dss">
                        <el-checkbox v-model="checked">匿名评论</el-checkbox>
                        <el-button type="primary" size="small">发表</el-button>
                      </el-col>
                    </div>
                    <div style="display:flex;" class="mt-10">
                      <el-col :span="2" class="mr-10">
                        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                      </el-col>
                      <el-col :span="22">
                        <div>
                          <div>
                            KKKKM：百折不挠的毅力和决心
                          </div>
                          <div class="dss mt-10 text-color-grey">
                            <span>11:53</span>
                            <div>
                              <span>回复</span>
                              <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                              <span>
                                <i class="icon--star-hollow" />
                                <span>&nbsp;&nbsp;11</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </el-col>
                    </div>
                  </el-card>
                </transition>
              </div>
            </el-col>
          </el-row>
          <el-divider />
        </div>
        <p v-if="loading" style="text-align:center">加载中...</p>
        <p v-if="noMore" style="text-align:center">没有更多了</p>
      </div>
    </el-card>
    <el-card class="box-card-right1 text-color-grey">
      <div class="text item bghover dss">
        <div>
          <i class="icon-send text-color-grey mr-3" />
          <span>我发送的</span>
        </div>
        <el-tag type="info" size="small " class="bgfff">10</el-tag>
      </div>
      <div class="text item bghover dss">
        <div>
          <i class="icon-pingjia text-color-grey mr-3" />
          <span>我评论的</span>
        </div>
        <el-tag type="info" size="small " class="bgfff">20</el-tag>
      </div>
      <div class="text item bghover dss">
        <div>
          <i class="icon-star-solid text-color-grey mr-3" />
          <span>我关注的</span>
        </div>
        <el-tag type="info" size="small " class="bgfff">30</el-tag>
      </div>
    </el-card>
    <el-card class="box-card-right2">
      <div slot="header" class="clearfix">
        <span style="font-weight:bold;font-size:16px;color:#999">热门</span>
        <el-button style="float: right; padding: 3px 0;color:#3396FC" type="text">去论坛逛逛>></el-button>
      </div>
      <div v-for="o in 4" :key="o" class="text item bghover dsshover">
        <div class="dss">
          <div>我心目中的大英雄</div>
          <div> 4000次</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ],
      section: '我心目中的大英雄是类似蒙恬和乔丹那样的人，有着百折不挠的毅力和决心，为了能够达成自己心中的',
      input: '',
      tag: {},
      checked: false,
      count: 10,
      loading: false,
      counts: 40
    }
  },
  computed: {
    noMore () {
      return this.count >= 20
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  created () {

  },
  mounted () {
    // document.addEventListener('click', this.handleClick, false)
    // this.$once('hook:beforeDestory', () => {
    //   document.removeEventListener('click', this.handleClick, false)
    // })
    // window.addEventListener('click', this.handleClick, false)
  },
  methods: {
    handleClick (event) {
      // const e = event || window.event
      // const oDiv = document.getElementById('targetDiv')
      // this.$message({ type: 'success', message: e })
      // this.$message({ type: 'error', message: JSON.stringify(oDiv) })
      // console.log('1111')
      // if (!e.target.contains(oDiv)) {
      //   Object.keys(this.tag).forEach((key) => {
      //     this.tag[key] = false
      //   })
      // }
      // if (e.target.className !== 'fa-more') {
      //   Object.keys(this.tag).forEach((key) => {
      //     this.tag[key] = false
      //   })
      // }
    },
    showTag (index) {
      // 循环对象 修改属性
      if (this.tag[index]) {
        this.input = ''
        Object.keys(this.tag).forEach((index) => {
          this.tag[index] = false
        })
        this.$set(this.tag, index, false)
      } else {
        this.input = ''
        Object.keys(this.tag).forEach((index) => {
          this.tag[index] = false
        })
        this.$set(this.tag, index, true)
      }
    },
    expand () {

    },
    retract () {

    },
    discuss () {
      this.show = !this.show
    },
    load () {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 1000)
    },
    choose (title) {
      this.$message(title)
    }
  }
}
</script>

<style>
  .home{
    height: 100%;
  }
  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 44%;
    margin: 20px 20%;
  }
  .dss{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .mt-10{
    margin-top:10px
  }
  .mt-20{
    margin-top: 20px;
  }
  .mt-30{
    margin-top:30px;
  }
  .text-r{
    text-align: right;
  }
  .mr-40{
    margin-right: 40px;
  }
  .mr-3{
    margin-right: 3px;
  }
  .mr-10{
    margin-right: 10px;
  }
  .box-card-right1,.box-card-right2{
     position: fixed;
    top: 20px;
    left: 65%;
    width: 300px;
   }
   .box-card-right2{
     top:170px
   }
   .box-card-right1 .item,.box-card-right2 .item{
     margin-bottom: 0;
   }
   .bghover:hover{
     cursor: pointer;
     background: rgba(248,248,248,1);
   }
   .box-card-right1 .el-card__body,.box-card-right2 .el-card__body{
     padding:0
   }
   .box-card-right1 .el-card__body .item,.box-card-right2 .el-card__body .item{
     padding:15px;
   }
   .box-card-right1 .el-card__body .item{
     padding: 10px 15px;
   }
   .bgfff:hover{
     background:#fff
   }
   .dsshover:hover{
     color: #3396fc;
   }
   .home .el-icon-circle-close{
     font-size: 35px;
   }
   .top{
 position: absolute;
 width: 100%;
 height: 100%;
}
.top:before{
 position: absolute;
 content: '';
 border-top: 10px transparent dashed;
 border-left: 10px transparent dashed;
 border-right: 10px transparent dashed;
 border-bottom: 10px #fff solid;
}
.top:before{
 /* border-bottom: 10px #0099CC solid; */
  top: -8%;
    left: 53%;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }
</style>
