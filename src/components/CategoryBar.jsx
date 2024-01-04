import pexelsClient from "../services/pexelApi"

export default function CategoryBar({ updatePhotos }){

    const selectedImg = ($category) => {
        if($category === 'selection') {
            pexelsClient.photos.curated({ per_page: 10 })
                .then(response => {
                    updatePhotos(response.photos)
                })
                .catch(error => {
                    console.error("Error : ", error)
                })
        } else if ($category === 'video') {
            pexelsClient.videos.popular({ per_page: 50 })
                .then(responsevideo => {
                    updatePhotos(responsevideo.videos)
                })
        } else if ($category === 'aleatoire') {
            const query = 'random'
            pexelsClient.photos.search({ query, per_page: 10 })
                .then((response) => {
                    updatePhotos(response.photos)
                })
        }
    }

    return (
        <>
            <div className="ctrbar_btn">
                <div className="ctrbar_wth">
                    <button onClick={() => selectedImg('selection')}>
                        <p>Selection</p>
                    </button>
                    <button onClick={() => selectedImg('video')}>
                        <p>Vidéos</p>
                    </button>
                    <button onClick={() => selectedImg('aleatoire')}>
                        <p>Aléatoire</p>
                    </button>
                </div>
            </div>
        </>
    )
}