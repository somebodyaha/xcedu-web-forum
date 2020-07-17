const forumLayout = {
  name: 'forum',
  path: '/mfs-forum',
  redirect: '/mfs-forum/home',
  component: () => import('@page/layout.vue'),
  children: [{
    name: 'home',
    path: 'home',
    redirect: '/mfs-forum/home/newest',
    component: () => import('@page/home/index'),
    children: [{
      name: 'newest',
      path: 'newest',
      component: () => import('@page/home/newest')
    }, {
      name: 'mine',
      path: 'mine',
      component: () => import('@page/home/mine/index')
    }]
  }, {
    name: 'sub-manage',
    path: 'sub-manage',
    component: () => import('@page/manage/sub-manage')
  }, {
    name: 'super-manage',
    path: 'super-manage',
    component: () => import('@page/manage/super-manage')
  }, {
    name: 'forum',
    path: 'forum',
    component: () => import('@page/forum/index')
  }, {
    name: 'notice',
    path: 'notice',
    component: () => import('@page/notice/index')
  }]
}

const newArtical = {
  name: 'newArtical',
  path: '/mfs-forum/newArtical',
  component: () => import('@page/article/newArticle')
}

const previewDetails = {
  name: 'previewDetails',
  path: '/mfs-forum/previewDetails',
  component: () => import('@page/forum/previewDetails')
}
export default [forumLayout, newArtical, previewDetails]
