// @ts-ignore
import request from "../axios";

export const getAdminInfo = () => {
    return request({
        url: '/users/findByName',
        method: 'post',
        // data: {
        //     username,
        // }
    })
}
export const getAllUsers = (page: number, pageSize: number) => {
    return request({
        url: '/users',
        method: 'get',
        params: {
            page,
            pageSize,
        }
    })
}
