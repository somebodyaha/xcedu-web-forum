const forumLayout = {
  name: '/mfs-forum',
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
  }, {
    name: 'newArticle',
    path: 'newArticle',
    component: () => import('@page/article/newArticle')
  }]
}
export default [forumLayout]
