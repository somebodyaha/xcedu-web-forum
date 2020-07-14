import { axios } from '@xcedu/web-share'

// 新建保存
export function createPost (form) {
  return axios.post('/api-base/innerMails', form)
}
// 查看
export function getPostById (id) {
  return axios.get('/api-base/mails/getMail?id=' + id)
}
// 修改提交数据
export function updatePostById (id, form) {
  return axios.post('/api-base/mails?id=' + id, form)
}
// 通知列表
export function getNoticeList (flag) {
  return axios.get('/advise/notice/pageList?flag=' + flag)
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
// 通过id删除帖子
export function deletePlateById (params) {
  return axios.get('/advise/plate/delete', { params: params })
}
