import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useAppDispatch } from '../app/hooks';
import { resetEditedTag } from '../slices/todoSlice';
import { Tag } from '../types/task';
import { APP_URL } from '../types/url';

export const useMutateTag = () => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()

  const createTagMutation = useMutation(
    (tag: Omit<Tag, 'id'>) =>
      axios.post<Tag>(`${APP_URL}/tags/`, tag),
    {
      onSuccess: (res) => {
        const previousTags = queryClient.getQueryData<Tag[]>('tags')
        if (previousTags) {
          queryClient.setQueryData<Tag[]>('tags', [...previousTags, res.data])
        }
        dispatch(resetEditedTag())
      }
    }
  )

  const updateTagMutation = useMutation(
    (tag: Tag) =>
      axios.put<Tag>(`${APP_URL}/tags/`, tag),
    {
      onSuccess: (res, variables) => {
        const previousTags = queryClient.getQueryData<Tag[]>('tags')
        if (previousTags) {
          queryClient.setQueryData<Tag[]>(
            'tags',
            previousTags.map((tag) => tag.id === variables.id ? res.data : tag)
          )
        }
      }
    }
  )

  const deleteTagMutation = useMutation(
    (id: number) =>
      axios.delete<Tag>(`${APP_URL}/tags/${id}/`),
    {
      onSuccess: (res, variables) => {
        const previousTags = queryClient.getQueryData<Tag[]>('tags')
        if (previousTags) {
          queryClient.setQueryData<Tag[]>(
            'tags',
            previousTags.filter((tag) => tag.id !== variables)
          )
        }
      }
    }
  )

  return { createTagMutation, updateTagMutation, deleteTagMutation }
}
