import { TaskState } from './models'
import { TaskPriorities, TaskStatuses } from '../../api/models'
import {
	createTask,
	deleteTask,
	setTasks,
	taskReducer,
	updateTask
} from './taskReducer'

let initialTaskState: TaskState = {
	fetchStatus: 'idle',
	tasks: {}
}

beforeEach(() => {
	initialTaskState = {
		fetchStatus: 'idle',
		tasks: {
			'1': [
				{
					todoListId: '1',
					id: '1',
					title: '123',
					addedDate: '123',
					completed: false,
					deadline: '123',
					description: '123123',
					order: 1,
					priority: TaskPriorities.Hi,
					startDate: '123',
					status: TaskStatuses.InProgress
				},
				{
					todoListId: '1',
					id: '2',
					title: 'dgdfgdg',
					addedDate: '1321312',
					completed: false,
					deadline: '123131',
					description: '1231312312123',
					order: 12,
					priority: TaskPriorities.Hi,
					startDate: '3133213',
					status: TaskStatuses.InProgress
				}
			],
			'2': [
				{
					todoListId: '2',
					id: '1',
					title: '123',
					addedDate: '123',
					completed: false,
					deadline: '123',
					description: '123123',
					order: 1,
					priority: TaskPriorities.Hi,
					startDate: '123',
					status: TaskStatuses.InProgress
				},
				{
					todoListId: '2',
					id: '2',
					title: 'dgdfgdg',
					addedDate: '1321312',
					completed: false,
					deadline: '123131',
					description: '1231312312123',
					order: 12,
					priority: TaskPriorities.Hi,
					startDate: '3133213',
					status: TaskStatuses.InProgress
				}
			],
			'3': []
		}
	}
})

test('setTasks', () => {
	const tasks = [
		{
			todoListId: '3',
			id: '12',
			title: '1231213212ssdfsddf',
			addedDate: '123',
			completed: false,
			deadline: '123',
			description: '123123',
			order: 1,
			priority: TaskPriorities.Hi,
			startDate: '123',
			status: TaskStatuses.InProgress
		},
		{
			todoListId: '3',
			id: '2213',
			title: '12312123',
			addedDate: '1321312',
			completed: false,
			deadline: '123131',
			description: '1231312312123',
			order: 12,
			priority: TaskPriorities.Hi,
			startDate: '3133213',
			status: TaskStatuses.InProgress
		}
	]
	const action = setTasks('3', tasks)
	const newState = taskReducer(initialTaskState, action)

	expect(newState.tasks['3'][1].id).toBe('2213')
	expect(newState.tasks['1'].length).toBe(2)
	expect(newState.tasks['2'][1].title).toBe('dgdfgdg')
})

test('createTask', () => {
	const task = {
		todoListId: '2',
		id: '12',
		title: 'NEWNEWNEWNEWNEWNEWNEWNEWNEW',
		addedDate: '123',
		completed: false,
		deadline: '123',
		description: '123123',
		order: 1,
		priority: TaskPriorities.Hi,
		startDate: '123',
		status: TaskStatuses.InProgress
	}

	const action = createTask(task)
	const newState = taskReducer(initialTaskState, action)

	expect(newState.tasks['2'].length).toBe(3)
	expect(newState.tasks['2'][0].title).toBe('NEWNEWNEWNEWNEWNEWNEWNEWNEW')
	expect(newState.tasks['2'][2].title).toBe('dgdfgdg')
	expect(newState.tasks['2'][0].id).toBe('12')
	expect(newState.tasks['2'][2].id).toBe('2')
})

test('deleteTask', () => {
	const action = deleteTask('2', '1')
	const newState = taskReducer(initialTaskState, action)

	expect(newState.tasks[2].find(tsk => tsk.id === '1')).toBeFalsy()
	expect(newState.tasks[2][0].id === '2').toBeTruthy()
	expect(newState.tasks[2].length).toBe(1)
	expect(newState.tasks[1].length).toBe(2)
})

test('updateTask', () => {
	const task = {
		todoListId: '2',
		id: '2',
		title: 'UPDATEDUPDATEDUPDATED',
		addedDate: '123',
		completed: false,
		deadline: '123',
		description: 'newnewnew',
		order: 1,
		priority: TaskPriorities.Hi,
		startDate: '123',
		status: TaskStatuses.InProgress
	}

	const action = updateTask(task)
	const newState = taskReducer(initialTaskState, action)

	expect(newState.tasks['2'][1].title === 'UPDATEDUPDATEDUPDATED').toBeTruthy()
	expect(newState.tasks['2'][1].description === 'newnewnew').toBeTruthy()
	expect(newState.tasks['2'].length).toBe(2)
})
