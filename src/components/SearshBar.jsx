import { useState } from "react"
import pexelsClient from "../services/pexelApi"

export default function SearshBar({ updatePhotos  }){
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const query = formData.get('recherche');
    
        if (query && typeof updatePhotos === 'function') {
          pexelsClient.photos.search({ query, per_page: 20 })
            .then((find) => {
              updatePhotos(find.photos);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
    };

    return (
        <>
            <div className="srh_ctn">
                <p>Les plus belles photos, images et vidéos libres de droits partagées gratuitement par des créateurs talentueux.</p>
                <form action="GET" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="recherche"
                        placeholder="Recherchez des photos gratuites"
                    />
                    <input type="submit" value="Rechercher" />
                </form>
            </div>
        </>
    )
}