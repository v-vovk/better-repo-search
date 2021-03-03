import React from 'react'
import { Pagination, Select, Space } from 'antd'

const { Option } = Select

interface PaginationBarProps {
  currentPage: number
  pagesCount: number
  reposPerPage: number
  paginationHandler: (page: number) => void
  reposPerPageHandler: (value: number) => void
}

export const PaginationBar: React.FC<PaginationBarProps> = ({
  currentPage,
  pagesCount,
  reposPerPage,
  paginationHandler,
  reposPerPageHandler
}) => {
  return (
    <Space style={{ width: '100%', marginBottom: '20px' }}>
      <Pagination
        defaultCurrent={currentPage}
        onChange={(page: number) => paginationHandler(page)}
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
  )
}
