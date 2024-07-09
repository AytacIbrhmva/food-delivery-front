import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuList from "./components/Menu/List";
import GroupList from "./components/Group/List";
import Header from "./components/Header/Header";
import { useTranslation } from "react-i18next";
import { LocaleContext } from "../../contexts/LocaleContext";
import SliderList from "./components/Slider/List";

export default function Index() {
  const { locale } = useContext(LocaleContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="container">
        <Header />
        <MenuList />
        {/* {locale.restaurant.sliders.length ? <SliderList sliders={locale.restaurant.sliders} /> : null} */}
        {locale.restaurant.popular_foods && locale.restaurant.popular_foods.length ? (
          <GroupList title={t("home.popular")} foods={locale.restaurant.popular_foods} target="popular" />
        ) : null}

        {
        locale.restaurant.top_of_week_foods && locale.restaurant.top_of_week_foods.length ? <GroupList title={t('home.weekly_foods')} foods={locale.restaurant.top_of_week_foods} target="topweek" /> :null
      }
      </div>
    </div>
  );
}
