import request from "../axios";

export const getListByTagId = (page: number, pageSize: number, tagId: number) => {
    return request({
        url: '/notes',
        method: 'get',
        params: {
            page,
            pageSize,
            tagId,
        }
    })
}
export const createNote = (note: object) => {
    return request({
        url: '/notes/create',
        method: 'post',
        data: note
    })
}
export const deleteNote = (id: number) => {
    return request({
        url: `/notes/${id}`,
        method: 'delete',
    })
}
export const updateNote = (id: number, updateNote: object) => {
   return request({
       url: `/notes/update/${id}`,
       method: 'put',
       data: updateNote
   })
}
export const findListByTitle = (page: number, pageSize: number, tagId: number, title: string) => {
    return request({
        url: '/notes/find/findListByTitle',
        method: 'get',
        params: {
            page,
            pageSize,
            title,
            tagId,
        }
    })
}
export const findById = (id: number) => {
    return request({
        url: `/notes/${id}`,
        method: 'get',
    })
}
