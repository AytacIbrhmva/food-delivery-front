import React from 'react'
import { useTranslation } from 'react-i18next'
import NotFoundIcon from '../../assets/img/not-found-page.png'

export default function Index() {

    const {t}=useTranslation();

    return (
        <div className='notify-page'>
            <div className="content container">
                <img src={NotFoundIcon}/>
                <h1 className='title'>{t('responses.page_not_found')}</h1>
                <p>{t('responses.page_not_found_desc')}</p>
            </div>
        </div>
    )
}
