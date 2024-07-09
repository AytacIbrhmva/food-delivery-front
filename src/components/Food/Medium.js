import React from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { LocaleContext } from '../../contexts/LocaleContext';
import { getPrice } from '../../helpers/billing';

export default function Medium(props) {

    const { food } = props;
    const {locale,getQr} = useContext(LocaleContext)
    const currency = locale.restaurant.currency
    const rid=locale.restaurant.uid;
    const tid=getQr.qrid;

    return (
        <div className='medium' key={food.id}>
            <div className='card'>
                <div className='card-top'>
                    <Link to={`/${rid}/${tid}/${food.connect}/${food.id}`} >
                        <img className='card-img' src={food.thumb} />
                    </Link>
                </div>
                <div className='card-body'>
                    <Link className='card-title' to={`/${rid}/${tid}/${food.connect}/${food.id}`} >
                        {
                            food.title.length > 12 ? food.title.substring(0, 12) + '...' : food.title}
                    </Link>
                    <Link className='card-subtitle' to={`/${rid}/${tid}/${food.connect}/${food.id}`} >
                        {food.category}
                    </Link>

                    <div className='details'>
                        <h5 className={`price ${food.models[0].discount ? 'discount' : ''}`}>
                            {
                                food.models[0].discount ?
                                    <span>{getPrice(currency, food.models[0].discount.price)}</span>
                                    : getPrice(currency, food.models[0].price)
                            }
                        </h5>

                    </div>
                </div>
            </div>
        </div>
    )
}
