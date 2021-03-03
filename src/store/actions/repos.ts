import { ReposActionTypes } from './../../types/repos'
import { Dispatch } from 'redux'
import { ReposAction } from '../../types/repos'
import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URL

export const fetchRepos = (searchQuery = 'stars:%3E1') => async (
  dispatch: Dispatch<ReposAction>
) => {
  try {
    dispatch({ type: ReposActionTypes.FETCH_REPOS })

    const responce = await axios.get(
      `${baseUrl}/search/repositories?q=${searchQuery}&sort=stars`
    )

    dispatch({
      type: ReposActionTypes.FETCH_REPOS_SUCCESS,
      payload: responce.data
    })
  } catch (error) {
    dispatch({
      type: ReposActionTypes.FETCH_REPOS_ERROR,
      payload: error
    })
  }
}
