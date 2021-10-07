import { useState } from 'react';
import HourShift from '../interfaces/hours-shift'
import Hour from '../interfaces/hour';
import ShiftItem from './shift-item';
import { useDispatch } from 'react-redux';
import { Button, List, Icon, Confirm } from 'semantic-ui-react'
import moment from 'moment';
import refreshShifts from '../helpers/refreshShifts'
import Post from '../helpers/posts';

export default function HourShiftList(props: { id: number, shifts: Array<HourShift>, date: string }) {
    let list: Array<HourShift> = [];
    let hours: Array<Hour> = [];
    for (let i = 0; i < 24; i++) {
        hours.push({
            title: i < 10 ? '0' + i.toString() + ':00' : i.toString() + ':00',
            hour: i
        })
    }
    const [hourslist] = useState(hours);
    const multiplier = 50;
    const [shifts] = useState(props.shifts)
    const dispatch = useDispatch()
    const [deleteConfirm, setDeletConfirm] = useState(false)

    const deleteDay = async (id: number, day: string) => {
        try {
            await Post('/api/delete-day',
                {
                    id: id,
                    day: day
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
            setDeletConfirm(false)
        } catch (e) {

        }

    }

    return <div>
        <h3 className="ui header">{moment(props.date).format('LL')}</h3>
        <div className="right aligned">
            <Button primary type="button" onClick={() => {
                dispatch({
                    type: 'EDIT_MODE',
                    editShiftMode: true,
                    shiftaddmode: true,
                    item: {
                        date: props.date
                    }
                })
            }}>Add Shift</Button>
            <Button icon="trash" content="Delete Day" color='red' type="button" onClick={() => {
                setDeletConfirm(true)
            }}></Button>
            <Confirm
                open={deleteConfirm}
                onCancel={() => setDeletConfirm(false)}
                onConfirm={() => deleteDay(props.id, props.date)}
                size="mini"
            />
        </div>
        <div className="wrapper">
            {shifts.map((elm: any, key: number) => {
                return <ShiftItem key={key.toString()} title={elm.title} starthour={elm.starthour} endhour={elm.endhour} date={props.date} multiplier={multiplier} id={elm.id} />
            })}
            <List divided verticalAlign='middle'>
                {hourslist.map((elm, key) => {
                    return <List.Item className="item" key={key.toString()} style={{ height: multiplier }}>
                        <List.Content style={{ 'line-height': multiplier - 5 }}>
                            <Icon name='clock' />
                            {elm.title}
                        </List.Content>
                    </List.Item>
                })}
            </List>
            <div className="ui relaxed divided list">
                {/* {hourslist.map((elm, key) => {
                    return <div className="item" key={key.toString()} style={{ height: multiplier }}>
                        <i className="large clock middle aligned icon"></i>
                        <div className="content">
                            <div className="header">{elm.title}</div>
                        </div>
                    </div>
                })} */}
            </div>
            <style jsx>{`
       .wrapper {
         position:relative;
       }
       .timeslot {
           position:absolute;
       }
      `}</style>
        </div>
    </div>
}