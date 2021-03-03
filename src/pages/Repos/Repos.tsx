import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { fetchRepos } from '../../store/actions/repos'

const Repos: React.FC = () => {
  const { repos, error, loading } = useTypedSelector((state) => state.repos)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchRepos())
  }, [dispatch])

  return (
    <>
      {loading && <h1>Loading...</h1>}
      {error && <h2>{error}</h2>}
      {repos.map((repo) => (
        <div>{repo.name}</div>
      ))}
    </>
  )
}

export default Repos
