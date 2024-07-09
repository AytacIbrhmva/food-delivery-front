import React from 'react'
import { Link } from 'react-router-dom';

export default function Single({ slider }) {
    return (
            <Link to={slider.url}>
        <div className="slider">
                <div className="cover">
                    <div className="overlay"></div>
                    <img src={`${slider.src}`} />
                </div>
                <div className="content">
                    <h2 className='title'>{slider.title}</h2>
                    <p className='description'>{slider.content}</p>
                </div>
        </div>
            </Link>
    )
}
