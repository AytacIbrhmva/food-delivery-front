import React, { useContext, useEffect, useState } from 'react'
import { useSnackbar } from 'notistack';
import { t } from 'i18next';
import { LocaleContext } from './LocaleContext';

export const BasketContext = React.createContext();

function BasketContextProvider(props) {
    const { enqueueSnackbar } = useSnackbar();

    const [getBasket, setBasket] = useState({
        foods: [],
        service_tax: 0,
        isLoading: true
    })

 
    const addBasket = (food) => {
        const { id, model, quantity } = food;
        let check = getBasket.foods.find(item => Number(item.id) === id && Number(item.model) === Number(model) ? item : null)

        if (check) {
            let upd = getBasket.foods.map(item => {
                if (Number(item.id) === id && Number(item.model) === Number(model)) {
                    item.quantity += quantity
                    return item
                } else {
                    return item;
                }
            })

            setBasket(prevState => ({ ...prevState, foods: upd }))
        } else {
            setBasket(prevState => ({
                ...prevState, foods: [
                    ...getBasket.foods,
                    { id, model, quantity }
                ]
            }))
        }

        enqueueSnackbar(t('responses.added_basket'), { variant: 'success' });
    }

    const updateBasket = (food) => {
        const { id, quantity } = food;
        const newFoods = getBasket.foods.map(f => {
            if (Number(f.id) === Number(id)) {
                f.quantity = quantity
            }
            return f
        })
        setBasket({ ...getBasket, foods: newFoods })
    }

    

    const clearBasket = () => setBasket({ ...getBasket, foods: [] })

    const removeItem = (id, model) => {
        let items=getBasket.foods.filter(food => {
            if(food.id !== id && food.model !== model){
                return food
            }
        })
       setBasket({...getBasket, foods:items})
    }


    useEffect(() => {
        if (!localStorage.getItem('items')) {
            localStorage.setItem('items', JSON.stringify(getBasket.foods));
        }
        setBasket({...getBasket,foods: JSON.parse(localStorage.getItem('items')),isLoading: false})
    }, [])

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(getBasket.foods));
    }, [addBasket,  clearBasket])

    return (
        <BasketContext.Provider value={{ getBasket, addBasket, updateBasket, clearBasket, removeItem }}>
            {props.children}
        </BasketContext.Provider>
    )
}


export default BasketContextProvider
