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
const EditShiftModal = () => {
    const { editMode, item, shiftaddmode } = EditMode()
    const formRef = useRef<HTMLFormElement>(null)
    const defaultvalue = {
        date: item.date,
        title: item.title,
        starthour: item.starthour,
        endhour: item.endhour
    }
    const [shiftItem, setShiftItem] = useState(defaultvalue)
    const dispatch = useDispatch()
    return (
        <Modal
            open={editMode}
        >
            <Modal.Header>{shiftaddmode ? 'Add Shift' : 'Edit Shift'}</Modal.Header>
            <Modal.Content>
                <Form ref={formRef}
                    onSubmit={async (e: SyntheticEvent) => {
                        e.preventDefault();
                        if (shiftaddmode === true) {
                            await Post('/api/add-shift',
                                {
                                    day: item.date,
                                    starthour: shiftItem.starthour,
                                    endhour: shiftItem.endhour,
                                    title: shiftItem.title
                                })
                        } else {
                            await Post('/api/update-shift',
                                {
                                    day: item.date,
                                    starthour: shiftItem.starthour || item.starthour,
                                    endhour: shiftItem.endhour || item.endhour,
                                    title: shiftItem.title || item.title
                                })
                        }

                        const days = await Post('/api/get-days', {})
                        const newlist = JSON.parse(days.data).data
                        dispatch({
                            type: 'UPDATE_SHIFT',
                            shifts: []
                        })
                        dispatch({
                            type: 'UPDATE_SHIFT',
                            shifts: newlist
                        })
                        dispatch({
                            type: 'EDIT_MODE',
                            editShiftMode: false,
                            item: {}
                        })
                    }}>
                    <Form.Field>
                        <label>Day</label>
                        <input type="text" readOnly value={item.date} onChange={() => { }} />
                    </Form.Field>
                    <Form.Field>
                        <label>Title</label>
                        <input placeholder='Shift Title' defaultValue={item.title} onChange={(e: any) => setShiftItem({ ...shiftItem, title: e.target.value })} name="title" type="text" />
                    </Form.Field>
                    <Form.Field>
                        <label>Start Hour</label>
                        <input type="time" defaultValue={item.starthour} name="starthour" onChange={(e: any) => setShiftItem({ ...shiftItem, starthour: e.target.value })} />
                    </Form.Field>
                    <Form.Field>
                        <label>End Hour</label>
                        <input type="time" defaultValue={item.endhour} name="endhour" onChange={(e: any) => setShiftItem({ ...shiftItem, endhour: e.target.value })} />
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

export default EditShiftModal