import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BackArrow from '../../components/BackArrow';
import { BasketContext } from '../../contexts/BasketContext';
import SkeletonSingle from './SkeletonSingle';
import DataNotFoundIcon from '../../assets/img/data-not-found.png'
import { useTranslation } from 'react-i18next';
import { LocaleContext } from '../../contexts/LocaleContext';
import { getPrice } from '../../helpers/billing';

export default function Single() {

    const [getFood, setFood] = useState({ food: {}, model: null, quantity: 1, isLoading: true })

    const { fid } = useParams();
    const basket = useContext(BasketContext);

    const navigate = useNavigate();
    const { t } = useTranslation();
    const {locale} = useContext(LocaleContext)
    const {getQr} = useContext(LocaleContext)
    const currency = locale.restaurant.currency

    const rid=locale.restaurant.uid;
    const tid=getQr.qrid;

    const setModel = (id, price) => setFood({ ...getFood, model: id });
    const apply = () => basket.addBasket(({ id: getFood.food.id, model: getFood.model, quantity: getFood.quantity }))


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_HOST}/restaurants/${rid}/foods/${fid}`)
            .then((res) => {
                const { data } = res.data
                setFood({ ...getFood, food: data, model: data.models[0].id, isLoading: false })
            })
            .catch(err => {
                // navigate(`/${rid}/${tid}/notify`, {
                //     state: {
                //         title: t('responses.food_not_exist'),
                //         desc: '',
                //         src: DataNotFoundIcon
                //     }
                // })
            }
            )
    }, [])



    return (
        <div className='about-food'>
            <div className="navigation">
                <BackArrow target={`/${rid}/${tid}`} />
            </div>
            {
                getFood.isLoading ? <SkeletonSingle /> :
                    <>
                        <div className="cover">
                            <img className='top-img' src={getFood.food.src} />
                        </div>
                        <div className='container'>
                            <div className='food-main'>
                                <h3 className='food-title'>{getFood.food.title}</h3>
                                <div className='food-details'>                                 
                                    <div className='detail'>
                                        <i className="fa-solid fa-timer"></i>
                                        <label>{getFood.food.delivery_time + t('misc.minuties')}</label>
                                    </div>
                                </div>
                                <div className='food-desc'>
                                    <h4>{t('misc.description')}</h4>
                                    <p>{getFood.food.description}</p>
                                </div>
                                <div className='models-section'>
                                    <h4>{t('misc.type')}</h4>
                                    <div className="models">
                                        {
                                            getFood.food.models ?
                                                getFood.food.models.map((model, i) => (
                                                    <div key={i} className={`model ${Number(model.id) === Number(getFood.model) ? ' active' : null}`} onClick={() => setModel(model.id, model.price)}>
                                                        <h6>{model.title}</h6>
                                                        <span>{model.discount ? getPrice(currency, model.discount.price) : getPrice(currency, model.price)}</span>
                                                    </div>
                                                ))
                                                : null
                                        }
                                    </div>
                                </div>
                                <div className='order-details'>
                                    {
                                        getFood.food.models ?
                                            <p className='price'>
                                                {
                                                    getFood.food.models.find(model => Number(model.id) === Number(getFood.model)).discount ?
                                                        getPrice(currency, getFood.food.models.find(model => Number(model.id) === Number(getFood.model)).discount.price) :
                                                        getPrice(currency, getFood.food.models.find(model => Number(model.id) === Number(getFood.model)).price)
                                                }
                                            </p>
                                            : null
                                    }
                                    <button className='add-btn' onClick={() => apply()}>{t('buttons.add_basket')}</button>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}
