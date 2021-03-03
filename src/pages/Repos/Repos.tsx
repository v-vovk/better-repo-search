import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import {
  fetchRepos,
  setCurrentPage,
  setReposPerPage
} from '../../store/actions/repos'

import {
  Layout,
  Button,
  Input,
  Space,
  Pagination,
  Select,
  Skeleton,
  Alert,
  Card,
  Avatar,
  Row,
  Col,
  Statistic
} from 'antd'
import { SearchOutlined, StarFilled, WarningFilled } from '@ant-design/icons'

import './Repos.scss'
import Meta from 'antd/lib/card/Meta'

const { Content } = Layout
const { Option } = Select

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
    console.log(page)
    dispatch(setCurrentPage(page))
  }

  const reposPerPageHandler = (counts: number) => {
    console.log(counts)
    dispatch(setReposPerPage(counts))
  }

  const searchHandler = () => {
    paginationHandler(1)
    dispatch(fetchRepos(search, currentPage, reposPerPage))
  }

  const pagesCount = Math.ceil(totalCount / reposPerPage)

  return (
    <>
      <Layout className='layout'>
        <Content className='layout__container'>
          <div className='site-layout-content'>
            {error && <Alert message={error} type='error' />}
            <Space style={{ width: '100%', marginBottom: '20px' }}>
              <Input
                placeholder='Search repo'
                value={search}
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

            {loading ? (
              <Skeleton />
            ) : (
              <>
                <Space style={{ width: '100%' }}>
                  <Pagination
                    defaultCurrent={currentPage}
                    onChange={(page) => paginationHandler(page)}
                    showSizeChanger={false}
                    total={pagesCount}
                  />
                  <Select
                    defaultValue={reposPerPage}
                    onChange={(value) => reposPerPageHandler(value)}
                  >
                    <Option value={1}>1</Option>
                    <Option value={10}>10</Option>
                    <Option value={30}>30</Option>
                    <Option value={50}>50</Option>
                    <Option value={100}>100</Option>
                  </Select>
                </Space>
                <Space
                  direction='vertical'
                  size='large'
                  style={{ width: '100%' }}
                >
                  {!loading &&
                    repos.map((repo) => (
                      <Card
                        title={
                          <Meta
                            avatar={<Avatar src={repo.owner.avatar_url} />}
                            title={repo.name}
                            description={repo.description}
                          />
                        }
                        key={repo.id}
                        size='small'
                      >
                        <Row gutter={16}>
                          <Col span={12}>
                            <Statistic
                              title='Stars'
                              value={repo.stargazers_count}
                              prefix={<StarFilled />}
                            />
                          </Col>
                          <Col span={12}>
                            <Statistic
                              title='Issues'
                              value={repo.open_issues}
                              prefix={<WarningFilled />}
                            />
                          </Col>
                        </Row>
                      </Card>
                    ))}
                </Space>
                <Space>
                  <Pagination
                    defaultCurrent={currentPage}
                    onChange={(page) => paginationHandler(page)}
                    showSizeChanger={false}
                    total={pagesCount}
                  />
                  <Select
                    defaultValue={reposPerPage}
                    onChange={(value) => reposPerPageHandler(value)}
                  >
                    <Option value={10}>10</Option>
                    <Option value={30}>30</Option>
                    <Option value={50}>50</Option>
                    <Option value={100}>100</Option>
                  </Select>
                </Space>
              </>
            )}
          </div>
        </Content>
      </Layout>
    </>
  )
}

export default Repos
