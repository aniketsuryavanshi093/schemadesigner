'use server'
import { useParams } from 'next/navigation'
import React from 'react'

const Folder = async () => {
    const { id } = useParams()
    return (
        <Commonheader
        title="My favorites
"
      />
        <div>Folder</div>
    )
}

export default Folder