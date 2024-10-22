import h from './header.module.css'
import {users} from '../../state'
import {
    BrowserRouter as Router,
    Link,
  } from 'react-router-dom';
import { useEffect, useState } from 'react';
  
const User = ({name, clas, logo}) => {
    return(
        <>
        <div className={h.user}>
            <div className={h.logo}><img src={logo} alt="" /></div>
            <div className={h.user__info}>
                <h5 className={h.user__name} >{name}</h5>
                <h6 className={h.user__class} >{clas}</h6>
            </div>
        </div>
        <div className={h.underline}></div>
        </>
    )
}

const Menu = () =>{
    return (
        <div className={h.menu}>
            <div className={h.wrapper}>
                <Link to="/Table" className={h.menu__item}>
                <span>Загрузить воспоминание</span><i className="fa-solid fa-upload"></i> 
                </Link>
                <Link to="/Registration" className={h.menu__item}>
                <span>Личный кабинет</span><i className="fa-solid fa-user"></i>
                </Link>
            </div>
        </div>
    )
}

const Header = () => {
    const [actualUser, setActualUser] = useState(users[0]);
    useEffect(() =>{
        const activeUser = users.find((item) => item.isLogin);
    if (activeUser) {
      setActualUser(activeUser);
    }
    }, users)
    
    return(
    <header>
        <User {...actualUser}/>
        <Menu />
    </header>
    )
}
export default Header;