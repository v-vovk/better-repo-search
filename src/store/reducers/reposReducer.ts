import { ReposAction, ReposState, ReposActionTypes } from '../../types/repos'

const initialState: ReposState = {
  repos: [],
  loading: false,
  error: null,
  totalCount: 0,
  incompleteResults: false,
  reposPerPage: 30,
  currentPage: 1
}

export const reposReducer = (
  state = initialState,
  action: ReposAction
): ReposState => {
  switch (action.type) {
    case ReposActionTypes.FETCH_REPOS:
      return { ...state, loading: true, error: null }
    case ReposActionTypes.FETCH_REPOS_SUCCESS:
      return {
        ...state,
        loading: false,
        repos: action.payload.items,
        totalCount: action.payload.total_count,
        incompleteResults: action.payload.incomplete_results
      }

    case ReposActionTypes.FETCH_REPOS_ERROR:
      return { ...state, loading: false, error: action.payload }

    case ReposActionTypes.FETCH_REPOS_CLEAR:
      return { ...state, loading: false, repos: [] }

    case ReposActionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      }

    case ReposActionTypes.SET_REPOS_PER_PAGE:
      return {
        ...state,
        reposPerPage: action.payload
      }

    default:
      return state
  }
}
