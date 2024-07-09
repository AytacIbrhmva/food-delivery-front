// eslint-disable-next-line
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './assets/css/style.css';
import { createContext } from 'react';
import HomePage from './pages/Home/Index';
import FoodSingle from './pages/Product/Single';
import List from './pages/Product/List';
import Basket from './pages/Basket/Index';
import Notify from './pages/Notify/Index';
import NotFound from './pages/NotFound/Index';
import Search from './pages/Search/Index';
import { SnackbarProvider } from 'notistack';
import BasketContextProvider from './contexts/BasketContext';
import { useTranslation } from 'react-i18next';
import Navbar from './layouts/Navbar';
import SearchModalProvider from './contexts/SearchModalContext';
import Reservation from './pages/Reservation/Index';
import LocaleProvider from './contexts/LocaleContext';

export const FoodContext = createContext();

function App() {
  const { t } = useTranslation();
  return (
    <>
    <LocaleProvider>
      <SnackbarProvider maxSnack={3} autoHideDuration={1000}>
      <BasketContextProvider>
        <SearchModalProvider>
          <Navbar>
            <Routes>
              <Route exact path='/:id/:table/basket' element={<Basket />} />
              <Route exact path='/:id/:table/reservation' element={<Reservation />} />
              <Route exact path='/:id/:table/notify' element={<Notify />} />
              <Route exact path='/:id/:table/search/:title' element={<Search />} />
              <Route exact path='/:id/:table/popular' element={<List title={t('home.popular')} static='popular' />} />
              <Route exact path='/:id/:table/topweek' element={<List title={t('home.weekly_foods')} static='topweek' />} />
              <Route exact path='/:id/:table' element={<HomePage />} />
              <Route exact path='/:id/:table/:menu' element={<List />} />
              <Route exact path='/:id/:table/:menu/:fid' element={<FoodSingle />} />
            </Routes>
          </Navbar>
        </SearchModalProvider>
      </BasketContextProvider>
    </SnackbarProvider>
    </LocaleProvider>
    <Routes>
        <Route path='/' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
