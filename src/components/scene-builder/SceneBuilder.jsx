import React, { useEffect, useState } from 'react'
import './SceneBuilderStyles.css';
import image1 from '../../assets/lofi_wallpaper_by_nethervision.png';
import { CiPlay1 } from "react-icons/ci";
import { RxDividerVertical } from "react-icons/rx";
import { BiLandscape } from "react-icons/bi";
import { useParams } from 'react-router-dom';
import AxiosClient from '../../config/http-client/axios-client.js';
import StoryFlow from '../story-flow/StoryFlow.jsx';
import { GoWorkflow } from "react-icons/go";
import { HiOutlinePlusSm, HiOutlineCollection } from "react-icons/hi";
import Modal from '../modals/Modal.jsx';


export default function SceneBuilder() {

    let { story_id } = useParams();
    const [scenes, setScenes] = useState([]);
    const [selectedScene, setSelectedScene] = useState(null);
    const [storyFlow, setStoryFlow] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    // Esta es la request que trae todos los datos de la historia en cuestion
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await AxiosClient({
                    url: `scenes/${story_id}`,
                    method: 'GET'
                });
                setScenes(response);
                setSelectedScene(response[0]); // aqui inicializamos la escena seleccionada
            } catch (error) {
                console.error('Error trying to get the scenes from story with id: ', story_id);
            }
        };

        fetchData();

    }, []);

    const onSceneClick = (scene) => {
        setSelectedScene(scene);
        //console.log('scene_id: ', scene.scene_id, ', title: ', scene.title);
    }

    const handleButtonClick = () => {
        setOpenModal(false);
    }

    return (
        <div className='mainContainer' >

            <div className='sidebar' >

                {scenes && scenes.map((scene) => (
                    <div className={`sidebarScene ${selectedScene.scene_id === scene.scene_id ? 'selected' : ''}`} key={scene.scene_id} onClick={() => onSceneClick(scene)}>
                        <div className='sidebarSceneIcon'>
                            <BiLandscape />
                        </div>
                        <div style={{ marginLeft: 10 }} > {scenes && scene.title} </div>
                    </div>
                ))}

            </div>

            <div className='workingArea'>

                <div className='toolsBar' >
                    <div className='addContentButton' onClick={() => setOpenModal(true)} >
                        <HiOutlinePlusSm size={20} />
                        <div style={{ marginLeft: 10 }}>Agregar contenido</div>
                    </div>
                    <RxDividerVertical size={32} style={{ width: '30px', color: '#d9d9d8' }} />

                    <div className='scenesButton' onClick={() => setStoryFlow(false)} >
                        <div style={{ transform: "rotate(-90deg)" }}>
                            <HiOutlineCollection size={20} />
                        </div>
                        <div style={{ marginLeft: 10 }}> Escenas </div>
                    </div>
                    <RxDividerVertical size={32} style={{ width: '30px', color: '#d9d9d8' }} />

                    <div className='flowButton' onClick={() => setStoryFlow(true)}>
                        <GoWorkflow size={20} />
                        <div style={{ marginLeft: 10 }}>Flujo</div>
                    </div>
                    <RxDividerVertical size={32} style={{ width: '30px', color: '#d9d9d8' }} />

                    <CiPlay1 size={24} />
                </div>

                {openModal && (<Modal onSubmit={handleButtonClick} onClose={handleButtonClick} />)}

                <div className='mainContent' >

                    {storyFlow ?
                        <>
                            <StoryFlow />
                            {openModal && (<Modal onSubmit={handleButtonClick} onClose={handleButtonClick} />)}
                        </> :

                        <>
                            {selectedScene &&
                                <div className='scene' >
                                    <div className='contentWrapper' >

                                        <div className='title' > {selectedScene.title} </div>
                                        <div className='description' > {selectedScene.text_} </div>

                                        <div className='content' > <img src={image1} alt={selectedScene.image} /> </div>
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
                            }
                        </>
                    }
                </div>
            </div>
        </div>
    )
}
