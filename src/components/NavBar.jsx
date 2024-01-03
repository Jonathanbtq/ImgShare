import SearshBar from "./SearshBar";

export default function NavBar({ updatePhotos }){
    return(
        <>
            <nav>
                <div className="nav_header">
                    <p>P</p>
                    <h1>PixelShare</h1>
                </div>
                <SearshBar updatePhotos={updatePhotos} />
            </nav>
        </>
    )
}