import AXIOS from "@/utils/request"

//通知详情
export function noticeDetail(params) {
  return AXIOS.get('/notice/notice/', {params})
}

//通知删除
export function removeNotice(data) {
  return AXIOS.post('/notice/notice/?delete', data)
}

//获取通知列表
export function getNotices(params) {
  return AXIOS.get('/notice/notice/?list', {
    params
  })
}

//修改是否已读
export function putNotice(params) {
  return AXIOS.post('/notice/notice/?put', params)
}