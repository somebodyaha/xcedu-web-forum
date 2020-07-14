import { axios } from '@xcedu/web-share'
// 新建保存
export function createArticle (form) {
  return axios.post('/advise/plate/create', form)
}
// 查看
export function getPostById (id) {
  return axios.get('/advise/article/view?id=' + id)
}

// 获取未发布的帖子信息
export function getNoPubArticle (id) {
  return axios.get('/advise/article/getNoPubArticle?id=' + id)
}

// 修改提交数据
export function updateArticle (form) {
  return axios.post('/advise/plate/update', form)
}

// 热门排行榜
export function hotList (params) {
  return axios.get('/advise/article/articleRankList', { params: params })
}

// 获取所有板块列表
export function allPlate () {
  return axios.get('/advise/plate/allPlate')
}

// 根据板块id获取分页帖子
export function getArticleByPlate (params) {
  return axios.get('/advise/article/pagelist', { params: params })
}

// 获取用户统计数
export function getMyArticleCount () {
  return axios.get('/advise/article/findCount')
}

// 判断当前用户是否拥有管理员权限
export function userManagePlate () {
  return axios.get('/advise/plate/userManagePlate')
}

// 获取帖子的评论列表
export function commentList (params) {
  return axios.get('/advise/comment/pageList', { params: params })
}

// 保存评论
export function saveComment (form) {
  return axios.post('/advise/comment/save', form
  )
}

// 删除帖子
export function deleteArticle (params) {
  return axios.delete('/advise/article', { params }
  )
}

// 收藏帖子
export function attentionArticle (params) {
  return axios.get('/advise/article/attention', { params: params }
  )
}

// 点赞帖子
export function likeArticle (params) {
  return axios.get('/advise/article/like', { params: params }
  )
}

// 置顶帖子
export function topArticle (params) {
  return axios.get('/advise/article/articleTop', { params: params }
  )
}
// 通知列表
export function getNoticeList (flag) {
  return axios.get('/advise/notice/pageList?flag=' + flag + '&pageSize=100')
}
// 获得帖子列表
export function getArticleList (params) {
  return axios.get('/advise/article/pagelist', { params: params })
}
// 通过id删除帖子
export function deleteArticleById (params) {
  return axios.delete('/advise/article', { params: params })
}
// 将文章置顶
export function articleTop (params) {
  return axios.get('/advise/article/articleTop', { params: params })
}
// 获得板块列表
export function getPlateList () {
  return axios.get('/advise/plate/findAll')
}
// 板块分页
export function getPlatePage (params) {
  return axios.get('/advise/plate/pageList', { params: params })
}
// 通过id删除板块
export function deletePlateById (params) {
  return axios.get('/advise/plate/delete', { params: params })
}
// 保存板块
export function savePlate (form) {
  return axios.post('/advise/plate/save', form)
}
