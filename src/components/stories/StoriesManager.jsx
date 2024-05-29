import React from 'react'
import './storiesManagerStyles.css';
import { Link } from 'react-router-dom';
import StoryCard from './StoryCard.jsx';

export default function StoriesManager() {

    return (
        <div className='stories-container' >
            <Link to={'/stories'}>
                <StoryCard data={{ title: 'Titulo' }} />

            </Link>

            <StoryCard />
            <StoryCard />
            <StoryCard />
            <StoryCard />
            <StoryCard />
            <StoryCard />
            <StoryCard />

        </div>
    )
}
