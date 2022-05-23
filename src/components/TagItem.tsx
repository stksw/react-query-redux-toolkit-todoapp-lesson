import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import React, { memo, VFC } from 'react'
import { useAppDispatch } from '../app/hooks'
import { useMutateTag } from '../hooks/useMutateTag'
import { setEditedTag } from '../slices/todoSlice'
import { Tag } from '../types/task'

interface Props {
  tag: Tag
}

export const TagItem: VFC<Props> = memo(({ tag }) => {
  const dispatch = useAppDispatch()
  const { deleteTagMutation } = useMutateTag()
  console.log('rendered TagItem')
  if (deleteTagMutation.isLoading) {
    return <p>Deleting...</p>
  }
  return (
    <li className="my-3">
      <span className="font-bold">{tag.name}</span>
      <div className="flex float-right ml-20">
        <PencilAltIcon
          className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
          onClick={() => {
            dispatch(setEditedTag({ id: tag.id, name: tag.name }))
          }}
        />
        <TrashIcon
          className="h-5 w-5 text-blue-500 cursor-pointer"
          onClick={() => {
            deleteTagMutation.mutate(tag.id)
          }}
        />
      </div>
    </li>
  )
})