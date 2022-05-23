import axios from 'axios'
import { useQuery } from 'react-query'
import { APP_URL } from '../types/url'
import { Tag } from '../types/task'

export const useQueryTags = () => {
  const getTags = async () => {
    const url = `${APP_URL}/tags/`
    const { data } = await axios.get<Tag[]>(url)
    return data
  }

  return useQuery<Tag[], Error>({
    queryKey: "tags",
    queryFn: getTags,
    staleTime: 60000,
  })
}
