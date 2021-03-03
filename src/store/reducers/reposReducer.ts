import { ReposAction, ReposState, ReposActionTypes } from '../../types/repos'

const initialState: ReposState = {
  repos: [],
  loading: false,
  error: null
}

export const reposReducer = (
  state = initialState,
  action: ReposAction
): ReposState => {
  switch (action.type) {
    case ReposActionTypes.FETCH_REPOS:
      return { ...state, loading: true }
    case ReposActionTypes.FETCH_REPOS_SUCCESS:
      return { ...state, loading: false, repos: action.payload }
    case ReposActionTypes.FETCH_REPOS_ERROR:
      return { loading: false, error: action.payload, repos: [] }

    default:
      return state
  }
}
