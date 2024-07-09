import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useDebouncedCallback } from 'use-debounce';
import { CircularProgress } from '@mui/material';
import { getPrice } from '../helpers/billing'
import DataNotFoundIcon from '../assets/img/data-not-found.png'
import { useContext } from 'react';
import { LocaleContext } from './LocaleContext';
import { Link, useNavigate } from 'react-router-dom';
import { t } from 'i18next';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
        background: 'white',

    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
        background: 'white',

    },
    '.MuiBackdrop-root': {
        backdropFilter: 'blur(8px)',
        background: '#ffffff7d'
    },
    '.MuiPaper-root': {
        borderRadius: '10px',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'

    }


}));


export const SearchModalContext = React.createContext();

export default function SearchModalProvider(props) {
    const [open, setOpen] = useState(false);
    const [getSearch, setSearch] = useState('');
    const [getFoods, setFoods] = useState({ foods: [], isLoading: false, errors: null });
    const navigate = useNavigate()

    const handleClickOpen = (e) => {
        e.preventDefault()
        setOpen(true);
    };
    const handleClose = () => {
        setSearch('');
        setFoods({ foods: [], isLoading: false, errors: null })
        setOpen(false);
    };

    const { locale,getQr } = useContext(LocaleContext)
    const rid=locale.restaurant.uid;
    const tid=getQr.qrid;
    const currency = locale.restaurant.currency

    const debounced = useDebouncedCallback((value) => { setSearch(value); }, 500);

    useEffect(() => {
        if (getSearch.length > 3) {
            setFoods({ ...getFoods, isLoading: true })
            axios.post(`${process.env.REACT_APP_API_HOST}/restaurants/${rid}/search`, { name: getSearch })
                .then(res => {
                    if (res.data.data.length) {
                        setFoods({ ...getFoods, foods: res.data.data, isLoading: false })
                    } else {
                        setFoods({ ...getFoods, errors: 'data_not_found', isLoading: false })

                    }
                })
                .catch(err => {
                    navigate(`/${rid}/${tid}/notify`, {
                        state: {
                            title: t('responses.error_ocurred'),
                            desc: t('responses.error_ocurred_desc'),
                            src: DataNotFoundIcon
                        }
                    })
                })
        }
    }, [getSearch])


    return (
        <SearchModalContext.Provider value={{ open, handleClickOpen }}>
            {props.children}
            <BootstrapDialog className='modal' fullWidth={true} maxWidth={"lg"} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <div className="search-panel">
                    <div className="panel">
                        <div className="head">
                            <h4 className='title'>{t('home.search')}</h4>
                            <input type="text" value={getSearch.query} onChange={(e) => debounced(e.target.value)} />
                            <sub>{t('misc.food_name')}</sub>
                        </div>
                        {
                            getFoods.isLoading || getFoods.foods.length || getFoods.errors ?
                                <div className="body">
                                    {
                                        getFoods.isLoading
                                            ? <CircularProgress className='progress-loader' color="inherit" style={{ margin: '0 auto' }} />
                                            : getFoods.foods.length ?
                                                <div className="results">
                                                    {
                                                        getFoods.foods.map((food, i) => {
                                                            return <div className="result" key={i}>
                                                                <Link to={`/${rid}/${tid}/${food.connect}/${food.id}`} onClick={() => handleClose()}>
                                                                    <div className='food'>
                                                                        <div className='img'>
                                                                            <img src={food.thumb} />
                                                                        </div>
                                                                        <div className='about'>
                                                                            <h3 className='title'>{food.title}</h3>
                                                                            <span className="sub-title">{food.category}</span>
                                                                            <label className='price'><span>{getPrice(currency, food.models[0].price)}</span></label>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                                : getFoods.errors === 'data_not_found' ? <h4 className='text-muted' style={{ fontWeight: 600, margin: '20px 0px' }}>{t('responses.data_not_found')}</h4> : null
                                    }
                                </div>

                                : null
                        }
                    </div>

                </div>
            </BootstrapDialog>
        </SearchModalContext.Provider>
    );
}