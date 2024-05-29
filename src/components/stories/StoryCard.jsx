import React from 'react'
import './storiesManagerStyles.css'
export default function StoryCard({data}) {

    return (
        <div className='story-card' >
            <div className='color-label' ></div>
            <div className='story-card-data-container' >
                {data && data.title}
            </div>
            
        </div>
    )
}
