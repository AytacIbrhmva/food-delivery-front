import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Scrollbar, A11y, FreeMode } from "swiper";
import FoodMedium from '../../../../components/Food/Medium';
import MediumSkeleton from '../../../../components/Food/MediumSkeleton';
import { useTranslation } from 'react-i18next';

export default function List(props) {

    let { foods, title, target } = props;
    const [getFood, setFood] = useState({ foods: [], isLoading: true })
    const { id, table } = useParams();
    const {t}=useTranslation();

    useEffect(() => {
        if (foods) {
            setFood({ foods, isLoading: false })
        }
    }, [foods])

    return (
        <div className='group-list'>
            <div className='header'>
                <h2 className='title'>{title}</h2>
                <Link to={`/${id}/${table}/${target}`}>{t('misc.see_more').toLocaleLowerCase()}</Link>
            </div>

            <div className='group-body'>
                <Swiper
                    freeMode={true}
                    slidesPerGroupSkip={2}
                    modules={[Navigation, Pagination, Scrollbar, FreeMode]}
                    loop={true}
                    breakpoints={{
                        0: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        270:{
                            slidesPerView: 1,
                            spaceBetween: 25
                        },
                        320:{
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        400:{
                            slidesPerView: 2,
                            spaceBetween: 20
                        },

                        600: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        950: {
                            slidesPerView: 5,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 8,
                            spaceBetween: 30,
                        }
                    }}
                    className="mySwiper"
                >
                    {
                        getFood.isLoading ?
                            <SwiperSlide><MediumSkeleton item={1} /></SwiperSlide>
                            : getFood.foods.map((food, i) =>
                                <SwiperSlide key={i}>
                                    <FoodMedium food={food} />
                                </SwiperSlide>
                            )
                    }
                </Swiper>
            </div>
        </div>
    )
}
