import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import i18n from "../Language";
import DataNotFoundIcon from "../assets/img/not-found-page.png";

export const LocaleContext = React.createContext();

export default function LocaleProvider(props) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [locale, setLocale] = useState({
    region: null,
    currency: null,
    restaurant: {},
    service_tax: 0,
    isLoading: true,
  });

  const [getQr, setQr] = useState({
    qrid: null,
    reservation: null,
    ecom: 0,
    isLoading: true,
  });

  const url = window.location.pathname;
  const parsed = url.split("/");

  useEffect(() => {
    if (locale.isLoading) {
      // axios.get(`${process.env.REACT_APP_API_HOST}/restaurants/${parsed[1]}`)
      axios
        .get(`${process.env.REACT_APP_API_HOST}/restaurants/66845731db37044e7f4b79e2`)
        .then((res) => {
          console.log(res);
          setLocale({
            ...locale,
            restaurant: res.data,
            isLoading: false,
            // region: res.data.region,
            // currency: res.data.currency,
            // service_tax: res.data.service_tax,
          });
          i18n.changeLanguage(res.data.region);
        })
        .catch((err) => {
          setLocale({
            ...locale,
            isLoading: false,
          });
          // navigate(`/`)
        });

      // setLocale({
      //   ...locale,
      //   restaurant: {
      //     region: "a",
      //     currency: "azn",
      //     service_tax: 1,
      //     sliders: [
      //       {
      //         url: "",
      //         src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2tYv2KwByu19FVKJiBJP9y6KpVVU_gTvy4Q&s",
      //         title: "test 1",
      //         content: "lorem",
      //       },
      //       {
      //         url: "",
      //         src: "https://panoramicrestaurant.com/wp-content/uploads/2023/07/2TH08812-1-scaled.jpg",
      //         title: "test 2",
      //         content: "lorem",
      //       },
      //       {
      //         url: "",
      //         src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Tom%27s_Restaurant%2C_NYC.jpg/640px-Tom%27s_Restaurant%2C_NYC.jpg",
      //         title: "test 3",
      //         content: "lorem",
      //       },
      //     ],
      //     popular_foods: [
      //       {
      //         id: 1,
      //         connect: 1,
      //         thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOzEpfonyQYc6Xq3y8tFy8RHXftKgqfQW5RQ&s",
      //         title: "food title",
      //         category: "category",
      //         models: [
      //           {
      //             price: 20,
      //             discount: {
      //               price: 10,
      //             },
      //           },
      //         ],
      //       },
      //       {
      //           id: 2,
      //           connect: 1,
      //           thumb: "https://img.pikbest.com/backgrounds/20210716/youtube-video-thumbnail-for-food-and-restaurant-business_6039890.jpg!bw700",
      //           title: "food title",
      //           category: "category",
      //           models: [
      //             {
      //               price: 20,
      //               discount: {
      //                 price: 10,
      //               },
      //             },
      //           ],
      //         },
      //     ],
      //     top_of_week_foods: [
      //       {
      //         id: 1,
      //         connect: 1,
      //         thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOzEpfonyQYc6Xq3y8tFy8RHXftKgqfQW5RQ&s",
      //         title: "food title",
      //         category: "category",
      //         models: [
      //           {
      //             price: 20,
      //             discount: {
      //               price: 10,
      //             },
      //           },
      //         ],
      //       },
      //       {
      //           id: 2,
      //           connect: 1,
      //           thumb: "https://img.pikbest.com/backgrounds/20210716/youtube-video-thumbnail-for-food-and-restaurant-business_6039890.jpg!bw700",
      //           title: "food title",
      //           category: "category",
      //           models: [
      //             {
      //               price: 20,
      //               discount: {
      //                 price: 10,
      //               },
      //             },
      //           ],
      //         },
      //     ],
      //   },
      //   isLoading: false,
      // });
    }
  }, [locale]);

  useEffect(() => {
    // if (getQr.isLoading) {
    //   axios
    //     .get(`${process.env.REACT_APP_API_HOST}/restaurants/${parsed[1]}/qrcodes/${parsed[2]}`)
    //     .then((res) => {
    //       setQr({ ...getQr, qrid: res.data.data.uid, reservation: res.data.data.reservation, ecom: res.data.data.ecom, isLoading: false });
    //     })
    //     .catch((err) => {
    //       setQr({
    //         ...getQr,
    //         isLoading: false,
    //       });
    //     });
    // }
  }, [getQr]);

  return (
    <LocaleContext.Provider value={{ locale, getQr, setQr, setLocale }}>
      {locale.isLoading ? (
        <div className="loader-side">
          <div className="mloader">
            <span className="loader"></span>
          </div>
        </div>
      ) : (
        props.children
      )}
    </LocaleContext.Provider>
  );
}
