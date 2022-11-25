import { FetchStatus } from '../todolists/models'
import { ServerTask } from '../../api'

export type TaskState = {
	fetchStatus: FetchStatus
	tasks: Record<string, ServerTask[]>
}
