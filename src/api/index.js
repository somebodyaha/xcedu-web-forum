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
