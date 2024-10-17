import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Table from './components/table.jsx'
import Registration from './components/registration/registration.jsx'

function App() {

  return (
    <>
    <div className='container'>
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
        <Registration />
    </div>
    </>
  )
}

export default App
