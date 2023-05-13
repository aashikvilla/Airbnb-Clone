'use client'

import {Range, RangeKeyDict, DateRange} from 'react-date-range'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

interface CalenderProps{
    value: Range,
    onChange:(value: RangeKeyDict) => void,
    disabledDates?: Date[]

}

function Calender({value, onChange, disabledDates}:CalenderProps) {
  return (
    <DateRange 
    rangeColors={["#262626"]}
    ranges={[value]}
    date={new Date()}
    direction='vertical'
    showDateDisplay={false}
    minDate={new Date()}
    disabledDates={disabledDates}
    onChange={onChange}

    
    />
  )
}

export default Calender