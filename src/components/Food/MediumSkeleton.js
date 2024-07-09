import { Skeleton } from '@mui/material'
import React from 'react'

export default function MediumSkeleton(props) {

    return (
        Array(props.item).fill(1).map((el, i) =>
            <div key={i} className="medium">
                <Skeleton variant="rectangular" width={170} height={213} style={{ borderRadius: '10px' }} />
            </div>
        )
    )
}
