import { BrowserRouter, Routes, Route } from 'react-router-dom'


//for now
import Form from './pages/form/Form_Page'
import Destination from './pages/Destinations'
import Error from './pages/not_found/Not_Found_Page'
import Home from './pages/Home/Home'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='form' element={<Form />} />
      <Route path='destination' element={<Destination />} />
      <Route path='*' element={<Error />} />
    </Routes>
  )
}

export default App
