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
