import React from 'react'
import Item from './Item'

export default function ListItem(props) {
    return (
        <div className='foods'>
            {props.foods.map((food, i) => <Item key={i} food={food} />)}
        </div>
    )
}
