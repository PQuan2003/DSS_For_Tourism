import { BrowserRouter, Routes, Route } from 'react-router-dom'


//for now
import Form from './pages/form'
import Destination from './pages/SearchPage'
import Error from './pages/not_found/Not_Found_Page'
import Home from './pages/Home/Home'
import Result from './pages/Result/Result'
import Test from './pages/Test'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='form' element={<Form />} />
      <Route path='destination' element={<Destination />} />
      <Route path='result' element={<Result />} />
      <Route path='test' element={<Test />} />
      <Route path='*' element={<Error />} />
    </Routes>
  )
}

export default App
