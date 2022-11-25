import { useDispatch } from 'react-redux'
import { ThunkAppDispatchType } from '../store/store'

export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()
