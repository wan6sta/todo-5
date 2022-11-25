export type ServerTodo = {
	id: string
	addedDate: string
	order: number
	title: string
}

export const enum TaskStatuses {
	New = 0,
	InProgress = 1,
	Completed = 2,
	Draft = 3
}

export const enum TaskPriorities {
	Low = 0,
	Middle = 1,
	Hi = 2,
	Urgently = 3,
	Later = 4
}

export type ServerTask = {
	description: string
	title: string
	completed: boolean
	status: TaskStatuses
	priority: TaskPriorities
	startDate: string
	deadline: string
	id: string
	todoListId: string
	order: number
	addedDate: string
}

export type DefaultResponse<D = {}> = {
	data: D
	fieldsErrors: string[]
	messages: string[]
	resultCode: number
}

export type GetTasksResponse = {
	error: string | null
	items: ServerTask[]
	totalCount: number
}

export type UpdateTaskModel = {
	title: string
	description: string
	completed: boolean
	status: TaskStatuses
	priority: TaskPriorities
	startDate: string
	deadline: string
}
