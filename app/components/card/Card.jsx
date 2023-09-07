import React from 'react'
import ReactCardFlip from 'react-card-flip';
import './Card.css'
import { Box, Typography } from '@mui/material';

const Card = ({ id, image, isFlipped, matched, handleOnFlip }) => {

    const flipSpeed = 0.2

    return (
        <ReactCardFlip
            id={id}
            isFlipped={isFlipped}
            matched={matched}
            flipDirection="horizontal"
            flipSpeedBackToFront={flipSpeed}
            flipSpeedFrontToBack={flipSpeed}
            infinite={true}
            className='react-card'
        >
            <div className='card' onClick={() => handleOnFlip(id)}>
                <div className="card-image-container">
                    <Typography variant='h5'>
                        {id}
                    </Typography>
                </div>
            </div>
            <div className={matched ? "card matched" : "card"} onClick={() => handleOnFlip(id)}>
                <div className='card-image-container'>
                    <img src={image} alt="" />
                </div>
                
            </div>
        </ReactCardFlip>
    );
}

export default Card;
