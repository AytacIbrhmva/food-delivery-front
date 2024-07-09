import React, { useContext, useEffect, useState } from 'react'
import SearchBar from './SearchBar';
import { BiShoppingBag } from 'react-icons/bi';
import { Link, useParams } from 'react-router-dom';
import { BasketContext } from '../../../../contexts/BasketContext';
import AvatarIcon from '../../../../assets/img/avatar.webp'
import axios from 'axios';
import { Skeleton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SearchModalContext } from '../../../../contexts/SearchModalContext';
import { LocaleContext } from '../../../../contexts/LocaleContext';


export default function Header() {

    const {locale}=useContext(LocaleContext)
    const restaurant=locale.restaurant
    const basket = useContext(BasketContext);
    const searchContext = useContext(SearchModalContext);
    const { id, table } = useParams();
    const { t, i18n } = useTranslation();

    return (
        <div className='header'>
            <div className='header-top'>
                <div className='welcome'>
                    <img className='avatar' src={AvatarIcon} />
                    <div className='name-container'>
                        {
                            locale.isLoading ? <Skeleton variant="text" width={180} sx={{ fontSize: '28px' }} /> :
                                <>
                                    <h3>{t('misc.welcome')} </h3>
                                    <img className='waving-icon' src='https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f44b.png' />
                                </>
                        }
                    </div>
                </div>
                <div className="actions">
                    <Link to="/" onClick={(e) => searchContext.handleClickOpen(e)}><i className="fa-regular fa-magnifying-glass disabled"></i></Link>
                    <Link to={`/${id}/${table}/basket`} className='right'>
                        <i className="fa-regular fa-bag-shopping" style={{ fontSize: '24px' }}></i>
                        <div className='food-number'>{basket.getBasket.foods.length}</div>
                    </Link>

                </div>
            </div>
            <div className='header-bottom'>
                <h1 className='menu-title'>{t('home.welcome_text')}</h1>
                {/* <SearchBar /> */}
            </div>
        </div>
    )
}
