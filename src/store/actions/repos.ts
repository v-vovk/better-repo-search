import { ReposActionTypes } from './../../types/repos'
import { Dispatch } from 'redux'
import { ReposAction, SetCurrentPage, SetReposPerPage } from '../../types/repos'
import api from '../../cache'

export const fetchRepos = (
  searchQuery = '',
  currentPage = 1,
  reposPerPage = 30
) => async (dispatch: Dispatch<ReposAction>) => {
  try {
    dispatch({ type: ReposActionTypes.FETCH_REPOS })

    if (searchQuery !== '') {
      const responce = await api.get(
        `/search/repositories?q=${searchQuery}&sort=stars&per_page=${reposPerPage}&page=${currentPage}`
      )

      dispatch({
        type: ReposActionTypes.FETCH_REPOS_SUCCESS,
        payload: responce.data
      })
    } else {
      dispatch({
        type: ReposActionTypes.FETCH_REPOS_CLEAR
      })
    }
  } catch (error) {
    dispatch({
      type: ReposActionTypes.FETCH_REPOS_ERROR,
      payload: error.message
    })
  }
}

export const setCurrentPage = (page: number): SetCurrentPage => ({
  type: ReposActionTypes.SET_CURRENT_PAGE,
  payload: page
})

export const setReposPerPage = (counts: number): SetReposPerPage => ({
  type: ReposActionTypes.SET_REPOS_PER_PAGE,
  payload: counts
})
