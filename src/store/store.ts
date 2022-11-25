import {
	AnyAction,
	applyMiddleware,
	combineReducers,
	legacy_createStore as createStore
} from 'redux'
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk'
import { todolistReducer } from './todolists/todolistReducer'
import { taskReducer } from './tasks/taskReducer'

const rootReducer = combineReducers({
	todolist: todolistReducer,
	task: taskReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type RootState = ReturnType<typeof rootReducer>
export type ThunkAppDispatchType = ThunkDispatch<RootState, any, AnyAction>
