export enum ReposActionTypes {
  FETCH_REPOS = 'FETCH_REPOS',
  FETCH_REPOS_SUCCESS = 'FETCH_REPOS_SUCCESS',
  FETCH_REPOS_ERROR = 'FETCH_REPOS_ERROR',
  SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
  SET_REPOS_PER_PAGE = 'SET_REPOS_PER_PAGE'
}

export interface ReposPayload {
  items: any[]
  total_count: number
  incomplete_results: boolean
}

export interface ReposState {
  repos: any[]
  loading: boolean
  error: null | string
  totalCount: number
  incompleteResults: boolean
  reposPerPage: number
  currentPage: number
}

interface FetchReposAction {
  type: ReposActionTypes.FETCH_REPOS
}

interface FetchReposSuccessAction {
  type: ReposActionTypes.FETCH_REPOS_SUCCESS
  payload: ReposPayload
}

interface FetchReposErrorAction {
  type: ReposActionTypes.FETCH_REPOS_ERROR
  payload: string
}

export interface SetCurrentPage {
  type: ReposActionTypes.SET_CURRENT_PAGE
  payload: number
}
export interface SetReposPerPage {
  type: ReposActionTypes.SET_REPOS_PER_PAGE
  payload: number
}

export type ReposAction =
  | FetchReposAction
  | FetchReposSuccessAction
  | FetchReposErrorAction
  | SetCurrentPage
  | SetReposPerPage
