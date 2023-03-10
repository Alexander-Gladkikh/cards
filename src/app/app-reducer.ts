import { AppThunk } from 'app/store'
import { authAPI } from 'common/api/authAPI'
import { requestsStatus } from 'common/api/DataTypes'
import { requestStatus } from 'common/components/constants/requestStatus'
import { setIsLoggedIn } from 'features/Login/login-reducer'
import { setUserData } from 'features/Profile/profile-reducer'

const initialState = {
  status: requestStatus.IDLE as requestsStatus, // idle - начальное значение (простаивание)
  error: null as null | string,
  isInitialized: false,
}

export const appReducer = (state = initialState, action: ApplicationActionType): AppInitialStateType => {
  switch (action.type) {
    case 'APP/SET_STATUS': {
      return { ...state, status: action.status }
    }
    case 'APP/SET-ERROR':
      return { ...state, error: action.error }
    case 'APP/SET-IS-INITIALIZED':
      return { ...state, isInitialized: action.isInitialized }
    default:
      return state
  }
}
// actions
export const appSetStatus = (status: requestsStatus) => ({ type: 'APP/SET_STATUS', status } as const)
export const setAppError = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const)
export const setIsInitialized = (isInitialized: boolean) => ({ type: 'APP/SET-IS-INITIALIZED', isInitialized } as const)

// types
export type AppInitialStateType = typeof initialState

// thunks
export const initializeAppTC = (): AppThunk => async dispatch => {
  try {
    const response = await authAPI.me()
    const { name, email, _id, avatar } = response.data

    dispatch(setIsLoggedIn(true))
    dispatch(setUserData({ name, _id, email, avatar }))
  } finally {
    dispatch(setIsInitialized(true))
  }
}

export type AppSetStatusType = ReturnType<typeof appSetStatus>
export type ApplicationActionType =
  | AppSetStatusType
  | ReturnType<typeof setAppError>
  | ReturnType<typeof setIsInitialized>
