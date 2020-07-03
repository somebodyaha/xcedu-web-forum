import Layout from '@page/layout.vue'
import Compose from '@page/compose.vue'
import Notice from '@page/notice.vue'
const forumLayout = {
  path: '/mfs-forum',
  component: Layout,
  children: [{
    name: 'compose',
    path: 'compose',
    component: Compose
  }, {
    name: 'notice',
    path: 'notice',
    component: Notice
  }]
}

export default [forumLayout]
