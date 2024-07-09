import React from 'react';
import {AiOutlineArrowLeft} from 'react-icons/ai'
import { Link, useNavigate, useParams } from 'react-router-dom';

const BackArrow = (props) => {

  const {id, table} = useParams();
  const navigate= useNavigate();
  const {target, many}=props

  return (
    <Link to={target ? target : many ?? -1} className='back-link'>
        <AiOutlineArrowLeft className='icon' />
    </Link>
  )
}

export default BackArrow