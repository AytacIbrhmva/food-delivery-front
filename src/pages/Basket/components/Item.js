import React, { useContext, useState } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { BasketContext } from '../../../contexts/BasketContext';
import { LocaleContext } from '../../../contexts/LocaleContext';
import { getPrice } from '../../../helpers/billing';

export default function Item(props) {

    const basket = useContext(BasketContext);
    const [getFood, setFood] = useState({ food: props.food })
    const localeContext=useContext(LocaleContext)
    const currency=localeContext.locale.restaurant.currency

    const increment = () => {
        setFood({
            ...getFood,
            food: {
                ...getFood.food,
                quantity: getFood.food.quantity += 1
            }
        })

        basket.updateBasket({
            id: getFood.food.id,
            model: getFood.food.model.id,
            quantity: getFood.food.quantity,
        })
    }


    const decrement = () => {
        if (getFood.food.quantity > 1) {
            setFood({
                ...getFood, food: {
                    ...getFood.food,
                    quantity: getFood.food.quantity -= 1
                }
            })

            basket.updateBasket({
                id: getFood.food.id,
                model: getFood.food.model.id,
                quantity: getFood.food.quantity,
            })
        }
    }

    return (
        <div className='food'>
            <div className='img'>
                <img src={getFood.food.thumb} />
            </div>
            <div className='about'>
                <h3 className='title'>
                    {getFood.food.title}
                </h3>
                <h6 className='model'>{`${getFood.food.model.title}`}</h6>
                <label className='price'>
                    <span>{getFood.food.model.discount ? getPrice(currency,getFood.food.model.discount.price) : getPrice(currency,getFood.food.model.price)}</span>
                </label>
            </div>
            <div className="actions">
                <button onClick={() => basket.removeItem(getFood.food.id, getFood.food.model.id)} className='remove-btn'>
                    <FiTrash2 className='icon' />
                </button>
                <div className='number-container'>
                    <button onClick={() => decrement()} className='btn'>-</button>
                    <label className='number'>{getFood.food.quantity}</label>
                    <button onClick={() => increment()} className='btn'>+</button>
                </div>
            </div>
        </div>
    )
}
