<template>
  <div class="home infinite-list-wrapper" style="overflow:auto">
    <el-card class="box-card">
      <div slot="header" class="dss">
        <div style="font-size:16px">最新动态</div>
      </div>
      <div v-infinite-scroll="load" class="list" infinite-scroll-disabled="disabled">
        <div v-for="(item,index) in pageContent" :key="index" class="text item list-item">
          <el-row>
            <el-col :span="2">
              <div>
                <el-avatar v-if="item.anonymous === 0" :src="item.imgUrl" />
                <el-avatar v-else :src="require('@/assets/user.png')" />
              </div>
            </el-col>
            <el-col :span="22">
              <div class="dss">
                <div class="margin-bottom-size-mini">{{ item.aliasName }}</div>
                <!-- <div><i class="el-icon-arrow-down" /></div> -->
                <el-dropdown v-if="item.userIsAdmin || item.userIsAuthor" trigger="click" @command="choose">
                  <span class="el-dropdown-link">
                    <i class="el-icon-arrow-down el-icon--right" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-show="item.userIsAdmin && item.forumTop == 0" :command="beforeHandleCommand(index,item.id,'forum','a')">论坛置顶</el-dropdown-item>
                    <el-dropdown-item v-show="item.userIsAdmin && item.plateTop == 0" :command="beforeHandleCommand(index,item.id,'plate','a')">板块置顶</el-dropdown-item>
                    <el-dropdown-item v-show="item.userIsAdmin && item.forumTop == 1" :command="beforeHandleCommand(index,item.id,'forum','b')">取消论坛置顶</el-dropdown-item>
                    <el-dropdown-item v-show="item.userIsAdmin && item.plateTop == 1" :command="beforeHandleCommand(index,item.id,'plate','b')">取消板块置顶</el-dropdown-item>
                    <el-dropdown-item v-show="item.userIsAuthor" :command="beforeHandleCommand(index,item.id,'','c')">编辑</el-dropdown-item>
                    <el-dropdown-item :command="beforeHandleCommand(index,item.id,'','d')">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div>
                <div class="text-color-grey">{{ item.pubDate }}发布</div>
              </div>
              <div class="margin-top-size-nomal">
                <el-tag v-show="item.forumTop == 1 || item.plateTop == 1" type="danger" size="mini">置顶</el-tag>
                <span style="font-weight:bold" class="size-large">{{ item.articleTitle }}</span>
              </div>
              <div class="margin-top-size-small">
                <span v-show="item.articleContentShort && item.articleContentShort.length>=50 && !item.expandOpen" v-html="item.articleContentShort" />
                <span v-show="(item.articleContentShort && item.articleContentShort.length<50) || item.expandOpen" v-html="item.articleContent" />
                <span v-show="item.articleContentShort && item.articleContentShort.length>=50 && !item.expandOpen" class="color" style="cursor:pointer" @click="expand(index)">展开全文</span>
                <span v-show="item.expandOpen" class="color" style="cursor:pointer" @click="retract(index)">收起全文</span>
              </div>
              <div v-if="item.imgFileIds" class="margin-top-size-nomal">
                <el-image
                  v-for="imgId in item.imgFileIds.split(',')"
                  :key="imgId"
                  style="width: 100px; height: 100px;margin-right:20px"
                  :src="'/'+item.filePrefix + imgId"
                  :preview-src-list="srcList"
                />
              </div>
              <div class="margin-top-size-nomal text-color-grey tool-bar">
                <span style="cursor:pointer" class="margin-right-size-large" @click.stop="showTag(item.id,index)">
                  <i class="icon-msg" />
                  <span>{{ item.commentNum == null ? 0 : item.commentNum }}</span>
                </span>
                <span v-if="item.userHasLike" style="cursor:pointer" class="margin-right-size-large" @click="likeArticle(item.id,index,0)">
                  <i class="icon-zan-shixin red" />
                  <span>{{ item.likeNum == null ? 0 : item.likeNum }}</span>
                </span>
                <span v-else style="cursor:pointer" class="margin-right-size-large" @click="likeArticle(item.id,index,1)">
                  <i class="icon-zan" />
                  <span>{{ item.likeNum == null ? 0 : item.likeNum }}</span>
                </span>
                <span v-if="item.userHasAttention" style="cursor:pointer" @click="attentionArticle(item.id,index,0)">
                  <i class="icon-star-solid yellow" />
                  <span>取消收藏</span>
                </span>
                <span v-else style="cursor:pointer" @click="attentionArticle(item.id,index,1)">
                  <i class="icon-star-hollow" />
                  <span>收藏</span>
                </span>
              </div>
            </el-col>
          </el-row>
          <div class="fa-more replay margin-top-size-nomal" style="margin-top: 20px; margin-left: -20px; margin-right: -20px;">
            <transition name="el-fade-in-linear">
              <el-card v-show="tag[index]" ref="operate" style="border: 0 none; box-shadow: non; box-shadow:inset 1px 3px 3px rgba(0,0,0,.05)">
                <!-- <div class="top" /> -->
                <div style="display:flex">
                  <el-col :span="2" class="mr-10">
                    <el-avatar :src="userInfo.userAvator" />
                  </el-col>
                  <el-col :span="22">
                    <el-input v-model="input" placeholder="请输入内容" />
                  </el-col>
                </div>
                <div class="dss">
                  <el-col :span="2">
                    <div />
                  </el-col>
                  <el-col :span="22" class="dss">
                    <el-checkbox v-model="checked">匿名评论</el-checkbox>
                    <el-button type="primary" size="small" @click="sendComment(item.id,index)">发表</el-button>
                  </el-col>
                </div>
                <div v-for="(comment,num) in commentList" :key="num" class="margin-top-size-mix padding-top-size-mix replay-line" style="display:flex; ">
                  <el-col :span="2" class="mr-10">
                    <el-avatar :src="comment.imgUrl" />
                  </el-col>
                  <el-col :span="22">
                    <div>
                      <span class="color">{{ comment.aliasName }} </span>
                      <span>: {{ comment.commentContent }}</span>
                    </div>
                    <div class="dss text-color-grey  margin-top-size-mix ">
                      <span>{{ comment.createdDate }}</span>
                      <div>
                        <span style="cursor:pointer" @click="reflex(num)">回复</span>
                        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                        <span v-show="comment.userHasLike">
                          <i class="el-icon-folder-checked" @click="likeComment(num,comment.id,0)" />
                          <span>&nbsp;&nbsp;{{ comment.commentLikeNum == null ? 0 : comment.commentLikeNum }}</span>
                        </span>
                        <span v-show="!comment.userHasLike">
                          <i class="el-icon-folder" @click="likeComment(num,comment.id,1)" />
                          <span>&nbsp;&nbsp;{{ comment.commentLikeNum == null ? 0 : comment.commentLikeNum }}</span>
                        </span>
                      </div>
                    </div>
                  </el-col>
                </div>
              </el-card>
            </transition>
          </div>
          <el-divider />
        </div>
        <p v-if="loading" style="text-align:center">加载中...</p>
        <p v-if="noMore" style="text-align:center">没有更多了</p>
      </div>
    </el-card>

    <el-card v-if="!isIndexPage" class="box-card-right1 text-color-grey">
      <div slot="header" class="dss">
        <div style="font-size:12px">管理员</div>
      </div>
      <div v-for="(manager,index) in plateManager" :key="index" class="text item bghover dss">
        <el-image
          style="width: 50px; height: 50px"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        />
        <i v-if="manager.gender === 0" class="el-icon-male text-color-grey" />
        <i v-else class="el-icon-female text-color-grey" />
        <span>{{ manager.userName }}</span>
      </div>
    </el-card>

    <el-card v-if="isIndexPage" class="box-card-right1 text-color-grey">
      <div class="text item bghover dss">
        <div @click="getArticle('myPub')">
          <i class="icon-send text-color-grey" />
          <span>我发送的</span>
        </div>
        <el-tag type="info" size="small " class="bgfff">{{ myCount.publishCount }}</el-tag>
      </div>
      <div class="text item bghover dss">
        <div @click="getArticle('myComment')">
          <i class="el-icon-s-comment text-color-grey" />
          <span>我评论的</span>
        </div>
        <el-tag type="info" size="small " class="bgfff">{{ myCount.commentCount }}</el-tag>
      </div>
      <div class="text item bghover dss">
        <div @click="getArticle('myAttention')">
          <i class="icon-star-solid text-color-grey" />
          <span>我关注的</span>
        </div>
        <el-tag type="info" size="small " class="bgfff">{{ myCount.attentionCount }}</el-tag>
      </div>
    </el-card>
    <el-card v-if="isIndexPage" class="box-card-right2">
      <div slot="header" class="clearfix">
        <span style="font-weight:bold;font-size:16px;color:#999">热门</span>
        <!-- <el-button style="float: right; padding: 3px 0;color:#3396FC" type="text">去论坛逛逛>></el-button> -->
      </div>
      <div v-for="(hotArticle,index) in hotArticles" :key="index" class="text item bghover dsshover">
        <div class="dss" @click="preViewDetails(hotArticle.id)">
          <div v-html="hotArticle.articleTitle" />
          <div> {{ hotArticle.readNum == null ? 0 : hotArticle.readNum }}次</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { hotList, getArticleByPlate, getMyArticleCount, getUserSetting, commentList, saveComment, deleteArticle, attentionArticle, likeArticle, topArticle, plateManagerList, likeComment } from '@/api/index'
import { arrayToStrWithOutComma } from '@/util/index'
export default {
  data () {
    return {
      userInfo: {
        userAvator: '',
        userAliasName: '',
        trueName: ''
      },
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [],
      input: '',
      tag: {},
      checked: false,
      nomoreState: false,
      loading: false,
      restore: {},
      search: '',
      hotArticles: [],
      pageContent: [],
      pageNumber: 1,
      pageSize: 4,
      recordNum: 0,
      myCount: {},
      commentList: [],
      plateId: '',
      isIndexPage: true,
      pageFlag: '',
      plateManager: []
    }
  },
  computed: {
    noMore () {
      return this.nomoreState
    },
    disabled () {
      return this.loading || this.nomoreState
    }
  },
  watch: {
    $route (to, from) {
      this.nomoreState = false
      this.pageFlag = ''
      // eslint-disable-next-line no-console
      console.log(to)
      const plateId = to.query.index
      this.pageContent = []
      this.plateManager = []
      this.pageNumber = 1
      this.recordNum = 0
      if (plateId === '0') {
        this.isIndexPage = true
        this.plateId = ''
      } else {
        this.isIndexPage = false
        this.plateId = plateId
        this.plateManagerList(this.plateId)
      }
      this.load()
    }
  },
  created () {
  },
  mounted () {
    // 获取list
    hotList({ listNum: 5 }).then(res => {
      this.hotArticles = res
    })
    this.getMyArticleCount()
    getUserSetting().then(res => {
      this.userInfo = {
        userAvator: res.imgUrl,
        userAliasName: res.userAliasName,
        userName: res.trueName
      }
    })
  },
  beforeDestroy () {
    document.removeEventListener('click', this.handleClick, false)
  },
  methods: {
    preViewDetails (id) {
      const { href } = this.$router.resolve({ name: 'previewDetails' })
      window.open(href + '?id=' + id, '_blank')
    },
    getArticle (pageFlag) {
      this.pageContent = []
      this.pageFlag = pageFlag
      this.nomoreState = false
      this.pageNumber = 1
      this.recordNum = 0
      this.load()
    },
    getMyArticleCount () {
      getMyArticleCount().then(res => {
        this.myCount = res
      })
    },
    plateManagerList (plateId) {
      plateManagerList({ id: plateId }).then(res => {
        this.plateManager = res
      })
    },
    sendComment (articleId, index) {
      saveComment({ articleId: articleId, anonymous: (this.checked ? 1 : 0), commentContent: this.input }).then(res => {
        if (res) {
          this.$message('评论成功')
          this.pageContent[index].commentNum++
          this.getMyArticleCount()
        } else {
          this.$message('评论保存失败')
        }
      })
    },
    likeComment (index, commentId, flag) {
      likeComment({ index, commentId: commentId, flag: flag }).then(res => {
        if (res) {
          this.$message('点赞成功')
          if (flag === 0) {
            this.commentList[index].userHasLike = false
            this.commentList[index].commentLikeNum--
          } else {
            this.commentList[index].userHasLike = true
            this.commentList[index].commentLikeNum++
          }
        } else {
          this.$message('点赞失败')
        }
      })
    },
    // 预处理dropdown 将帖子id装入command
    beforeHandleCommand (index, articleId, topFlag, command) {
      return {
        index: index,
        articleId: articleId,
        command: command,
        topFlag: topFlag
      }
    },
    likeArticle (articleId, index, flag) {
      likeArticle({ articleId: articleId, flag: flag }).then(res => {
        if (!res) {
          this.$message('操作失败')
        } else if (flag === 0) {
          this.pageContent[index].likeNum--
          this.pageContent[index].userHasLike = false
          this.$message('取消点赞成功')
        } else if (flag === 1) {
          this.pageContent[index].likeNum++
          this.pageContent[index].userHasLike = true
          this.$message('点赞成功')
        }
      })
    },
    attentionArticle (articleId, index, flag) {
      attentionArticle({ id: articleId, flag: flag }).then(res => {
        if (!res) {
          this.$message('收藏失败，请稍后再试')
        } else if (flag === 0) {
          this.pageContent[index].userHasAttention = false
          this.$message('取消收藏成功')
        } else if (flag === 1) {
          this.pageContent[index].userHasAttention = true
          this.$message('收藏成功')
        }
        this.getMyArticleCount()
      })
    },
    deleteArticle (index, articleId) {
      deleteArticle({ ids: arrayToStrWithOutComma(articleId.split(',')) }).then(res => {
        if (!res) {
          this.$message('删除失败，请稍后再试')
        } else {
          this.pageContent.splice(index, 1)
          this.$message('删除成功')
        }
      })
    },
    topArticle (index, articleId, flag, topFlag) {
      topArticle({ id: articleId, flag: flag, topFlag: topFlag }).then(res => {
        if (!res) {
          this.$message('操作失败，请稍后再试')
        } else {
          if (flag === 'forum') {
            this.pageContent[index].forumTop = topFlag
          } else {
            this.pageContent[index].plateTop = topFlag
          }
          this.$message('操作成功')
        }
      })
    },
    getCommentById (articleId) {
      commentList({ articleId: articleId, page: 1, pageSize: 1000 }).then(res => {
        for (let i = 0; i < res.records.length; i++) {
          this.commentList.push(res.records[i])
        }
        window.console.log(this.commentList)
      })
    },
    showTag (articleId, index) {
      this.input = ''
      this.checked = false
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
      this.commentList = []
      this.getCommentById(articleId)
    },
    expand (index) {
      this.pageContent[index].expandOpen = true
    },
    retract (index) {
      this.pageContent[index].expandOpen = false
    },
    discuss () {
      this.show = !this.show
    },
    load () {
      this.loading = true
      getArticleByPlate({ plateId: this.plateId, page: this.pageNumber++, pageSize: this.pageSize, pageFlag: this.pageFlag }).then(res => {
        this.nomoreState = this.recordNum >= res.totalRecords
        window.console.log(this.recordNum, this.nomoreState)
        if (!this.nomoreState) {
          for (let i = 0; i < res.records.length; i++) {
            res.records[i].expandOpen = false
            this.pageContent.push(res.records[i])
            this.recordNum++
          }
        }
      })
      this.loading = false
    },
    choose (command) {
      const { href } = this.$router.resolve({ name: 'newArtical' })
      switch (command.command) {
      case 'a':this.topArticle(command.index, command.articleId, command.topFlag, 1); break
      case 'b':this.topArticle(command.index, command.articleId, command.topFlag, 0); break
      case 'c':window.open(href + '?id=' + command.articleId, '_self'); break
      default:this.deleteArticle(command.index, command.articleId)
      }
    },
    reflex (index) {
      // 循环对象 修改属性
      if (this.restore[index]) {
        this.search = ''
        Object.keys(this.restore).forEach((index) => {
          this.restore[index] = false
        })
        this.$set(this.restore, index, false)
      } else {
        this.search = ''
        Object.keys(this.restore).forEach((index) => {
          this.restore[index] = false
        })
        this.$set(this.restore, index, true)
      }
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
  .tool-bar{
    text-align: right;
  }
  .box-card-right1,.box-card-right2{
     position: fixed;
    top: 81px;
    left: 65%;
    width: 300px;
   }
   .box-card-right2{
     top:231px
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
  .infinite-list-wrapper{
    height: 100%;
  }
</style>
