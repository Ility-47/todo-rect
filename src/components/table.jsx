import s from './table.module.css'
import {tasks} from '../state.js'
import { useState, useRef, useEffect } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { sortTasks } from '../script';

const AddTask = ({handleText, selectedDate, setSelectedDate, pushTask}) => {
    const [isActive, setActive] = useState(false);
    const refInput = useRef()
    const handleActive = (event) => {
        setActive(!isActive)
        if(isActive){
            pushTask()
        }
        refInput.current.value = ''
    }
    return (
        <div className={s.table__add__task} >
           
            <div className={!isActive ? s.table__add__task__prop : s.table__add__task__prop + ' ' + s.active}>
                <div className={s.table__add__wrapper}>
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
                    <input 
                    className={s.table__textInput} 
                    type="text" 
                    onChange={handleText}
                    ref={refInput} />
                </div>
            </div>

            <button className={!isActive ? s.table__add__button : s.table__add__button + ' ' + s.active__btn} onClick={handleActive}> <i className="fa-solid fa-plus"></i></button >
        </div >
    )
}

const TableCol = ({day}) =>{
    //для автоматического изменения текстареа
    const [text, setText] = useState('');
    const textareaRef = useRef(null);

    // Функция для обновления текста
    const handleChange = (event) => {
        setText(event.target.value);
    };

    // Эффект для автоматической настройки высоты
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Сбрасываем высоту
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Устанавливаем новую высоту
        }
    }, [text]); // Запускаем эффект при изменении текста

    return(
        <div className={s.table__col}>
            <h3 className={s.table__col__name}>{day.name}</h3>

            {tasks.map((item, keyt) => {  // цикл по задачам
                if (item.date.weekday.toLowerCase() == day.name)
                    return (<div className={s.table__task} key={keyt}>
                                <textarea 
                                    onChange={handleChange}
                                    ref={textareaRef}
                                    value={text}
                                >
                                  ${item.text}   
                                </textarea>
                                {`${item.date.day} ${item.date.month} ${item.date.time}`}
                        </div>)
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
                    __time: dateParts.time
                })
                console.log(tasks)
        sortTasks(tasks)
        getTask('')
        setSelectedDate(null)
    }
    // // код для дней недели
    // const toggleAdd = (name) => {
    //     setDays(days.map(day => 
    //       day.name === name ? { ...day, isActiveAdd: !day.isActiveAdd } : day
    //     ));
    // };

    return(
        <div className={s.table}>
            <h1 className={s.title}>Расписание на неделю</h1> 
            <div className={s.table__container}>
                    {days.map((day, key) =>(  // цикл по дням
                        <TableCol key={key} day={day} />
                    ))}
            </div>
            <AddTask handleText={handleText} selectedDate={selectedDate} setSelectedDate={setSelectedDate} pushTask={pushTask}  />        
        </div>
    )
}

export default Table