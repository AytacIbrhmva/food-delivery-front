import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackArrow from '../../components/BackArrow'
import { BasketContext } from '../../contexts/BasketContext'
import ListItem from './components/ListItem'
import BasketSkeleton from './SkeletonIndex'
import SucessIcon from '../../assets/img/success.png'
import BasketEmptyIcon from '../../assets/img/basket-empty.png'
import { useTranslation } from 'react-i18next'
import { LocaleContext } from '../../contexts/LocaleContext'
// import PromoCode from './components/PromoCode'

export default function Index() {

    const [getBasket, setBasket] = useState({ foods: [], service_tax: 0, isLoading: true, errors: [] });
    const { locale,getQr } = useContext(LocaleContext);
    const basket = useContext(BasketContext);
    const rid = locale.restaurant.uid;
    const tid = getQr.qrid;

    const navigate = useNavigate();
    const { t } = useTranslation();

    const subTotalPrice = getBasket.foods.reduce((total, food) => (total = total + (food.model.discount ? food.model.discount.price : food.model.price) * food.quantity), 0).toFixed(2)


    useEffect(() => {
        if (!basket.getBasket.isLoading) {
            if (basket.getBasket.foods.length) {
                axios.post(`${process.env.REACT_APP_API_HOST}/restaurants/${rid}/basket`, { food: basket.getBasket.foods })
                    .then(res => {
                        setBasket({ ...getBasket, foods: res.data.data.foods, service_tax: res.data.data.service_tax, isLoading: false })
                    }).catch((err) => basket.clearBasket())
            } else {
                navigate(`/${rid}/${getQr.qrid}/notify`, {
                    state: {
                        title: t('responses.basket_is_clear'),
                        desc: t('responses.basket_is_clear_desc'),
                        src: BasketEmptyIcon,
                        isReserve:getQr.reservation
                    }
                })
            }
        }
    }, [basket])

    const addOrder = () => {
        if (getQr.reservation == true) {
            navigate(`/${rid}/${tid}/reservation`)
        } else {
            const params = basket.getBasket.foods;
            axios.put(`${process.env.REACT_APP_API_HOST}/orders`, {
                foods: params, tid, rid, payment: 0
            }).then(res => {
                navigate(`/${rid}/${tid}/notify`, {
                    state: {
                        title: t('responses.order_success'),
                        desc: t('responses.order_success_desc'),
                        src: SucessIcon
                    }
                })
                basket.clearBasket()
            })
        }
    }

    return (
        <div className="container">
            <div className='product-list basket'>
                <div className="topnav">
                    <BackArrow target={`/${rid}/${tid}`} />
                    <h1 className='title'>{t('pages.basket')}</h1>
                </div>
                {
                    getBasket.isLoading ? <BasketSkeleton /> :
                        <>
                            <ListItem foods={getBasket.foods} />
                            {/* <PromoCode /> */}
                            <div className='payment-side'>
                                <div className='group-between'>
                                    <label>{t('misc.subtotal')}</label>
                                    <span>{subTotalPrice + ' AZN'}</span>
                                </div>
                                <div className='group-between'>
                                    <label>{t('misc.service_tax')}</label>
                                    <span>{Number(subTotalPrice * getBasket.service_tax / 100).toFixed(2) + ' AZN'}</span>
                                </div>
                                <div className='group-between'>
                                    <label>{t('misc.total')}</label>
                                    <span>{(Number(subTotalPrice) + Number(subTotalPrice * getBasket.service_tax / 100)).toFixed(2) + ' AZN'}</span>
                                </div>
                                <button className='add-btn' onClick={() => addOrder()}>{t('buttons.confirm_order')}</button>
                            </div>
                        </>
                }
            </div>
        </div>

    )
}
