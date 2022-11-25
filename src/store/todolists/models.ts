export type FetchStatus = 'idle' | 'loading' | 'success' | 'failed'

export type TodoFilter = 'all' | 'active' | 'completed'

type Todo = {
	id: string
	addedDate: string
	order: number
	title: string
	filter: TodoFilter
	isLoading: boolean
}

export type TodolistState = {
	fetchStatus: FetchStatus
	todolists: Todo[]
}
