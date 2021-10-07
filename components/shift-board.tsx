import { useSelector, shallowEqual } from 'react-redux'
import DayShiftCard from './day-shift-card'
const Shifts = () => {
    return useSelector(
        (state) => ({
            dayshift: state.shifts
        }),
        shallowEqual
    )
}
export default function ShiftBoard() {
    const { dayshift } = Shifts()
    const shiftlist = dayshift.map((e: any, key: number) => {
        return <DayShiftCard key={key.toString()} id={e.id} shifts={e.shifts} date={e.day} />
    })
    return <div className="ui container">
        <div className="ui three column grid">
            <h3>{shiftlist.length === 0 ? 'You have no shifts days, click add day to add one ' : ''}</h3>
            {shiftlist}
        </div>
    </div>
}