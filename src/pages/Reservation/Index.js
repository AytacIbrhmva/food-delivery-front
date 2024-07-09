import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import BackArrow from '../../components/BackArrow';
import { LocaleContext } from '../../contexts/LocaleContext';

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import axios from 'axios';
import { BasketContext } from '../../contexts/BasketContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SucessIcon from '../../assets/img/success.png'
import NotFoundIcon from '../../assets/img/not-found-page.png'

export default function Reservation() {

  const [reservation, setReservation] = useState({
    name: '',
    surname: '',
    phone: '',
    guests: 1,
    table: '',
    date: '',
    note: '',
    tables: [],
    errors: {}
  })

  const handleChange = (newValue) => {
    setReservation({
      ...reservation,
      date: dayjs(newValue).format('DD/MM/YY HH:MM')
    })
  };

  const navigate = useNavigate();
  const { getBasket, clearBasket } = useContext(BasketContext);
  const { locale, getQr, setQr } = useContext(LocaleContext);
  const rid = locale.restaurant.uid;
  const tid = getQr.qrid;
  const { t } = useTranslation();

  const inputHandler = (e) => {

    const { name, value } = e.target
    setReservation({
      ...reservation,
      [name]: value
    })
  }

  const submitHandler = () => {

    axios.put(`${process.env.REACT_APP_API_HOST}/reservations`, {
      rid, tid,
      name: reservation.name,
      surname: reservation.surname,
      phone: reservation.phone,
      guests: reservation.guests,
      table: reservation.table,
      note: reservation.note,
      date: reservation.date,
      foods: getBasket.foods
    }).then(() => {
      navigate(`/${rid}/${tid}/notify`, {
        state: {
          title: t('responses.reservation_success'),
          desc: t('responses.reservation_success_desc'),
          src: SucessIcon
        }
      })
      clearBasket()
    }).catch(err => {
      navigate(`/${rid}/${tid}/notify`, {
        state: {
          title: t('responses.error_ocurred'),
          desc: t('responses.error_ocurred_desc'),
          src: NotFoundIcon
        }
      })
      clearBasket()
    })

  }


  const validationForm = () => {
    const errors = {}

    if (reservation.name.length == 0) {
      errors.name = 'Boş ola bilməz'
    }

    if (reservation.surname.length == 0) {
      errors.surname = 'Boş ola bilməz'
    }

    if (reservation.phone.length == 0) {
      errors.phone = 'Boş ola bilməz'
    }

    if (!reservation.table) {
      errors.table = 'Boş ola bilməz'
    }

    if (!reservation.guests || String(reservation.guests).replace(/[^0-9]/g, '').replace(/^0+/, '') <= 0) {
      errors.guests = 'Boş ola bilməz'
    }

    if (!reservation.date) {
      errors.date = 'Boş ola bilməz'
    }

    setReservation({ ...reservation, errors })

    if (Object.keys(errors).length == 0) {
      submitHandler()
    }


  }


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_HOST}/restaurants/${rid}/tables`)
      .then(res => {
        setReservation({ ...reservation, tables: res.data.data })
      })
      .catch(err => {
        navigate(`/${rid}/${tid}/notify`, {
          state: {
            title: t('responses.error_ocurred'),
            desc: t('responses.error_ocurred_desc'),
            src: NotFoundIcon
          }
        })
      })
  }, [])

  return (
    <div className="container">
      <div className="topnav">
        <BackArrow target={`/${rid}/${tid}`} />
        <h1 className='title' style={{ flex: '1' }}>Rezerv Formu</h1>
      </div>
      <div className="form-side">
        <div className="flex gap-2">
          <div className="form-group">
            <TextField id="outlined-basic" required label="Ad" variant="outlined" size='medium' name='name'
              error={reservation.errors.name ? true : false} helperText={reservation.errors.name ? reservation.errors.name : false}
              value={reservation.name} onChange={(e) => inputHandler(e)} inputProps={{ style: { height: "unset", background: "white" }, }} />
          </div>
          <div className="form-group">
            <TextField id="outlined-basic" required
              error={reservation.errors.surname ? true : false} helperText={reservation.errors.surname ? reservation.errors.surname : false}
              label="Soyad" variant="outlined" size='medium' name='surname' value={reservation.surname}
              onChange={(e) => inputHandler(e)} inputProps={{ style: { height: "unset", background: "white" } }} />
          </div>
        </div>
        <div className="form-group">
          <TextField id="outlined-basic" required
            error={reservation.errors.phone ? true : false} helperText={reservation.errors.phone ? reservation.errors.phone : false}
            inputProps={{ style: { height: "unset", background: "white" }, }} label="Əlaqə Telefonu"
            type="number" fullWidth variant="outlined" value={reservation.phone} size='medium' name='phone' onChange={(e) => inputHandler(e)} />
        </div>
        <div className="form-group">
          <FormControl fullWidth>
            <Select name="table" defaultValue="none"
              error={reservation.errors.table ? true : false} onChange={(e) => inputHandler(e)}>
              <MenuItem value="none" >Masa Seçin</MenuItem>
              {
                reservation.tables.map((table, i) => {
                  return <MenuItem key={i} value={table.id}>{table.title} {table.sub_title ? '/ ' + table.sub_title : ''}</MenuItem>
                })
              }
            </Select>
          </FormControl>
        </div>
        <div className="form-group">
          <TextField id="outlined-basic" required label="Qonaq sayı" type="number" fullWidth variant="outlined" size='medium'
            error={reservation.errors.guests ? true : false} helperText={reservation.errors.guests ? reservation.errors.guests : false}
            name='guests' value={reservation.guests} onChange={(e) => inputHandler(e)} inputProps={{ style: { height: "unset", background: "white" }, }} />
        </div>
        <div className="form-group">
          <label htmlFor="" className='text-muted'>Tarix</label>
          <TextField id="outlined-basic" required type="datetime-local"  fullWidth variant="outlined" size='medium'
            error={reservation.errors.date ? true : false} helperText={reservation.errors.guests ? reservation.errors.date : false}
            name='date' value={reservation.date} onChange={(e) => inputHandler(e)} inputProps={{ style: { height: "unset", background: "white" }, }} />
        </div>
        <div className="form-group">
          <TextField id="outlined-basic" label="Qeyd" fullWidth name='note' value={reservation.note} onChange={(e) => inputHandler(e)} variant="outlined" size='medium' inputProps={{ style: { height: "unset", background: "white" }, }} />
        </div>
        <div className="actions">
          <button className='add-btn' onClick={() => validationForm()}>Rezerv et</button>
        </div>
      </div>
    </div>
  )
}
