import { useState } from 'react'
import NavBar from './components/NavBar'
import SearshBar from './components/SearshBar'
import CategoryBar from './components/CategoryBar'
import ImgFeed from './components/ImgFeed'

import './styles/ImgFeed.css'
import './styles/SearshBar.css'
import './styles/NavBar.css'
import './styles/CategoryBar.css'
import './main.css'

function App() {

  return (
    <>
      <NavBar />
      <SearshBar />
      <CategoryBar />
      <ImgFeed />
    </>
  )
}

export default App
