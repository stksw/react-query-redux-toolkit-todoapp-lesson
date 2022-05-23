import { memo, VFC } from 'react'
import { useQueryTasks } from '../hooks/useQueryTasks'
import { TaskItem } from './TaskItem'

export const TaskList: VFC = memo(() => {
  const { data, status } = useQueryTasks()
  if (status === 'loading') return <div>Loading...</div>
  if (status === 'error') return <div>Error...</div>

  console.log('task list')

  return (
    <div>
      <ul>
        {data?.map((task, idx) => (
          <TaskItem task={task} key={idx} />
        ))}
      </ul>
    </div>
  )
})