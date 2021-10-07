import React, { useRef, SyntheticEvent, useState } from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import Post from '../helpers/posts'
const EditMode = () => {
  return useSelector(
    (state) => ({
      editMode: state.editShiftMode,
      item: state.item,
      shiftaddmode: state.shiftaddmode
    }),
    shallowEqual
  )
}
const EditModal = () => {
  const { editMode, item, shiftaddmode } = EditMode()
  const formRef = useRef<HTMLFormElement>(null)
  const dispatch = useDispatch()
  return (
    <Modal
      open={editMode}
    >
      <Modal.Header>Add Shift</Modal.Header>
      <Modal.Content>
        <Form ref={formRef}
          onSubmit={async (e: SyntheticEvent) => {
            e.preventDefault();
            const target = e.target as typeof e.target & {
              title: { value: string };
              starthour: { value: string };
              endhour: { value: string };
            };
            if (shiftaddmode === true) {
              await Post('/api/add-shift',
              {
                day: item.date,
                starthour: target.starthour.value,
                endhour: target.endhour.value,
                title: target.title.value
              })
            } else {
              await Post('/api/update-shift',
              {
                day: item.date,
                starthour: target.starthour.value,
                endhour: target.endhour.value,
                title: target.title.value
              })
            }
            
            const days = await Post('/api/get-days', {})
            console.log(JSON.parse(days.data))
            const newlist = JSON.parse(days.data).data
            dispatch({
              type: 'UPDATE_SHIFT',
              shifts: []
            })
            dispatch({
              type: 'UPDATE_SHIFT',
              shifts: newlist
            })
            //  console.log(newlist)
            dispatch({
              type: 'EDIT_MODE',
              editShiftMode: false,
              item: {}
            })
          }}>
          <Form.Field>
            <label>Day</label>
            <input type="text" readOnly value={item.date} />
          </Form.Field>
          <Form.Field>
            <label>Title</label>
            <input placeholder='Shift Title' value={item.title} name="title" type="text" />
          </Form.Field>
          <Form.Field>
            <label>Start Hour</label>
            <input type="time" value={item.starthour} name="starthour" />
          </Form.Field>
          <Form.Field>
            <label>End Hour</label>
            <input type="time" value={item.endhour} name="endhour" />
          </Form.Field>
          <Button type='submit'>Submit</Button>
          <Button color='black' onClick={() => dispatch({
            type: 'EDIT_MODE',
            editShiftMode: false,
            item: {}
          })}>
            Nope
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default EditModal