import { Skeleton } from '@mui/material'
import React from 'react'

export default function ListSkeleton() {
    return (<Skeleton variant="rectangular" width="100%" height={200} style={{ borderRadius: '10px' }} />)
}
