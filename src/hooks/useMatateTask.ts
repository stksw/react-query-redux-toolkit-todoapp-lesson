import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { useAppDispatch } from '../app/hooks'
import { EditTask, Task } from '../types/task'
import { resetEditedTask } from '../slices/todoSlice'
import { APP_URL } from '../types/url'

export const useMutateTask = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  const createTaskMutation = useMutation(
    (task: Omit<EditTask, 'id'>) =>
      axios.post<Task>(`${APP_URL}/tasks/`, task),
    {
      onSuccess: (res) => {
        const previousTodos = queryClient.getQueryData<Task[]>('tasks')
        if (previousTodos) {
          queryClient.setQueryData<Task[]>(
            'tasks',
            [...previousTodos, res.data]
          )
        }
        dispatch(resetEditedTask())
      }
    }
  )

  const updateTaskMutation = useMutation(
    (task: EditTask) =>
      axios.put<Task>(`${APP_URL}/tasks/${task.id}`, task),
    {
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>('tasks')
        if (previousTodos) {
          queryClient.setQueryData<Task[]>(
            'tasks',
            previousTodos.map((task) =>
              task.id === variables.id ? res.data : task
            )
          )
        }
        dispatch(resetEditedTask())
      }
    }
  )

  const deleteTaskMutation = useMutation(
    (id: number) =>
      axios.delete(`${APP_URL}/tasks/${id}`),
    {
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>('tasks')
        if (previousTodos) {
          queryClient.setQueryData<Task[]>('tasks',
            previousTodos.filter((task) => task.id !== variables)
          )
        }
        dispatch(resetEditedTask)
      }
    }
  )

  return { createTaskMutation, updateTaskMutation, deleteTaskMutation }
}

