import { useState } from 'react'
import s from './registration.module.css'
import {users} from '../../state'
import bcrypt from 'bcryptjs'

const Registration = () =>{
    const [isData, setData] = useState({
        isName: '',
        isLogin: '',
        isPass: '',
        isEmail: '',
    })
    const [isActive, setActive] = useState(false)
    const [isActiveClass, setActiveClass] = useState(false)
    const [zIndex, setZIndex] = useState(1)
    
    const handleAnimationEnd = () => {
        // Устанавливаем z-index на 1000 после окончания анимации
        setTimeout(() => (setZIndex(1000)), 1000)
    };
    

    //Добавление эктив при нажатии на переключатель формы
    const changeActive = () =>{
        setActiveClass(!isActiveClass)
        setZIndex(1);
    }
    //запись в дату всего
    const changeData = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };
    //создание пользователя
    const addUser = (event) =>{
        event.preventDefault()
    //Хэширование пароля
        let hashPass = bcrypt.hashSync(isData.isPass, 8);
        users.push(
            {
                id: users.length + 1,
                login: isData.isLogin,
                password: hashPass,
                tasks: [], 
            }
        )  
    }
    // проверка пользователя
    const checkUser = (event) =>{
        event.preventDefault()
        users.map(user =>{
            let hashPass = bcrypt.hashSync(isData.isPass, 8),
                result = bcrypt.compareSync( isData.isPass ,  hashPass )
            if(user.login == isData.isLogin && result){
                setActive(true)
            }
        })
     
    }
    return(
        <>
    {!isActive && (
    <div className={s.container}>
        <div className={s.form__buttons}>
            <button onClick={changeActive}>Войти</button>
            <button>Зарегистрироваться</button>
        </div>
        <div className={s.container__wrapper}>
            <div 
                className={isActiveClass ? s.wrapper + ' ' + s.logIn + ' ' + s.active : s.wrapper}
                style={{zIndex}}
                onAnimationStart={handleAnimationEnd}
            >
                <h2 className={s.title}>Здравствуйте!</h2>
                <form action="">
                    <div className={s.login}>
                        <label htmlFor="login">Логин:</label> 
                        <input 
                            type="text"
                            placeholder="Введите свой логин"
                            id="login" 
                            onChange={changeData}
                        />
                    </div>
                    <div className={s.password}>
                        <label htmlFor="pswd">Пароль:</label>
                        <input 
                            type="password"
                            placeholder="Введите свой пароль"
                            id="pswd" 
                            onChange={changeData}
                        />
                    </div>
                    <button className={s.signInBtn} onClick={checkUser}>Войти</button>
                </form>
            </div> 
            <div className={s.wrapper + ' ' + s.signIn}>
                <h2 className={s.title}>Добро пожаловать!</h2>
                <form action="">
                <div className={s.login}>
                        <label htmlFor="name">Имя:</label> 
                        <input 
                            type="text"
                            placeholder="Введите свое имя"
                            name="isName"
                            id="name" 
                            value={isData.isName}
                            onChange={changeData}
                        />
                    </div>
                    <div className={s.login}>
                        <label htmlFor="login">Логин:</label> 
                        <input 
                            type="text"
                            placeholder="Введите свой логин"
                            id="login" 
                            name="isLogin"
                            value={isData.isLogin}
                            onChange={changeData}
                        />
                    </div>
                    <div className={s.password}>
                        <label htmlFor="pswd">Пароль:</label>
                        <input 
                            type="password"
                            placeholder="Введите свой пароль"
                            id="pswd" 
                            name="isPass"
                            value={isData.isPass}
                            onChange={changeData}
                        />
                    </div>
                    <div className={s.login}>
                        <label htmlFor="email">Электронная почта:</label> 
                        <input 
                            type="email"
                            placeholder="Введите свою почту"
                            id="email" 
                            name="isEmail"
                            value={isData.isEmail}
                            onChange={changeData}
                        />
                    </div>
                    <button onClick={addUser} className={s.signInBtn}>Зарегистрироваться</button>
                </form>
            </div>
        </div>    
    </div>)}
    </>
    )
}


export default Registration