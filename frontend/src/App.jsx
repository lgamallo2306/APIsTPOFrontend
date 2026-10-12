import { Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import CatalogView from './views/CatalogView'

function App() {
  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<CatalogView />} />
      </Routes>
    </div>
  )
}

export default App