import axios, { CreateAxiosDefaults } from 'axios'
import {
	DefaultResponse,
	GetTasksResponse,
	ServerTask,
	ServerTodo,
	UpdateTaskModel
} from './models'

const todoConfig: CreateAxiosDefaults = {
	baseURL: 'https://social-network.samuraijs.com/api/1.1',
	withCredentials: true,
	headers: {
		'API-KEY': '4c455b41-e9e2-41e3-8498-c52fd2cfffdc'
	}
}

const todoInstance = axios.create(todoConfig)

export const todoApiInstance = {
	getTodolists() {
		return todoInstance.get<ServerTodo[]>('/todo-lists')
	},

	createTodolist(title: string) {
		return todoInstance.post<DefaultResponse<{ item: ServerTodo }>>(
			'/todo-lists',
			{ title }
		)
	},

	deleteTodolist(todolistId: string) {
		return todoInstance.delete<DefaultResponse>(`/todo-lists/${todolistId}`)
	},

	updateTodolistTitle(todolistId: string, title: string) {
		return todoInstance.put<DefaultResponse>(`/todo-lists/${todolistId}`, {
			title
		})
	},

	getTasks(todolistId: string) {
		return todoInstance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
	},

	createTask(todolistId: string, title: string) {
		return todoInstance.post<DefaultResponse<{ item: ServerTask }>>(
			`/todo-lists/${todolistId}/tasks`,
			{
				title
			}
		)
	},

	deleteTask(todolistId: string, taskId: string) {
		return todoInstance.delete<DefaultResponse>(
			`/todo-lists/${todolistId}/tasks/${taskId}`
		)
	},

	updateTask(todolistId: string, taskId: string, model: UpdateTaskModel) {
		return todoInstance.put<DefaultResponse<{ item: ServerTask }>>(
			`/todo-lists/${todolistId}/tasks/${taskId}`,
			model
		)
	}
}
