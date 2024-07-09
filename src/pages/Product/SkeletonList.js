import React from 'react'

export default function SkeletonList() {
  return (
    <>
      <h1 className='title'>{getList.title}</h1>
      <div className='product-main'>
        <div className='product-container'>
          {
            getList.isLoading ?
              <MediumSkeleton item={8} /> :
              getList.foods.map((food, i) => <Medium key={i} food={food} />
              )}
        </div>
      </div>
    </>
  )
}
