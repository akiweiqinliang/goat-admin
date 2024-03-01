import request from "../axios";
export const getAllCookbook = (page: number, pageSize: number) => {
    return request({
        url: '/cookbooks',
        method: 'get',
        params: {
            page,
            pageSize,
        }
    })
}
export const getCookBooksByCatId = (page: number, pageSize: number, catId: number) => {
    return request({
        url: '/cookbooks/byCatId',
        method: 'get',
        params: {
            page,
            pageSize,
            categoryId: catId,
        }
    })
}
// 增
export const createCookBook = (cookbook: object) => {
    return request({
        url: '/cookbooks/create',
        method: 'post',
        data: cookbook,
    })
}
// 查
export const getCookBookById = (id: number) => {
    return request({
        url: `/cookbooks/findById`,
        method: 'get',
        params: {
            id,
        }
    })
}
export const getCookbookByTagId = (tagId: number) => {
    return request({
        url: `/cookbooks/findByTagId`,
        method: 'get',
        params: {
            tagId,
        }
    })
}
export const getCookbookByParams = (params: object) => {
    return request({
        url: '/cookbooks/findByParams',
        method: 'get',
        params: params
    })
}
