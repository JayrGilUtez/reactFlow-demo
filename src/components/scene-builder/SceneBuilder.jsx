import React from 'react'
import './SceneBuilderStyles.css';
import image1 from '../../assets/lofi_wallpaper_by_nethervision.png';
export default function SceneBuilder() {
    return (
        <div className='mainContainer' >

            <div className='workingArea'>
                <div className='toolsBar' >
                    <div className='addContentButton' > + Agregar contenido </div>
                </div>

                <div className='mainContent' >
                    <div className='scene' >
                        <div className='contentWrapper' >

                            <div className='title' > Título... </div>
                            <div className='description' > Descripción... </div>

                            <div className='content' > <img src={image1} alt="" srcset="" /> </div>
                            <div style={{ textAlign: 'justify', maxWidth: 600 }}>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores iure eaque labore ad eveniet ex sed animi blanditiis ipsam, nemo adipisci reprehenderit excepturi et quo doloribus quae accusantium non beatae?
                            </div>

                            <div className='question' > Pregunta... </div>
                            <div className='optionsContainer' >
                            <div className='optionButton' > A </div>
                            <div className='optionButton' > B </div>
                            </div>
                        

                        </div>


                    </div>
                </div>

            </div>
        </div>

    )
}
