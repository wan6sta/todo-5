import { TodoFilter, TodolistState } from './models'
import { ServerTodo } from '../../api'

const initialState: TodolistState = {
	fetchStatus: 'idle',
	todolists: []
}

type TodoAction =
	| ReturnType<typeof setTodolists>
	| ReturnType<typeof createTodolist>
	| ReturnType<typeof deleteTodolist>
	| ReturnType<typeof updateTodolistTitle>
	| ReturnType<typeof setFilter>

export const todolistReducer = (
	state = initialState,
	action: TodoAction
): TodolistState => {
	switch (action.type) {
		case todolistActions.setTodolists:
			return {
				...state,
				todolists: action.payload.todolists.map(tl => ({
					...tl,
					filter: 'all',
					isLoading: false
				}))
			}

		case todolistActions.createTodolist:
			return {
				...state,
				todolists: [
					{ ...action.payload.todolist, filter: 'all', isLoading: false },
					...state.todolists
				]
			}

		case todolistActions.deleteTodolist:
			return {
				...state,
				todolists: state.todolists.filter(
					tl => tl.id !== action.payload.todolistId
				)
			}

		case todolistActions.updateTodolistTitle:
			return {
				...state,
				todolists: state.todolists.map(tl =>
					tl.id === action.payload.todolistId
						? { ...tl, title: action.payload.title }
						: tl
				)
			}

		case todolistActions.setFilter:
			return {
				...state,
				todolists: state.todolists.map(tl =>
					tl.id === action.payload.todolistId
						? { ...tl, filter: action.payload.filter }
						: tl
				)
			}

		default:
			return state
	}
}

export const enum todolistActions {
	setTodolists = 'todo@SET_TODOLISTS',
	createTodolist = 'todo@CREATE_TODOLIST',
	deleteTodolist = 'todo@DELETE_TODOLIST',
	updateTodolistTitle = 'todo@UPDATE_TODOLIST_TITLE',
	setFilter = 'todo@SET_FILTER'
}

export const setTodolists = (todolists: ServerTodo[]) =>
	({
		type: todolistActions.setTodolists,
		payload: { todolists }
	} as const)

export const createTodolist = (todolist: ServerTodo) =>
	({
		type: todolistActions.createTodolist,
		payload: { todolist }
	} as const)

export const deleteTodolist = (todolistId: string) =>
	({
		type: todolistActions.deleteTodolist,
		payload: { todolistId }
	} as const)

export const updateTodolistTitle = (todolistId: string, title: string) =>
	({
		type: todolistActions.updateTodolistTitle,
		payload: {
			todolistId,
			title
		}
	} as const)

export const setFilter = (todolistId: string, filter: TodoFilter) =>
	({
		type: todolistActions.setFilter,
		payload: {
			todolistId,
			filter
		}
	} as const)
