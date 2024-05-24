import React from 'react'
import './App.css'
export default function SceneCard({data}) {


    return (
        <div className='sceneCard' >
            <h4>{data && data.title}</h4>
            
            <div
                style={{
                    backgroundColor: '#d0d0d0',
                    height: 200,
                    width: 350,
                    borderRadius: 5,
                    alignContent: 'center'

                }}
            >
                CONTENT

            </div>

            <div style={
                {
                    width: 400,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignSelf: 'flex-end'
                    
                }
            }
            >

                <div className='optionButton'> A </div>
                <div className='optionButton'> B </div>

            </div>

        </div>
    )
}

