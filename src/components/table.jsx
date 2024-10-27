import s from './table.module.css'
import {tasks} from '../state.js'
import { useState, useRef } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddTask = ({handleText, selectedDate, setSelectedDate, pushTask, toggleAdd}) => {
    const [isActive, setActive] = useState(false);
    const handleActive = () => {
        setActive(!isActive)
       // toggleAdd(day.name)
    }
    return (
        <div className={s.table__add__task} >
           
            <div className={!isActive ? s.table__add__task__prop : s.table__add__task__prop + ' ' + s.active}>
                <div className={s.table__add__wrapper}>
                    <input className={s.table__textInput} type="text" onChange={handleText} />
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)} // обновляем дату
                        showMonthDropdown  // показать выбор месяца
                        showTimeSelect
                        dropdownMode="select" // стиль выбора (выпадающий список)
                        dateFormat="dd/MM/yyyy" // формат даты
                        customInput={
                            <span className={s.table__dateIcon}>
                                <i className="fa-regular fa-calendar"></i>
                            </span>
                        }
                    />
                </div>
                <button className={s.table__send__button} onClick={() => pushTask()}>send</button>
            </div>

            <button className={s.table__add__button} onClick={handleActive}> <i className="fa-solid fa-plus"></i></button >
        </div >
    )
}

const TableCol = ({day}) =>{
    return(
        <div className={s.table__col}>
            <h3 className={s.table__col__name}>{day.name}</h3>

            {tasks.map((item, keyt) => {  // цикл по задачам
                if (item.date.weekday.toLowerCase() == day.name)
                    return (<div className={s.table__task} key={keyt}>{`${item.text}, ${item.date.day} ${item.date.month} ${item.date.time}`}</div>)
            })}
        </div>        
    )
}

const Table = () =>{
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

    const getDateParts = (date) => {
        if (!date) return {};
        
        const options = { month: 'long' }; // Опции для форматирования месяца
        const monthName = date.toLocaleString('default', options); // Получаем название месяца

        const daysOfWeek = [
            'Воскресенье', 
            'Понедельник', 
            'Вторник', 
            'Среда', 
            'Четверг', 
            'Пятница', 
            'Суббота'
          ];

        return {
          day: date.getDate(),
          month: monthName,
          weekday:daysOfWeek[date.getDay()],
          year: date.getFullYear(),
          time: date.toLocaleTimeString(), // Получаем время
        };
      };
    
    const dateParts = getDateParts(selectedDate);
    
    
    const pushTask = () =>{ // создание задачи
                 tasks.push({
                    id: tasks.length + 1,
                    text: isTask,
                    day: dateParts.weekday,
                    date: dateParts,
                })
        tasks.sort((a,b) => a.date - b.date)
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
        <div className={s.table}>
            <h1 className={s.title}>Расписание на неделю</h1> 
            <div className={s.table__container}>
                    {days.map((day, key) =>(  // цикл по дням
                        <TableCol key={key} day={day} />
                    ))}
            </div>
            <AddTask handleText={handleText} selectedDate={selectedDate} setSelectedDate={setSelectedDate} pushTask={pushTask} toggleAdd={toggleAdd} />        
        </div>
    )
}

export default Table