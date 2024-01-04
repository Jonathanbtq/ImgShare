import { useEffect, useState } from "react"
import pexelsClient from "../services/pexelApi"

/**
 * Div contenant les photos fourni suite a l'appel API
 * 
 * @param {*} param0 
 * @returns 
 */
export default function ImgFeed({ updatePhotos }){
    const [photos, setPhotos] = useState([])
    const [ContentVisible, setContentVisible] = useState(false)
    const [imageSelected, setSelectedImg] = useState('')
    const [model, setModel] = useState(false)
    const [typeElementSelected, setType] = useState('')

    const selectedImg = (imgSrc, type) => {
        setType(type)
        setSelectedImg(imgSrc);
        setModel(true);
    };

    const handleCloseImg = () => {
        setType('')
        setModel(false);
        setSelectedImg('');
    };

    const handleMouseOver = (event) => {
        const card = event.currentTarget
        let overlayContent  = card.querySelector('.overlay_content')
        if(overlayContent){
            setContentVisible(true)
            overlayContent.style.display = 'flex'
        }
    }

    const handleMouseOut = (event) => {
        const card = event.currentTarget
        let overlayContent = card.querySelector('.overlay_content')
        if(overlayContent){
            setContentVisible(false)
            overlayContent.style.display = 'none'
        }
    }

    useEffect(() => {
        const query = 'Nature'
        
        pexelsClient.photos.search({query, per_page: 30})
            .then((response) => {
                setPhotos(response.photos)
        })
        .catch((error) => {
            console.error("Erreur:", error)
        })
    }, [])

    return(
        <>
            <div className="imgf_wth">
                <div className={model? 'imgf_big' : 'imgf_big_hidden'} onClick={handleCloseImg}>
                    {typeElementSelected === 'image' ? (
                        <>
                            <img src={imageSelected} alt={imageSelected} />
                            <p onClick={handleCloseImg}>X</p>
                        </>
                    ) : (
                        <>
                            <video width="100%" height="100%" controls={false} autoPlay muted>
                                <source src={imageSelected} type="video/mp4" />
                            </video>
                            <p onClick={handleCloseImg}>X</p>
                        </>
                    )}
                    
                </div>
                <div className="imgf_div">
                    {(updatePhotos && Array.isArray(updatePhotos) && updatePhotos.length > 0) ?
                        updatePhotos.map((photo, index) => (
                            (photo.video_files != null) ?
                                <div
                                    className="img_feed_card"
                                    key={index}
                                    onMouseOver={handleMouseOver}
                                    onMouseOut={handleMouseOut}
                                >
                                    {photo.video_files != null ? (
                                        <div className="image-container">
                                            <video width="100%" height="100%" controls={false} autoPlay muted>
                                                <source src={photo.video_files[0].link} type="video/mp4" />
                                            </video>
                                        </div>
                                    ) : (
                                        <div className="image-container">
                                            <img src={photo.src.medium} alt={photo.alt} />
                                        </div>
                                    )}
                                    <div className="overlay_content">
                                        <h2>{photo.alt}</h2>
                                        <p>{photo.photographer}</p>
                                    </div>
                                </div>
                            :
                                <div
                                    className="img_feed_card"
                                    key={index}
                                    onMouseOver={handleMouseOver}
                                    onMouseOut={handleMouseOut}
                                    onClick={() => selectedImg(photo.src.original)}
                                >
                                    <div className="overlay_content">
                                    <h2>{photo.alt}</h2>
                                    <p>{photo.photographer}</p>
                                    </div>
                                    <div className="image-container">
                                    <img src={photo.src.original} alt="Image from photographer" />
                                    </div>
                                </div>
                            ))
                        :
                            photos.map((photo, index) => (
                            <div
                                className="img_feed_card"
                                key={index}
                                onMouseOver={handleMouseOver}
                                onMouseOut={handleMouseOut}
                                onClick={() => selectedImg(photo.src.original)}
                            >
                                <div className="overlay_content">
                                <h2>{photo.alt}</h2>
                                <p>{photo.photographer}</p>
                                </div>
                                <div className="image-container">
                                <img src={photo.src.original} alt="Image from photographer" />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}