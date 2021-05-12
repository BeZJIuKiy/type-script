import axios from "axios";
import { Dispatch } from "redux";
import { TodoAction, TodoActionsTypes } from "../../types/todo";


export const fetchTodo = (page = 1, limit = 10) => {
    return async (dispatch: Dispatch<TodoAction>) => {
        try {
            dispatch({ type: TodoActionsTypes.FETCH_TODO });
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos', {
                params: { _page: page, _limit: limit }
            })

            setTimeout(() => {
                dispatch({
                    type: TodoActionsTypes.FETCH_TODO_SUCCESS,
                    payload: response.data,
                })
            }, 500)

        } catch (e) {
            dispatch({
                type: TodoActionsTypes.FETCH_TODO_ERROR,
                payload: 'Произошла ошибка при загрузке списка дел',
            });
        }
    }
}

export const setTodoPage = (page: number): TodoAction => {
    return {
        type: TodoActionsTypes.SET_TODO_PAGE, 
        payload: page,
    }
}