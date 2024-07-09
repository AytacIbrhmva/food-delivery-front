import React, { useState, useEffect } from "react";
import axios from "axios";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Scrollbar, A11y, FreeMode } from "swiper";
import { useParams } from "react-router-dom";
import MenuSingle from "./Single";
import { Skeleton } from "@mui/material";

export default function List() {
  const [groups, setGroups] = useState({
    errors: null,
    groups: [],
    isLoading: true,
  });

  const { id, table } = useParams();
  useEffect(() => {
    // axios
    //   .get(`${process.env.REACT_APP_API_HOST}/restaurants/${id}/groups`)
    //   .then((res) => setGroups({ ...groups, groups: res.data.data, isLoading: false }))
    //   .catch((err) => setGroups({ ...groups, errors: err.response.data.message }));

    setGroups({
      ...groups,
      groups: [{ id: 1, thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsfR6QS0Jda7nwIK4qy1bSXSRVzJmQxmt0LA&s", title: "Res fast food" },
        { id: 2, thumb: "https://cdn.georgeinstitute.org/sites/default/files/styles/width1920_fallback/public/2020-10/world-food-day-2020.png", title: "Fruit res" }
      ],
      isLoading: false,
    });
  }, []);

  return (
    <div className="menu-sliders">
      <Swiper
        freeMode={true}
        slidesPerGroupSkip={2}
        modules={[Navigation, Pagination, Scrollbar, FreeMode]}
        loop={true}
        className="mySwiper"
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 15,
          },
        }}
      >
        {groups.isLoading ? (
          <SwiperSlide>
            <Skeleton variant="rectangular" width={175} height={52} style={{ borderRadius: "6px" }} />
          </SwiperSlide>
        ) : (
          groups.groups.map((group) => {
            return (
              <SwiperSlide key={group.id}>
                <MenuSingle group={group} />
              </SwiperSlide>
            );
          })
        )}
      </Swiper>
    </div>
  );
}
