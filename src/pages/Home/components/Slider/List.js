import React, { useEffect } from 'react'
import SliderSingle from './Single'
import { Pagination, Navigation, Scrollbar, A11y, FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/grid"
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useState } from 'react';
import ListSkeleton from './ListSkeleton';

export default function List(props) {

    const [getSliders, setSliders] = useState({ sliders: [], isLoading: true });

    useEffect(() => {
        props.sliders.length ?
            setSliders({ ...getSliders, sliders: props.sliders, isLoading: false })
            : setSliders({ ...getSliders, sliders: props.sliders, isLoading: true })
    }, [props.sliders])

    return (
        <div className="sliders">
            <Swiper
                slidesPerGroupSkip={2}
                modules={[Navigation, Scrollbar]}
                loop={true}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                    },
                }}
                className="mySwiper"
            >
                {
                    getSliders.isLoading ? <ListSkeleton />
                        : getSliders.sliders.map((slider,i) => {
                            return (
                                <SwiperSlide key={i}>
                                    <SliderSingle slider={slider} />
                                </SwiperSlide>
                            )
                        })
                }

            </Swiper>
        </div>
    )
}
