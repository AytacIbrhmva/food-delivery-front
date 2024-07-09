import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import BackArrow from '../../components/BackArrow';
import Medium from '../../components/Food/Medium';
import MediumSkeleton from '../../components/Food/MediumSkeleton';
import SearchBar from '../Home/components/Header/SearchBar';
import DataNotFoundIcon from '../../assets/img/data-not-found.png'
import { useTranslation } from 'react-i18next';
import { LocaleContext } from '../../contexts/LocaleContext';

export default function Index() {

    const [getList, setList] = useState({ foods: [], errors: [], isLoading: true })
    const { title } = useParams();
    const {t}=useTranslation();
    const navigate = useNavigate();

    const {locale} = useContext(LocaleContext);
    const rid = locale.restaurant_id;
    const tid = locale.table_id;


    useEffect(()=>{
        axios.post(`${process.env.REACT_APP_API_HOST}/restaurants/${rid}/${tid}/search`,{
            name:title
        }).then(res => setList({ ...getList,  foods: res.data.data, isLoading: false }))
                .catch(err => {
                    navigate(`/${rid}/${tid}/notify`, {
                        state: {
                            title: t('responses.error_ocurred'),
                            desc: t('responses.error_ocurred_desc'),
                            src: DataNotFoundIcon
                        }
                    })
                })
    },[title])

  return (
    <div className='product-list search-page'>
            <div className='container'>
                <BackArrow />
                <SearchBar value={title}/>
                <h1 className='title'>#{title}</h1>
                <div className='product-main'>
                    <div className='product-container'>
                        {
                            getList.isLoading
                                ? <MediumSkeleton item={6} />
                                : getList.foods.length ? getList.foods.map((food, i) => <Medium key={i} food={food} />)
                                    :
                                    <div className='message-side position-none'>
                                        <img src={DataNotFoundIcon} alt="" />
                                        <h5 className='title'>{t('responses.food_not_exist')}</h5>
                                    </div>}
                    </div>
                </div>
            </div>

        </div>
  )
}
