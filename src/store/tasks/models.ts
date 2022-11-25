import { FetchStatus } from '../todolists/models'
import { ServerTask } from '../../api/models'

export type TaskState = {
	fetchStatus: FetchStatus
	tasks: Record<string, ServerTask[]>
}
