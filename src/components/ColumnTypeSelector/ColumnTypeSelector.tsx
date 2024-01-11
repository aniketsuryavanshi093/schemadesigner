import React, { useState } from 'react'
import Search from '../Search/Search'
import CustomSelector from './CustomSelector'

const ColumnTypeSelector = () => {
    const [ColumnType, setColumnType] = useState("")
  return (
    <CustomSelector 
    selectedvalue={ColumnType}
    defaultValue={}
    onDropdownSelect={(value) => setColumnType(value)}
    options={}
    />
  )
}

export default ColumnTypeSelector