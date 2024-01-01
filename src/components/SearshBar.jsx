export default function SearshBar(){
    return (
        <>
            <div className="srh_ctn">
                <p>Les plus belles photos, images et vidéos libres de droits partagées gratuitement par des créateurs talentueux.</p>
                <form action="GET">
                    <input type="text" />
                    <input type="submit" value="Rechercher" />
                </form>
            </div>
        </>
    )
}