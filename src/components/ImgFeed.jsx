import { useEffect, useState } from "react"
import pexelsClient from "../services/pexelApi"


export default function ImgFeed(){
    const [photos, setPhotos] = useState([])

    useEffect(() => {
        const query = 'Nature'

        pexelsClient.photos.search({query, per_page: 10})
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
                <div className="imgf_div">
                    {photos.map((photo, index) => (
                        <div className="img_feed_card" key={index}>
                            <h2>{photo.alt}</h2>
                            <p>{photo.photographer}</p>
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