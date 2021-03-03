import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../hooks/useTypedSelector'

import { Layout, Button, Input, Space, Skeleton } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import { PaginationBar } from '../../components/PaginationBar/PaginationBar'
import { Repo } from '../../components/Repo/Repo'

import {
  fetchRepos,
  setCurrentPage,
  setReposPerPage
} from '../../store/actions/repos'

import './Repos.scss'
import { AlertBar } from '../../components/AlertBar/AlertBar'

const { Content } = Layout

const Repos: React.FC = () => {
  const {
    repos,
    error,
    loading,
    currentPage,
    reposPerPage,
    totalCount
  } = useTypedSelector((state) => state.repos)

  const [search, setSearch] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchRepos(search, currentPage, reposPerPage))
  }, [dispatch, currentPage, reposPerPage])

  const paginationHandler = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const reposPerPageHandler = (counts: number) => {
    dispatch(setReposPerPage(counts))
  }

  const searchHandler = () => {
    paginationHandler(1)
    dispatch(fetchRepos(search, currentPage, reposPerPage))
  }

  const pagesCount = Math.ceil(totalCount / reposPerPage)

  return (
    <Layout className='layout'>
      <Content className='layout__container'>
        <div className='site-layout-content'>
          {error && <AlertBar error={error} />}
          <Space style={{ width: '100%', marginBottom: '20px' }}>
            <Input
              placeholder='Search repo'
              value={search}
              onPressEnter={() => searchHandler()}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              type='primary'
              icon={<SearchOutlined />}
              onClick={() => searchHandler()}
            >
              Search
            </Button>
          </Space>

          {loading && repos.length > 0 ? (
            <Skeleton />
          ) : (
            <Space direction='vertical' style={{ width: '100%' }}>
              <PaginationBar
                currentPage={currentPage}
                paginationHandler={paginationHandler}
                pagesCount={pagesCount}
                reposPerPage={reposPerPage}
                reposPerPageHandler={reposPerPageHandler}
              />
              {repos.map((repo) => (
                <Repo repo={repo} key={repo.id} />
              ))}
            </Space>
          )}
        </div>
      </Content>
    </Layout>
  )
}

export default Repos
