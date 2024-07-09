import React from 'react'

export default function PromoCode() {
    return (
        <div className='promocode-side'>
            <form>
                <input type='text' placeholder='Promo code' />
                <button className='apply-btn'>Apply</button>
            </form>
        </div>
    )
}
