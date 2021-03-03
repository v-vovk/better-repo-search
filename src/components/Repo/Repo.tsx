import React from 'react'
import { Avatar, Card } from 'antd'
import Meta from 'antd/lib/card/Meta'
import { StarFilled, WarningFilled } from '@ant-design/icons'

interface RepoProps {
  repo: {
    name: string
    description: string
    owner: {
      avatar_url: string
    }
    stargazers_count: number
    open_issues: number
  }
}

export const Repo: React.FC<RepoProps> = ({ repo }) => {
  return (
    <Card size='small'>
      <Meta
        avatar={<Avatar src={repo.owner.avatar_url} />}
        title={
          <>
            {repo.name} - {repo.description}
          </>
        }
        description={
          <>
            <StarFilled />
            {repo.stargazers_count}, <WarningFilled />
            {repo.open_issues}
          </>
        }
      />
    </Card>
  )
}
