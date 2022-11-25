import { TodolistState } from './models'

const initialState: TodolistState = {
	fetchStatus: 'idle',
	todolists: []
}

export const todolistReducer = (
	state = initialState,
	action: any
): TodolistState => {
	switch (action.type) {
		default:
			return state
	}
}
