import { TodolistState } from './models'
import {
	createTodolist,
	deleteTodolist,
	setFilter,
	setTodolists,
	todolistReducer,
	updateTodolistTitle
} from './todolistReducer'
import { ServerTodo } from '../../api/models'
import { TaskState } from '../tasks/models'
import { taskReducer } from '../tasks/taskReducer'

let serverTodoState: ServerTodo[] = []

let initialTodoState: TodolistState = {
	fetchStatus: 'idle',
	todolists: []
}

beforeEach(() => {
	serverTodoState = [
		{ id: '1', title: '123', order: 1, addedDate: 'fd' },
		{ id: '2', title: '1311232', order: 2, addedDate: 'sdfsdqeqefsdsf' },
		{ id: '3', title: '123131', order: 3, addedDate: 'sdsfsffdsf' },
		{ id: '4', title: '12313123', order: 5, addedDate: 'dfsfds' }
	]
	initialTodoState = todolistReducer(
		initialTodoState,
		setTodolists(serverTodoState)
	)
})

test('setTodolists', () => {
	const action = setTodolists(serverTodoState)
	const newState = todolistReducer(initialTodoState, action)

	expect(newState !== initialTodoState).toBeTruthy()
	expect(newState.fetchStatus === initialTodoState.fetchStatus).toBeTruthy()
	expect(newState.todolists[0]).toEqual({
		id: '1',
		title: '123',
		filter: 'all',
		isLoading: false,
		order: 1,
		addedDate: 'fd'
	})
	expect(newState.todolists.length === 4).toBeTruthy()
	expect(newState.todolists[2].id).toEqual('3')
	expect(newState.todolists[3].title).toBe('12313123')
})

test('createTodolist', () => {
	const action = createTodolist({
		id: '123123',
		title: 'sfsfsdf',
		addedDate: '123123',
		order: 11
	})
	const newState = todolistReducer(initialTodoState, action)

	expect(newState.todolists.length === 5).toBeTruthy()
	expect(newState.todolists[1].id === '1').toBeTruthy()
	expect(newState.todolists[0].filter === 'all').toBeTruthy()
	expect(newState.todolists[0].isLoading).toBeFalsy()
	expect(newState.todolists[0].title === 'sfsfsdf').toBeTruthy()
	expect(newState.todolists[0].id === '123123').toBeTruthy()
})

test('deleteTodolist', () => {
	const initialTasksState: TaskState = {
		fetchStatus: 'idle',
		tasks: {
			'1': [],
			'2': [],
			'3': [],
			'4': []
		}
	}

	const todoAction = deleteTodolist('3')

	const newTodoState = todolistReducer(initialTodoState, todoAction)
	const newTaskState = taskReducer(initialTasksState, todoAction)

	expect(newTodoState.todolists.length === 3).toBeTruthy()
	expect(newTodoState.todolists.find(tl => tl.id === '3')).toBeFalsy()
	expect(newTodoState.todolists[2].id === '4').toBeTruthy()
	expect(newTaskState.tasks['3']).toBeFalsy()
	expect(newTaskState.tasks['1']).toEqual([])
})

test('updateTodolistTitle', () => {
	const action = updateTodolistTitle('4', 'NEW TITLE!#!#@')
	const newState = todolistReducer(initialTodoState, action)

	expect(
		newState.todolists.length === initialTodoState.todolists.length
	).toBeTruthy()
	expect(newState.todolists[3].title === 'NEW TITLE!#!#@').toBeTruthy()
	expect(newState.todolists[1].id === '2').toBeTruthy()
})

test('setFilter', () => {
	const action = setFilter('1', 'active')
	const newState = todolistReducer(initialTodoState, action)

	expect(newState.todolists[0].filter === 'active').toBeTruthy()
	expect(newState.todolists.length).toBe(4)
	expect(newState.todolists[3].filter === 'all').toBeTruthy()
	expect(newState.todolists.filter(tl => tl.filter === 'all').length).toBe(3)
})
