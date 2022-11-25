import { TaskState } from './models'
import { deleteTodolist, todolistActions } from '../todolists/todolistReducer'
import { ServerTask } from '../../api/models'

const initialState: TaskState = {
	fetchStatus: 'idle',
	tasks: {}
}

type TaskAction =
	| ReturnType<typeof deleteTodolist>
	| ReturnType<typeof setTasks>
	| ReturnType<typeof createTask>
	| ReturnType<typeof deleteTask>
	| ReturnType<typeof updateTask>

export const taskReducer = (
	state = initialState,
	action: TaskAction
): TaskState => {
	switch (action.type) {
		case todolistActions.deleteTodolist:
			const stateCopy = { ...state, tasks: { ...state.tasks } }
			delete stateCopy.tasks[action.payload.todolistId]
			return stateCopy

		case taskActions.setTasks:
			return {
				...state,
				tasks: {
					...state.tasks,
					[action.payload.todolistId]: action.payload.tasks
				}
			}

		case taskActions.createTask: {
			const task = action.payload.task
			return {
				...state,
				tasks: {
					...state.tasks,
					[task.todoListId]: [task, ...state.tasks[task.todoListId]]
				}
			}
		}

		case taskActions.deleteTask: {
			const { taskId, todolistId } = action.payload
			return {
				...state,
				tasks: {
					...state.tasks,
					[todolistId]: state.tasks[todolistId].filter(tsk => tsk.id !== taskId)
				}
			}
		}

		case taskActions.updateTask: {
			const task = action.payload.task

			return {
				...state,
				tasks: {
					...state.tasks,
					[task.todoListId]: state.tasks[task.todoListId].map(tsk =>
						tsk.id === task.id ? task : tsk
					)
				}
			}
		}

		default:
			return state
	}
}

export const enum taskActions {
	setTasks = 'task@SET_TASKS',
	createTask = 'task@CREATE_TASK',
	deleteTask = 'task@DELETE_TASK',
	updateTask = 'task@UPDATE_TASK'
}

export const setTasks = (todolistId: string, tasks: ServerTask[]) =>
	({
		type: taskActions.setTasks,
		payload: { todolistId, tasks }
	} as const)

export const createTask = (task: ServerTask) =>
	({
		type: taskActions.createTask,
		payload: { task }
	} as const)

export const deleteTask = (todolistId: string, taskId: string) =>
	({
		type: taskActions.deleteTask,
		payload: { todolistId, taskId }
	} as const)

export const updateTask = (task: ServerTask) =>
	({
		type: taskActions.updateTask,
		payload: { task }
	} as const)
