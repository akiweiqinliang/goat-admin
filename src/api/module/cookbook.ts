import request from "../axios";

// export const createCookBook() {
//
// }
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
