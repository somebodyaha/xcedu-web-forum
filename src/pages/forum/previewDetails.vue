<template>
  <section style="width: 840px; margin: 0 auto; background: #fff">
    <el-image
      style="width: 50px; height: 50px"
      :src="article.imgUrl"
    />
    <span>{{ article.aliasName }}</span>
    <el-card v-html="article.articleTitle" />
    <el-card v-html="article.articleContent" />
    <span v-show="article.userIsAdmin">编辑</span>
    <span v-show="article.userIsAdmin||article.userIsAuthor" @click="deleteArticle">删除</span>
    <span v-show="article.userIsAdmin && article.forumTop === 0" @click="topArticle('forum',1)">全论坛置顶</span>
    <span v-show="article.userIsAdmin && article.forumTop === 1" @click="topArticle('forum',0)">取消论坛置顶</span>
    <span v-show="article.userIsAdmin && article.plateTop === 0" @click="topArticle('plate',1)">板块置顶</span>
    <span v-show="article.userIsAdmin && article.plateTop ===1" @click="topArticle('plate',0)">取消板块置顶</span>

    <span v-show="!article.userHasLike" @click="likeArticle(1)">点赞{{ article.likeNum }}</span>
    <span v-show="article.userHasLike" @click="likeArticle(0)">取消点赞{{ article.likeNum }}</span>
    <span v-show="!article.userHasAttention" @click="attentionArticle(1)">关注</span>
    <span v-show="article.userHasAttention" @click="attentionArticle(0)">取消关注</span>

    <div class="fa-more replay">
      <transition name="el-fade-in-linear">
        <el-card ref="operate">
          <!-- <div class="top" /> -->
          <div style="display:flex">
            <el-col :span="2" class="mr-10">
              <el-avatar :src="article.imgUrl" />
            </el-col>
            <el-col :span="22">
              <el-input v-model="commentInput" placeholder="请输入内容" />
            </el-col>
          </div>
          <div class="dss">
            <el-col :span="2">
              <div />
            </el-col>
            <el-col :span="22" class="dss">
              <el-checkbox v-model="anonymous">匿名评论</el-checkbox>
              <el-button type="primary" size="small" @click="sendComment()">发表</el-button>
            </el-col>
          </div>
          <div v-for="(comment,num) in comments" :key="num" style="display:flex;" class="mt-10">
            <el-col :span="2" class="mr-10">
              <el-avatar :src="comment.imgUrl" />
            </el-col>
            <el-col :span="22">
              <div>
                <div>
                  {{ comment.aliasName + ' : ' +comment.commentContent }}
                </div>
                <div class="dss text-color-grey">
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

              </div>
            </el-col>
          </div>
        </el-card>
      </transition>
    </div>
  </section>

</template>
<script>
import { getArticleById, commentList, saveComment, deleteArticle, attentionArticle, likeArticle, topArticle, likeComment } from '@/api/index'
import { arrayToStrWithOutComma } from '@/util/index'
export default {
  name: 'PreviewDetail',
  data () {
    return {
      article: {

      },
      anonymous: false,
      commentInput: '',
      comments: []
    }
  },

  mounted: function () {
    const id = this.$route.query.id
    if (id) {
      getArticleById(id).then(res => {
        this.article = res
      })
      commentList({ articleId: id, pageSize: 1000, pageNumber: 1 }).then(res => {
        this.comments = res.records
      })
    }
  },
  methods: {
    deleteArticle () {
      deleteArticle({ ids: arrayToStrWithOutComma(this.article.id.split(',')) }).then(res => {
        if (!res) {
          this.$message('删除失败，请稍后再试')
        } else {
          // TODO 删除成功 跳转回首页
          this.$message('删除成功')
        }
      })
    },

    topArticle (flag, topFlag) {
      topArticle({ id: this.article.id, flag: flag, topFlag: topFlag }).then(res => {
        if (!res) {
          this.$message('操作失败，请稍后再试')
        } else {
          if (flag === 'forum') {
            this.article.forumTop = topFlag
          } else {
            this.article.plateTop = topFlag
          }
          this.$message('操作成功')
        }
      })
    },
    sendComment () {
      saveComment({ articleId: this.article.id, anonymous: (this.anonymous ? 1 : 0), commentContent: this.commentInput }).then(res => {
        if (res) {
          this.$message('评论成功')
          this.article.commentNum++
        } else {
          this.$message('评论保存失败')
        }
      })
    },
    likeArticle (flag) {
      likeArticle({ articleId: this.article.id, flag: flag }).then(res => {
        if (!res) {
          this.$message('操作失败')
        } else if (flag === 0) {
          this.article.likeNum--
          this.article.userHasLike = false
          this.$message('取消点赞成功')
        } else if (flag === 1) {
          this.article.likeNum++
          this.article.userHasLike = true
          this.$message('点赞成功')
        }
      })
    },
    likeComment (index, commentId, flag) {
      likeComment({ index, commentId: commentId, flag: flag }).then(res => {
        if (res) {
          this.$message('点赞成功')
          if (flag === 0) {
            this.comments[index].userHasLike = false
            this.comments[index].commentLikeNum--
          } else {
            this.comments[index].userHasLike = true
            this.comments[index].commentLikeNum++
          }
        } else {
          this.$message('点赞失败')
        }
      })
    },
    attentionArticle (flag) {
      attentionArticle({ id: this.article.id, flag: flag }).then(res => {
        if (!res) {
          this.$message('收藏失败，请稍后再试')
        } else if (flag === 0) {
          this.article.userHasAttention = false
          this.$message('取消收藏成功')
        } else if (flag === 1) {
          this.article.userHasAttention = true
          this.$message('收藏成功')
        }
      })
    }
  }
}
</script>

<style>
  .dss{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

</style>
