import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import BackArrow from '../../components/BackArrow'
import { BasketContext } from '../../contexts/BasketContext'
import FoodinCart from '../../page/checkout/components/FoodinCart'
import ListItem from './components/ListItem'
import PromoCode from './components/PromoCode'

export default function Index() {

    const basket = useContext(BasketContext);
    const { id, table } = useParams();
    const [getBasket, setBasket] = useState({ foods: [], service_tax: 0, errors: [] })
    const navigate = useNavigate();

    const subTotalPrice = getBasket.foods
        .reduce((total, food) => (total = total + food.model.price * food.quantity), 0).toFixed(2)



    useEffect(() => {
        if (basket.getBasket.foods.length) {
            axios.post(`${process.env.REACT_APP_API_HOST}/restaurants/${id}/basket`, { food: basket.getBasket.foods })
                .then(res => {
                    setBasket({ ...getBasket, foods: res.data.data.foods, service_tax: res.data.data.service_tax })
                }).catch((err) => {
                    basket.clearBasket()
                })
        }else{
            navigate(`/${id}/${table}/notify`, {
                state: {
                    title: 'Səbətiniz boşdur',
                    desc: 'Səbətinizdə heçbir məhsul yoxdur.  Ana səhifəyə keçid edərək məhsul sifariş edə bilərsiniz',
                    src: 'https://cdn2.iconfinder.com/data/icons/outline-web-application-1/20/cart-512.png'
                }
            })
        }
    }, [basket])

    const addOrder = () => {
        const params = basket.getBasket.foods;
        axios.put(`${process.env.REACT_APP_API_HOST}/order`, {
            foods: params, table, rid: id, payment: 0
        }).then(res => {
            navigate(`/${id}/${table}/notify`, {
                state: {
                    title: 'Sifarişiniz qeydə alınmışdır',
                    desc: 'lorem',
                    src: 'https://uxwing.com/wp-content/themes/uxwing/download/checkmark-cross/blue-check-mark-icon.png'
                }
            })
            basket.clearBasket()
        })
    }

    return (
        <div className='basket container'>
                <div className="navigation">
                    <BackArrow />
                </div>
                <ListItem foods={getBasket.foods} />
                <PromoCode />
                <div className='payment-side'>
                    <div className='group-between'>
                        <label>Yekun</label>
                        <span>{subTotalPrice + ' AZN'}</span>
                    </div>
                    <div className='group-between'>
                        <label>Servis Haqqı</label>
                        <span>{Number(subTotalPrice * getBasket.service_tax / 100).toFixed(2) + ' AZN'}</span>
                    </div>
                    <div className='group-between'>
                        <label>Toplam</label>
                        <span>{(Number(subTotalPrice) + Number(subTotalPrice * getBasket.service_tax / 100)).toFixed(2) + ' AZN'}</span>
                    </div>
                    <button className='add-btn' onClick={() => addOrder()}>Sifarişi təsdiqlə</button>
                </div>
            </div>
            
    )
}
