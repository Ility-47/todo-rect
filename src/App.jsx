import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Table from './components/table.jsx'
import Registration from './components/registration/registration.jsx'
import Header from './components/header/header.jsx'
import {
  Route,
  BrowserRouter,
  Routes
} from 'react-router-dom';
function App() {

  return (
    <>
    
      {/* <h1 className='title'>Todo list</h1>
      <div className='subtitle'>
        Выберите нужный тип заметки
      </div>
      <div className='list'>
        <div className='list__item'>
          <div className='list__item__name'>
              Дневное расписание
          </div>
          <i class="fa-solid fa-plus"></i>
        </div>
      </div> */}
        {/* <Table /> */}
        {/* <Registration /> */}
        <BrowserRouter>
        <Header />
        <div className='container'>
        <Routes>
          <Route path="/Table" element={<Table />} />
          <Route path="/Registration" element={<Registration />} />
        </Routes>
        </div>
      </BrowserRouter>
    
    </>
  )
}

export default App
