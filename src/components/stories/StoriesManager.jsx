import React from 'react'
import './storiesManagerStyles.css';

import StoryCard from './StoryCard.jsx';

export default function StoriesManager() {

    return (
        <div className='stories-container' >
            <StoryCard data={{title: 'Titulo'}}/> 
            <StoryCard/> 
            <StoryCard/> 
            <StoryCard/> 
            <StoryCard/> 
            <StoryCard/> 
            <StoryCard/> 
            <StoryCard/> 
            
        </div>
    )
}
