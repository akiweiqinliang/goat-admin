import request from '../axios'
export const getCookbookTagList = () => {
    return request({
        url: '/tags',
        method: 'get',
        params: {
            tagType: 0,
        }
    })
}
export const getLearnNoteTagList = () => {
    return request({
        url: '/tags',
        method: 'get',
        params: {
            tagType: 1,
        }
    })
}
