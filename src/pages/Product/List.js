import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BackArrow from '../../components/BackArrow';
import Medium from '../../components/Food/Medium';
import { Skeleton } from '@mui/material';
import MediumSkeleton from '../../components/Food/MediumSkeleton';
import DataNotFoundIcon from '../../assets/img/data-not-found.png'
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { LocaleContext } from '../../contexts/LocaleContext';


export default function List(props) {

    const [getList, setList] = useState({ title: null, foods: [], currentPage: 1, latestPage: 1, errors: [], isLoading: true })
    const { menu } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const { locale } = useContext(LocaleContext);
    const { getQr } = useContext(LocaleContext);
    const rid = locale.restaurant.uid;
    const tid = getQr.qrid;


    const moreHandler = () => {
        setList({ ...getList, currentPage: getList.currentPage += 1 })
        axios.get(`${process.env.REACT_APP_API_HOST}/restaurants/${rid}/groups/${menu}&page=${getList.currentPage}`)
            .then(res => setList({ ...getList, foods: [...getList.foods, ...res.data.data.foods.data] }))
    }


    useEffect(() => {
        if (props.static === 'popular') {
            axios.get(`${process.env.REACT_APP_API_HOST}/restaurants/${rid}/popular`)
                .then(res => setList({ ...getList, title: props.title, foods: res.data.data, isLoading: false }))
                .catch(err => {
                    navigate(`/${rid}/${tid}/notify`, {
                        state: {
                            title: t('responses.data_not_found'),
                            desc: '',
                            src: DataNotFoundIcon
                        }
                    })
                })
        } else if (props.static === 'topweek') {
            axios.get(`${process.env.REACT_APP_API_HOST}/restaurants/${rid}/topweek`)
                .then(res => setList({ ...getList, title: props.title, foods: res.data.data, isLoading: false }))
                .catch(err => {
                    navigate(`/${rid}/${tid}/notify`, {
                        state: {
                            title: t('responses.data_not_found'),
                            desc: '',
                            src: DataNotFoundIcon
                        }
                    })
                })
        } else {
            axios.get(`${process.env.REACT_APP_API_HOST}/restaurants/${rid}/groups/${menu}&page=${getList.currentPage}`)
                .then(res => setList({
                        ...getList, 
                        title: res.data.data.title,
                        foods: res.data.data.foods.data,
                        latestPage: res.data.data.foods.last_page,
                        isLoading: false
                    }))
                .catch(err => {
                    navigate(`/${rid}/${tid}/notify`, {
                        state: {
                            title: t('responses.data_not_found'),
                            desc: '',
                            src: DataNotFoundIcon
                        }
                    })
                })
        }
    }, [])


    return (
        <div className='container'>
            <div className="topnav">
                <BackArrow target={`/${locale.restaurant.uid}/${tid}`} />
                <h1 className='title' style={{ flex:'1' }}>
                    {
                        getList.title ?? <Skeleton variant="text" width={'70%'} sx={{ fontSize: '32px' }} />
                    }
                </h1>
            </div>
            <div className='product-grid-list'>

                {
                    getList.isLoading
                        ? <MediumSkeleton item={6} />
                        : getList.foods && getList.foods.length ?
                            getList.foods.map((food, i) => <Medium key={i} food={food} />)
                            :
                            <div className='message-side'>
                                <img src={DataNotFoundIcon} alt="" style={{ width: "175px" }} />
                                <h5 className='title'>{t('responses.food_not_exist')}</h5>
                            </div>
                }

            </div>
            {
                getList.currentPage === getList.latestPage ? null :
                    props.static ? null :
                        <div className="pagination">
                            <button className='mx-auto btn-sm btn-primary' onClick={() => moreHandler()}>{t('misc.see_more')}</button>
                        </div>
            }
        </div>
    )
}
