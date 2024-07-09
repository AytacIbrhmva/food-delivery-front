import { Skeleton } from '@mui/material'
import React from 'react'

export default function SkeletonSingle() {
    return (
        <>
            <Skeleton variant="rectangular" width={'100%'} height={250} style={{ borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }} />
            <div className="container">
                <div className="food-main">
                    <Skeleton variant="text" width="70%" sx={{ fontSize: '28px' }} />
                    <div className="food-details">
                        <div className="detail">
                            <Skeleton variant="text" width="90px" sx={{ fontSize: '25px' }} />
                        </div>
                        <div className="detail">
                            <Skeleton variant="text" width="90px" sx={{ fontSize: '25px' }} />
                        </div>
                        <div className="detail">
                            <Skeleton variant="text" width="90px" sx={{ fontSize: '25px' }} />
                        </div>
                    </div>
                    <div className="food-desc">
                        <Skeleton variant="text" width="40%" sx={{ fontSize: '24px' }} />
                        <Skeleton variant="text" width="100%" sx={{ fontSize: '16px' }} />
                        <Skeleton variant="text" width="100%" sx={{ fontSize: '16px' }} />
                        <Skeleton variant="text" width="100%" sx={{ fontSize: '16px' }} />
                        <Skeleton variant="text" width="100%" sx={{ fontSize: '16px' }} />
                        <Skeleton variant="text" width="100%" sx={{ fontSize: '16px' }} />
                        <Skeleton variant="text" width="100%" sx={{ fontSize: '16px' }} />
                        <Skeleton variant="text" width="100%" sx={{ fontSize: '16px' }} />
                    </div>
                    <div className="models-section">
                        <Skeleton variant="text" width="40%" sx={{ fontSize: '24px' }} />
                        <div className="models">
                            <Skeleton variant="rectangular" width="35%" height={39} style={{ borderRadius: 50 }} />
                            <Skeleton variant="rectangular" width="35%" height={39} style={{ borderRadius: 50 }} />
                        </div>
                    </div>

                    <div className="order-details" style={{ width:'100%' }}>
                        <Skeleton variant="text" width="35%" sx={{ fontSize: '35px' }} style={{margin:'0 auto', marginBottom:'9px'}}/>
                        <Skeleton variant="rectangular" width="100%" height={47} style={{ borderRadius: 50, marginTop:'20px' }} />
                    </div>
                </div>

            </div>
        </>
    )
}
