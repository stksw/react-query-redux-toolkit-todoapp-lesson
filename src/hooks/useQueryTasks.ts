import axios from 'axios'
import { useQuery } from 'react-query'
import { Task } from '../types/task'
import { APP_URL } from '../types/url'

export const useQueryTasks = () => {
  const getTasks = async () => {
    const url = `${APP_URL}/tasks/`
    const { data } = await axios.get<Task[]>(url)
    return data
  }

  return useQuery<Task[], Error>({
    queryKey: "tasks",
    queryFn: getTasks,
    staleTime: 0,
  })
}
