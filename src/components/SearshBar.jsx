import { useState } from "react"
import pexelsClient from "../services/pexelApi"

export default function SearshBar(){
    const [photos, setPhotos] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        const query = formData.get('recherche')

        if(query){
            pexelsClient.photos.search({ query, per_page: 10 })
                .then((find) => {
                    setPhotos(find.photos)
                });
        }
        form.reset()
    }

    return (
        <>
            <div className="srh_ctn">
                <p>Les plus belles photos, images et vidéos libres de droits partagées gratuitement par des créateurs talentueux.</p>
                <form action="GET" onSubmit={handleSubmit}>
                    <input type="text"
                        name="recherche"
                    />
                    <input type="submit" value="Rechercher" />
                </form>
            </div>
        </>
    )
}