import React from 'react'; import { Link, useParams } from 'react-router-dom';

export default function Single({ group }) {
  
  const {id,table}=useParams();

  return (
    <Link to={`/${id}/${table}/${group.id}`}>
      <div className='menu-slider' style={{ backgroundImage:`url(${group.thumb})` }}>
        <p>{group.title}</p>
      </div>
    </Link>
  )
}
