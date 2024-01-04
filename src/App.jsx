import { useState } from 'react'
import NavBar from './components/NavBar'
import SearshBar from './components/SearshBar'
import CategoryBar from './components/CategoryBar'
import ImgFeed from './components/ImgFeed'

import './styles/imgFeed.css'
import './styles/SearshBar.css'
import './styles/NavBar.css'
import './styles/CategoryBar.css'
import './main.css'

function App() {
  const [photos, setPhotos] = useState([])

  const updatePhotos = (newPhotos) => {
    setPhotos(newPhotos)
    console.log(photos)
  }

  return (
    <>
      <NavBar updatePhotos={updatePhotos} />
      {/* <SearshBar /> */}
      <CategoryBar updatePhotos={updatePhotos} />
      <ImgFeed updatePhotos={photos} />
    </>
  )
}

export default App
