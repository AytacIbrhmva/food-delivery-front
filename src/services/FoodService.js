import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function FoodService() {
    return (
        <div>FoodService</div>
    )
}

export const getFoodsService = (id, table) => {

    const [getData, setData] = useState({ data: {}, error: {},isLoading:true });

    // useEffect(() => {
    //     const fetchData = async () => {
    //         await axios.get(`${process.env.REACT_APP_API_HOST}/restaurants/${id}/menu/${table}`)
    //             .then(res => setData({
    //                 ...getData,
    //                 data: res,
    //                 isLoading:false
    //             }))
    //             .catch(err => {
    //                 setData({
    //                     ...getData,
    //                     error: err.response.data.message,
    //                     isLoading:false
    //                 })
    //             })
    //     };

    //     fetchData();
    // },[])

    return getData


    // const navigate = useNavigate();


    //   let res=await axios.get(`${process.env.REACT_APP_API_HOST}/restaurants/${id}/menu/${table}`).then(res =>res)
    //     // .catch(err => err.response.data.message)
    // console.log(res);
    //     const data= await res.json();
    //     return JSON.parse(data);


}
