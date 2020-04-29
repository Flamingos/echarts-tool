import request from '@/utils/request'

const IndexUrl= 'register'; //首页数据接口
export function register(data) {
  return request({
    url: IndexUrl,
    method: 'post',
    data
  })
}