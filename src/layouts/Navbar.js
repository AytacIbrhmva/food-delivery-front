import React, { useContext, useEffect, useState } from "react";
import { SearchModalContext } from "../contexts/SearchModalContext";
import { Link } from "react-router-dom";
import { LocaleContext } from "../contexts/LocaleContext";
import axios from "axios";

export default function Navbar(props) {
  const searchContext = useContext(SearchModalContext);
  const { locale, getQr } = useContext(LocaleContext);
  const [scroll, setScroll] = useState({ display: true, offset: 0 });
  const rid = locale.restaurant.uid;
  const tid = getQr.qrid;

  useEffect(() => {
    const onScroll = () => {
      if (scroll.offset < window.pageYOffset) {
        setScroll({ ...scroll, offset: window.pageYOffset, display: false });
      } else {
        setScroll({ ...scroll, display: true, offset: window.pageYOffset });
      }
    };

    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scroll]);

  const createRest = async () => {
    const res = await axios
      .post("http://localhost:5002/api/restaurants", {
        region: "random",
        currency: "azn",
        service_tax: 10,
        sliders: [
          {
            url: "a",
            src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Tom%27s_Restaurant%2C_NYC.jpg/640px-Tom%27s_Restaurant%2C_NYC.jpg",
            title: "test 3",
            content: "lorem",
          },
        ],
        popular_foods: [
          {
            id: 1,
            connect: 1,
            thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOzEpfonyQYc6Xq3y8tFy8RHXftKgqfQW5RQ&s",
            title: "food title",
            category: "category",
            models: [
              {
                price: 20,
                discount: {
                  price: 10,
                },
              },
            ],
          },
        ],
        top_of_week_foods: [
          {
            id: 1,
            connect: 1,
            thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOzEpfonyQYc6Xq3y8tFy8RHXftKgqfQW5RQ&s",
            title: "food title",
            category: "category",
            models: [
              {
                price: 20,
                discount: {
                  price: 10,
                },
              },
            ],
          },
        ],
      })
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteRes = async () => {
    const res = await axios
      .delete("http://localhost:5002/api/restaurants/66845730db37044e7f4b79db")
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getRest = async () => {
    const res = await axios
      .get("http://localhost:5002/api/restaurants")
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getRestOne = async () => {
    const res = await axios
      .get("http://localhost:5002/api/restaurants/66845731db37044e7f4b79e2")
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getGroups = async () => {
    const res = await axios
      .get("http://localhost:5002/api/groups/66845731db37044e7f4b79e2")
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const createGroups = async () => {
    const res = await axios
      .post("http://localhost:5002/api/groups", {
        title: "Tacos",
        thumb: "https://media.istockphoto.com/id/1430849921/photo/order-of-tacos-closeup.jpg?s=1024x1024&w=is&k=20&c=q-8fdSVj_C8Ek2Y8mBS2n2LM03BWdpnY_pXcJRuA7w0=",
        rid: "66845731db37044e7f4b79e2"
      })
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <button onClick={() => createRest()}>create restaurant</button>
      <button onClick={() => getRest()}>get restaurant</button>
      <button onClick={() => deleteRes()}>delete restaurant</button>
      <button onClick={() => getRestOne()}>get one restaurant</button>


      <button onClick={() => createGroups()}>create groups</button>
      <button onClick={() => getGroups()}>get groups</button>

      {locale.restaurant.id ? (
        <div className={`navbar ${scroll.display ? "fadeIn" : "fadeOut"}`}>
          <div className="item">
            <Link to="/" onClick={(e) => searchContext.handleClickOpen(e)}>
              <i className="fa-light fa-magnifying-glass disabled"></i>
            </Link>
          </div>
          <div className="item">
            <Link to={`/${rid}/${tid}`}>
              <i className="fa-light fa-house-blank"></i>
            </Link>
          </div>
          {getQr.reservation == true ? (
            <div className="item">
              <Link to={`/${rid}/${tid}/reservation`}>
                <i className="fa-light fa-calendar-days"></i>
              </Link>
            </div>
          ) : null}
          <div className="item">
            <Link to={`/${rid}/${tid}/basket`}>
              <i className="fa-light fa-bag-shopping" style={{ fontSize: "24px" }}></i>
            </Link>
          </div>
        </div>
      ) : null}
      {props.children}
    </>
  );
}
