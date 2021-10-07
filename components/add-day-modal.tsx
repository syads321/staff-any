import React, { useRef, SyntheticEvent, useState, SetStateAction } from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import refreshShifts from '../helpers/refreshShifts';
import moment from 'moment';
import Post from '../helpers/posts'
const EditMode = () => {
  return useSelector(
    (state) => ({
      editMode: state.addDayMode,
    }),
    shallowEqual
  )
}
const AddDayModal = () => {
  const { editMode } = EditMode()
  const formRef = useRef<HTMLFormElement>(null)
  const [dayshift, setDayShift] = useState(new Date());
  const dispatch = useDispatch()
  const onChange = (event: any, data: { value: SetStateAction<null>; }) => {
    setDayShift(data.value)
  };
  return (
    <Modal
      open={editMode}
      size={'mini'}
    >
      <Modal.Header>Add Shift</Modal.Header>
      <Modal.Content>
        <Form ref={formRef}
          onSubmit={async (e: SyntheticEvent) => {
            e.preventDefault();
            await Post('/api/add-day',
              {
                day: moment(dayshift).format()
              })
            const shifts = await refreshShifts()
            dispatch({
              type: 'UPDATE_SHIFT',
              shifts: []
            })
            dispatch({
              type: 'UPDATE_SHIFT',
              shifts: shifts
            })
            dispatch({
              type: 'ADD_DAY',
              addDayMode: false,
              item: {}
            })
          }}>
          <Form.Field>
            <label>Day</label>
            <SemanticDatepicker value={dayshift} onChange={(elm, data) => onChange(elm, data)} />
          </Form.Field>
          <Button type='submit'>Submit</Button>
          <Button color='black' onClick={() => dispatch({
            type: 'ADD_DAY',
            addDayMode: false,
          })}>
            Cancel
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default AddDayModal