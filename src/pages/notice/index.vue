<template>
  <section class="layout-list-content padding-top-size-nomal padding-bottom-size-nomal">
    <el-card class="margin-lr-auto" style="width: 840px;">
      <div slot="header">
        <span :class="{ color: isNotice }" class="pointer" @click="toggleTab">通知</span>
        <span :class="{ color: !isNotice }" class="pointer margin-left-size-large" @click="toggleTab">评论</span>
      </div>
      <div v-for="notice in curList" :key="notice.id" class="clearfix">
        <div class="fl margin-right-size-small">
          <el-avatar :size="50" :src="notice.avatar" />
        </div>
        <div class="fl" style="width: calc(100% - 65px);">
          <div class="bold">{{ notice.userName }}</div>
          <div class="margin-top-size-mix text-color-grey">{{ notice.time }}</div>
          <div class="margin-top-size-nomal">{{ notice.content }}</div>
          <div class="margin-top-size-small padding-left-right-size-nomal padding-top-bottom-size-small bg-grey">
            <span class="color">{{ notice.subject.userName }}</span>：
            <span>{{ notice.subject.comment }}</span>
          </div>
        </div>
        <div class="clearfix" />
        <el-divider />
      </div>
    </el-card>
  </section>
</template>
<script>
export default {
  data () {
    return {
      isNotice: true,
      notices: [{
        id: 1,
        userName: '一杯凉的白开水',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        time: '5月23日 08:43',
        content: '赞了你的评论',
        subject: {
          userName: 'KKKKM',
          comment: '想要原图哇'
        }
      }, {
        id: 2,
        userName: '一杯凉的白开水',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        time: '5月23日 08:43',
        content: '赞了你的评论',
        subject: {
          userName: 'KKKKM',
          comment: '想要原图哇'
        }
      }],
      comments: [{
        id: 1,
        userName: '一杯凉的白开水',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        time: '5月23日 08:43',
        content: '是的！',
        subject: {
          userName: '评论我的帖子',
          comment: '我心目中的大英雄'
        }
      }, {
        id: 2,
        userName: '一杯凉的白开水',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        time: '5月23日 08:43',
        content: '回复@KKKKM：主页获取哦~',
        subject: {
          userName: '回复我的评论',
          comment: '回复@一杯凉的白开水：想要原图哇'
        }
      }]
    }
  },
  computed: {
    curList () {
      return this.isNotice ? this.notices : this.comments
    }
  },
  mounted: function () {
  },
  methods: {
    toggleTab () {
      this.isNotice = !this.isNotice
    }
  }
}
</script>
