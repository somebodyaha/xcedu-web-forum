import { axios } from '@xcedu/web-share'

// 测试环境需要在请求url前加前缀
const prefix = '/api-personalized'
// const prefix = ''

// -------------------------用户信息接口------------------------
export function getUserSetting () {
  return axios.get(prefix + '/advise/user/setting/getUserSetting')
}

// ------------------------板块管理相关接口---------------------
// 新增板块
export function createPlate (form) {
  return axios.post(prefix + '/advise/plate/create', form)
}

// 获取板块管理员-列表
export function plateManagerList (params) {
  return axios.get(prefix + '/advise/plate/plateManagerList', { params: params })
}

// 判断当前用户是否拥有管理员权限
export function userManagePlate () {
  return axios.get(prefix + '/advise/plate/userManagePlate')
}

// 获得板块列表
export function getPlateList () {
  return axios.get(prefix + '/advise/plate/findAll')
}
// 板块分页
export function getPlatePage (params) {
  return axios.get(prefix + '/advise/plate/pageList', { params: params })
}

// 通过id删除帖子
export function deletePlateById (params) {
  return axios.get(prefix + '/advise/plate/delete', { params: params })
}

// --------------------------------评论相关接口-------------------------------

// 获取帖子的评论列表
export function commentList (params) {
  return axios.get(prefix + '/advise/comment/pageList', { params: params })
}

// 保存评论
export function saveComment (form) {
  return axios.post(prefix + '/advise/comment/save', form
  )
}

// -----------------------帖子相关接口------------------------

// 获取未发布的帖子信息
export function getNoPubArticle (id) {
  return axios.get(prefix + '/advise/article/getNoPubArticle?id=' + id)
}

// 获取用户统计数
export function getMyArticleCount () {
  return axios.get(prefix + '/advise/article/findCount')
}

// 查看
export function getArticleById (id) {
  return axios.get(prefix + '/advise/article/view?id=' + id)
}

// 新建帖子保存
export function createArticle (form) {
  return axios.post(prefix + '/advise/article', form)
}

// 修改提交数据
export function updateArticle (form) {
  return axios.put(prefix + '/advise/article', form)
}

// 热门排行榜
export function hotList (params) {
  return axios.get(prefix + '/advise/article/articleRankList', { params: params })
}

// 删除帖子
export function deleteArticle (params) {
  return axios.delete(prefix + '/advise/article', { params }
  )
}

// 收藏帖子
export function attentionArticle (params) {
  return axios.get(prefix + '/advise/article/attention', { params: params }
  )
}

// 点赞帖子
export function likeArticle (params) {
  return axios.get(prefix + '/advise/article/like', { params: params }
  )
}

// 置顶帖子
export function topArticle (params) {
  return axios.get(prefix + '/advise/article/articleTop', { params: params }
  )
}

// 获得帖子列表
export function getArticleList (params) {
  return axios.get(prefix + '/advise/article/pagelist', { params: params })
}
// 通过id删除帖子
export function deleteArticleById (params) {
  return axios.delete(prefix + '/advise/article', { params: params })
}
// 将文章置顶
export function articleTop (params) {
  return axios.get(prefix + '/advise/article/articleTop', { params: params })
}

// 根据板块id获取分页帖子
export function getArticleByPlate (params) {
  return axios.get(prefix + '/advise/article/pagelist', { params: params })
}

// ----------------------------------用户通知接口------------------------------
// 通知列表
export function getNoticeList (flag) {
  return axios.get(prefix + '/advise/notice/pageList?flag=' + flag)
}

// 用户通知数量汇总
export function getUserNoticeNum () {
  return axios.get(prefix + '/advise/message/summary/getMesSummary')
}

// 选人接口
export function getChooseUserDataByParams (params) {
  return axios.get('/api-base/rangeScopes', { params })
}
// 选人输入
export function gettSearchListByValue (params) {
  return axios.get('/api-base/rangeScopes?type=search', { params })
}
