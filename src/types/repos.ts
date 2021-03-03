export enum ReposActionTypes {
  FETCH_REPOS = 'FETCH_REPOS',
  FETCH_REPOS_SUCCESS = 'FETCH_REPOS_SUCCESS',
  FETCH_REPOS_ERROR = 'FETCH_REPOS_ERROR'
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
  total_count: number
  incomplete_results: boolean
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

export type ReposAction =
  | FetchReposAction
  | FetchReposSuccessAction
  | FetchReposErrorAction
