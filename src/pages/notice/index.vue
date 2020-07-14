<template>
  <section class="layout-list-content padding-top-size-nomal padding-bottom-size-nomal">
    <el-card class="margin-lr-auto" style="width: 840px;">
      <div slot="header">
        <span :class="{ color: isNotice }" class="pointer" @click="toggleTab">通知</span>
        <span
          :class="{ color: !isNotice }"
          class="pointer margin-left-size-large"
          @click="toggleTab"
        >评论</span>
      </div>
      <div v-for="notice in curList" :key="notice.id" class="clearfix">
        <div class="fl margin-right-size-small">
          <el-avatar :size="50" :src="notice.avatar" />
        </div>
        <div class="fl" style="width: calc(100% - 65px);">
          <div class="bold">{{ notice.initiateBy }}</div>
          <div class="margin-top-size-mix text-color-grey">{{ notice.createdDate }}</div>
          <div class="margin-top-size-nomal">{{ notice.commentContent }}</div>
          <div
            class="margin-top-size-small padding-left-right-size-nomal padding-top-bottom-size-small bg-grey"
          >
            <span class="color">{{ notice.articleAuthor }}</span>：
            <span>{{ notice.articleTitle!=null?notice.articleTitle:notice.previousCommentContent }}</span>
          </div>
        </div>
        <div class="clearfix" />
        <el-divider />
      </div>
    </el-card>
  </section>
</template>
<script>
import { getNoticeList } from '@/api/index'
export default {
  data () {
    return {
      isNotice: true,
      notices: [],
      comments: []
    }
  },
  computed: {
    curList () {
      return this.isNotice ? this.notices : this.comments
    }
  },
  mounted: function () {
    getNoticeList(0).then(res => {
      this.notices = res.records
    })
    getNoticeList(1).then(res => {
      this.comments = res.records
    })
  },
  methods: {
    toggleTab () {
      this.isNotice = !this.isNotice
    }
  }
}
</script>
