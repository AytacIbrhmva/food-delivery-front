import { isDisabled } from '@testing-library/user-event/dist/utils';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiSearch } from 'react-icons/bi'
import { useNavigate, useParams } from 'react-router-dom';

export default function SearchBar() {

  const {id,table}=useParams()
  const navigate = useNavigate();
  const {t} = useTranslation()

 

  const [getSearch, setSearch] = useState('')

  let handleChange = (e) => setSearch(e.target.value)

  const handleClick = () =>  getSearch.length >= 3 ? navigate(`/${id}/${table}/search/${getSearch}`) : null
  const handleKeypress = e => e.keyCode === 13 ? handleClick() : null

  return (
    
    <div className='search-container'>
      <div className='input-container'>
          <input type='text' onChange={(e) => handleChange(e)} onKeyDown={(e)=>handleKeypress(e)} placeholder={t('home.search')} value={getSearch}/>
        </div>
        <button className='filter-btn' disabled={getSearch.length >= 3 ? false : true} onClick={()=>handleClick()}><BiSearch className='search-icon' /></button>
    </div>
  )
}
