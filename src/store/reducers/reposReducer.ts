import { ReposAction, ReposState, ReposActionTypes } from '../../types/repos'

const initialState: ReposState = {
  repos: [],
  loading: false,
  error: null,
  total_count: 0,
  incomplete_results: false
}

export const reposReducer = (
  state = initialState,
  action: ReposAction
): ReposState => {
  switch (action.type) {
    case ReposActionTypes.FETCH_REPOS:
      return { ...state, loading: true }
    case ReposActionTypes.FETCH_REPOS_SUCCESS:
      return {
        ...state,
        loading: false,
        repos: action.payload.items,
        total_count: action.payload.total_count,
        incomplete_results: action.payload.incomplete_results
      }
    case ReposActionTypes.FETCH_REPOS_ERROR:
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}
