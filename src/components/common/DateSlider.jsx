import React, { useState } from 'react'
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'



const DateSlider = ({onDateChange, onFilterChange}) => {
    const[dateRange, setDateRange]=useState({

        startDate:undefined,
        endDate:undefined,
        key:"selection"

    })
    const handelSelect=(ranges)=>{
        setDateRange(ranges.selection)
        onDateChange(ranges.selection.startDate, ranges.selection.endDate)
        onFilterChange(ranges.selection.startDate, ranges.selection.endDate)
    }
    const handelClearFilter=()=>{
        setDateRange({startDate:undefined,
        endDate:undefined,
        key:"selection"})
        onDateChange(null, null)
        onFilterChange(null, null)

    }
  return (
    <>
     <h4>Filter Booking By Range</h4>
     <DateRangePicker ranges={[dateRange]} onChange={handelSelect} className='mt-4'/>
     <button onClick={handelClearFilter} className='btn btn-secondary' >Clear Filter</button>
    </>   


  )
}

export default DateSlider