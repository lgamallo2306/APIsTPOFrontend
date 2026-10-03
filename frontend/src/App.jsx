import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import MyTitle from './components/MyTitle'
import CardList from './components/CardList'
import {Home} from './views/Home'

function App() {
  const [count, setCount] = useState(0)

  return(
    <div>
      <MyTitle />
      <CardList /><br />
      <Home />

    </div>
    
  )
}

export default App
