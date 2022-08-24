import { Route, Routes } from 'react-router-dom'
import { useModal } from './Context/ModalContext'
import Header from './components/Header/Header'
import Home from './components/Home&Register/Home'
import Login from './components/Login/Login'
import Register from './components/Home&Register/Register'
import Modal from './components/Modal/Modal'

function App() {
  const [modal] = useModal();

  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>

      {modal && <Modal>{modal}</Modal>}
    </div>
  )
}

export default App;
