import React from 'react'

const Commonheader: React.FC<{ title: string }> = ({ title }) => {

    return (
        <div className='mb-2 flex items-center justify-between pb-2'>

            <p>{title}</p>
            <div className='flex justify-between items-center '>

            </div>
        </div>
    )
}

export default Commonheader