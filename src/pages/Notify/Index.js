import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useParams } from 'react-router-dom'
import BackArrow from '../../components/BackArrow'
import { LocaleContext } from '../../contexts/LocaleContext';

export default function Index() {
  const location = useLocation();
  const { id, table } = useParams();
  const {locale,getQr}=useContext(LocaleContext)
  const { t } = useTranslation();

  return (
    <div className='notify-page'>
      <div className="navigation">
        <BackArrow target={`/${locale.restaurant.uid}/${getQr.qrid}`} />
      </div>
      <div className="content container">
        <img src={location.state.src} />
        <h1 className='title'>{location.state.title}</h1>
        <p>{location.state.desc}</p>
        {
          getQr.reservation == true ? (
            <>
            <Link to={`/${id}/${table}/reservation`} className="add-btn">{t('buttons.add_reservation')}</Link>
            <Link to={`/${id}/${table}`} className="add-btn outline">{t('buttons.home_page')}</Link>
            </>
          ) : <Link to={`/${id}/${table}`} className="add-btn">{t('buttons.home_page')}</Link>
        }
        
        
      </div>
    </div>
  )
}
