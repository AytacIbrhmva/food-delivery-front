import { Skeleton } from '@mui/material'
import React from 'react'

export default function SkeletonIndex() {
    return (
        <>
            <div className='foods'>
                <Skeleton variant="rectangular" width="100%" height={98} style={{ borderRadius: '10px' }} />
                <Skeleton variant="rectangular" width="100%" height={98} style={{ borderRadius: '10px' }} />
                <Skeleton variant="rectangular" width="100%" height={200} style={{ borderRadius: '10px' }} />
            </div>
        </>
    )
}
