import { useEffect, useState } from "react"
import pexelsClient from "../services/pexelApi"

export default function ImgFeed(){
    const [photos, setPhotos] = useState([])
    const [ContentVisible, setContentVisible] = useState(false)
    const [imageSelected, setSelectedImg] = useState('')
    const [model, setModel] = useState(false)

    const selectedImg = (imgSrc) => {
        setSelectedImg(imgSrc);
        setModel(true);
    };

    const handleCloseImg = () => {
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
                    <img src={imageSelected} alt={imageSelected} />
                    <p onClick={handleCloseImg}>X</p>
                </div>
                <div className="imgf_div">
                    {photos.map((photo, index) => (
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
                    ))}
                </div>
            </div>
        </>
    )
}