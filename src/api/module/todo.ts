import request from "../axios";
type Todo = {
    title: string,
    detail: string,
}
export const findAll = () => {
    return request({
        url: '/todos',
        method: 'get'
    })
}
export const deleteTodo = (id: number) => {
    return request({
        url: `/todos/${id}`,
        method: 'delete'
    })
}
export const createTodo = (todo: Todo) => {
    return request({
        url: '/todos/create',
        method: 'post',
        data: todo
    })
}
