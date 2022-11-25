import { TaskState } from './models'

const initialState: TaskState = {
	fetchStatus: 'idle',
	tasks: {}
}

export const taskReducer = (state = initialState, action: any): TaskState => {
	switch (action.type) {
		default:
			return state
	}
}
