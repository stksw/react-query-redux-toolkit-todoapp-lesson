import { VFC, memo } from 'react'
import { TrashIcon, PencilAltIcon } from '@heroicons/react/solid'
import { Task } from '../types/task'
import { useAppDispatch } from '../app/hooks'
import { useMutateTask } from '../hooks/useMatateTask'
import { setEditedTask } from '../slices/todoSlice'

interface Props {
  task: Task
}

export const TaskItem: VFC<Props> = memo(({ task }) => {
  const dispatch = useAppDispatch()
  const { deleteTaskMutation } = useMutateTask()
  if (deleteTaskMutation.isLoading) {
    return <p>Deleting...</p>
  }

  console.log('task item')

  return (
    <li className='my-3'>
      <span className='font-bold'>{task.title}</span>
      <span>
        {' : '}{task.tag_name}
      </span>

      <div className='flex float-right ml-20'>
        <PencilAltIcon
          className='h-5 w-5 mx-1 text-blue-500 cursor-pointer'
          onClick={() => dispatch(setEditedTask({
            id: task.id, title: task.title, tag: task.tag
          }))}
        />
        <TrashIcon
          className='h5- w-5 text-blue-500 cursor-pointer'
          onClick={() => deleteTaskMutation.mutate(task.id)}
        />
      </div>
    </li>
  )
})
