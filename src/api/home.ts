const http = uni.$u.http

// 测试一e
export const testGet = (params:object, config:object = {}) => http.get('/mini/product_group', {
    params: params
})

export const testPost = (params:object, config:object = {}) => http.post('/mini/product_group', {
    params: params
})