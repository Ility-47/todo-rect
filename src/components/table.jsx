import s from './table.module.css'
import {tasks} from '../state.js'
import { useState, useRef } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

let Table = () =>{
    const [isTask, getTask] = useState('')
    const [selectedDate, setSelectedDate] = useState(null);
    const [days, setDays] = useState([
        {
            name: 'понедельник',
            isActiveAdd: false,
        },
        {
            name: 'вторник',
            isActiveAdd: false,
        },
        {
            name: 'среда',
            isActiveAdd: false,
        },
        {
            name: 'четверг',
            isActiveAdd: false,
        },
        {
            name: 'пятница',
            isActiveAdd: false,
        },
        {
            name: 'суббота',
            isActiveAdd: false,
        },
        {
            name: 'воскресенье',
            isActiveAdd: false,
        },          
      ]);


    const handleText = (event) =>{ //записываем задачу из инпута в стейт
        getTask(event.target.value)
    }


    const pushTask = (dayEvent) =>{ // создание задачи
        days.map(day =>{
            if(isTask != '' && day.name == dayEvent.name){
                tasks.push({
                    id: tasks.length + 1,
                    text: isTask,
                    day: day.name,
                    date: selectedDate,
                })
                day.isActiveAdd = false
            }
        })
        console.log(selectedDate)
        getTask('')
        setSelectedDate(null)
    }
    // код для дней недели
    const toggleAdd = (name) => {
        setDays(days.map(day => 
          day.name === name ? { ...day, isActiveAdd: !day.isActiveAdd } : day
        ));
    };



    return(
        <>
        <h1 className={s.title}>Таблица</h1> 
        <div className={s.table__container}>
                {days.map((day, key) =>(
                    <div className={s.table__col} key={key}>
                        <h3 className={s.table__col__name}>{day.name}</h3>
                        
                            {tasks.map(item =>{
                                if(item.day == day.name) return (<div className={s.table__task}>{`${item.text}, ${item.date}`}</div>)
                            })}
                        
                        <div className={s.table__add__task}>   
                            {day.isActiveAdd && (
                                <>
                                    <div className={s.table__add__wrapper}>
                                        <input className={s.table__textInput} type="text" onChange={handleText} />
                                        <DatePicker
                                            selected={selectedDate}
                                            onChange={(date) => setSelectedDate(date)} // обновляем дату
                                            showMonthDropdown  // показать выбор месяца
                                            showYearDropdown   // показать выбор года
                                            dropdownMode="select" // стиль выбора (выпадающий список)
                                            dateFormat="dd/MM/yyyy" // формат даты
                                            customInput={
                                                <span className={s.table__dateIcon}>
                                                    <i className="fa-regular fa-calendar"></i>
                                                </span>
                                            }
                                        />
                                        {/* <input className={s.table__dateInput} type="date" id="inputDate" ref={dateInputRef}/>
                                        <span className={s.table__dateIcon} onClick={handleCalendarClick}>
                                            <i className="fa-regular fa-calendar"></i>
                                        </span> */}
                                    </div>                                        
                                    <button className={s.table__send__button} onClick={() => pushTask(day)}>send</button>
                                </>
                                )}
                            <button className={s.table__add__button} onClick={() => toggleAdd(day.name)}><i className="fa-solid fa-plus"></i></button>
                        </div> 
                    </div>        
                ))}
        </div>
        </>
    )
}

export default Table