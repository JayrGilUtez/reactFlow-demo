import React, {useEffect} from 'react'
import '../modals/modalStyles.css';
import { IoClose } from "react-icons/io5";
import { PiCards } from "react-icons/pi";
import { CiImageOn } from "react-icons/ci";
import { GoVideo } from "react-icons/go";
import AxiosClient from '../../config/http-client/axios-client.js';
import { useParams } from 'react-router-dom';



export default function Modal({ onSubmit, onClose }) {
    let { story_id } = useParams();
        async function addScene() {
            try {
                const response = await AxiosClient({
                    url: `/scenes/${story_id}`,
                    method: 'POST'
                });
                console.log(response);
            } catch (error) {
                console.error('Error trying to add new scene ', error);
            }
        }

    return (
        <div className='modal-container' >
            <div className='modal' >
                <div className="modal-header">
                    <p className='close' onClick={() => onClose()} ><IoClose size={24} style={{ marginRight: 15 }} /></p>
                </div>

                <div className="modal-options-container">

                    <div className="column-options-container">
                        <div className="option-card" onClick={addScene}>
                            <div className='scene-option-icon' > 
                                <PiCards size={24}/>
                            </div>
                            <div style={{fontSize: 18}} >Escena</div>
                        </div>
                    </div>

                    <div className="column-options-container">
                        <div className="option-card">
                            <div className='image-option-icon' > 
                                <CiImageOn  size={24}/>
                            </div>
                            <div style={{fontSize: 18}} >Imagen</div>
                        </div>
                    </div>

                    <div className="column-options-container">
                        <div className="option-card">
                            <div className='video-option-icon' > 
                                <GoVideo size={24}/>
                            </div>
                            <div style={{fontSize: 18}} >Video</div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
