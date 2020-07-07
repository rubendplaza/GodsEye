import React from 'react';
import FaceBox from '../FaceBox/FaceBox';

const FaceRecognition = ({ imageUrl, faceBoxes, getFaceBox }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' alt='' src={imageUrl} width='500px' height='auto'></img>
                {
                    faceBoxes.map((box, i) => {
                        return (
                            <FaceBox 
                                key={i} 
                                box={getFaceBox(box.region_info.bounding_box)}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
}

export default FaceRecognition;