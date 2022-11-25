import { TaskState } from './models'
import { deleteTodolist, todolistActions } from '../todolists/todolistReducer'

const initialState: TaskState = {
	fetchStatus: 'idle',
	tasks: {}
}

type TaskAction = ReturnType<typeof deleteTodolist>

export const taskReducer = (
	state = initialState,
	action: TaskAction
): TaskState => {
	switch (action.type) {
		case todolistActions.deleteTodolist:
			const stateCopy = { ...state, tasks: { ...state.tasks } }
			delete stateCopy.tasks[action.payload.todolistId]
			return stateCopy

		default:
			return state
	}
}
