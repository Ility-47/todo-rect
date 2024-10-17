import { useState } from 'react'
import s from './registration.module.css'
import {users} from '../../state'
const Registration = () =>{
    const [isData, setData] = useState({
        isName: '',
        isLogin: '',
        isPass: '',
        isEmail: '',
    })
    
  const changeData = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
    const adduser = () =>{
        users.push(
            {
                id: users.length + 1,
                login: isData.isLogin,
                password: isData.isPass,
                tasks: [], 
            }
        )
        console.log(isData)
    }
    return(
        <div className={s.container}>
            <div className={s.form__buttons}>
                <button>Войти</button>
                <button>Зарегистрироваться</button>
            </div>
            {/* <div className={s.wrapper} style={{display : 'none'}}>
                <h2 className={s.title}>Добро пожаловать!</h2>
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
                    <button className={s.signIn}>Войти</button>
                </form>
            </div> */}
            <div className={s.wrapper}>
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
                    <div onClick={adduser} className={s.signIn}>Зарегистрироваться</div>
                </form>
            </div>
        </div>
    )
}


export default Registration