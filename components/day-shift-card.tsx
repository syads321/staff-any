import HourShiftList from './hour-shift-list'
import HourShift from "../interfaces/hours-shift";
export default function DayShiftCard(props: { id: number, shifts: Array<HourShift>, date: string }) {
    return <div className="column">
        <HourShiftList id={props.id} shifts={props.shifts} date={props.date} />
    </div>
}