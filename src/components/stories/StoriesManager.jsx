import React, { useEffect, useState } from 'react'
import './storiesManagerStyles.css';
import { Link } from 'react-router-dom';
import StoryCard from './StoryCard.jsx';
import AxiosClient from '../../config/http-client/axios-client.js';

export default function StoriesManager() {
    const [stories, setStories] = useState([]);
    // La constante user_id es temporal, user_id se
    // obtendra de la sesion del usuario o por medio de props
    const user_id = 1;
    
    useEffect(() => {
        async function fetchData() {
            try {

                //Get story by story_id ->  http://localhost:3000/story/4
                //Get stories by user_id ->  http://localhost:3000/stories/1 

                const response = await AxiosClient({
                    url: `/stories/${user_id}`,
                    method: 'GET',
                });
                setStories(response);
                console.log(response);
            } catch (error) {
                console.error('There was an error!', error);
            }
        }

        fetchData();

    }, []);


    return (
        <div className='stories-container' >

            {stories && stories.map((story, index) => (
                <Link key={index} to={`story/${story.story_id}`}>
                    <StoryCard data={story} />
                </Link>
            ))}

        </div>
    )
}
