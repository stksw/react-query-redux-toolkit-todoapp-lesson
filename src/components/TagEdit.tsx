import { FormEvent, VFC } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useMutateTag } from '../hooks/useMutateTag'
import { selectTag, setEditedTag } from '../slices/todoSlice'

export const TagEdit: VFC = () => {
  const dispatch = useAppDispatch()
  const editedTag = useAppSelector(selectTag)
  const { createTagMutation, updateTagMutation } = useMutateTag()

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedTag.id === 0) createTagMutation.mutate(editedTag)
    else {
      updateTagMutation.mutate(editedTag)
    }
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          className="mb-3 px-3 py-2 border border-gray-300"
          type="text"
          placeholder='new tag ?'
          onChange={(e) => dispatch(setEditedTag({ ...editedTag, name: e.target.value }))}
          value={editedTag.name}
        />

        <button
          className="disabled:opacity-40 my-3 mx-3 py-2 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded"
          disabled={!editedTag.name}
        >
          {editedTag.id === 0 ? 'Create' : 'Update'}
        </button>
      </form>

    </div>
  )
}
