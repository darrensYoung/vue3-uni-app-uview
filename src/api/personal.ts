const http = uni.$u.http

export const testGetPer = (params:object, config:object = {}) => http.get('/mini/product_group', {
    params: params
})