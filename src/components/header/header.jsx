import h from './header.module.css'
import {users} from '../../state'
import {
    BrowserRouter as Router,
    Link,
  } from 'react-router-dom';
import { useEffect, useState } from 'react';
  
const CloseOpen = ({onClick, Icon, active}) =>{
    const [isBack, setBack] = useState(false)
    const closeClick = () =>{
        onClick()
    }
    return(
        <>
            <div onClick={closeClick} className={active ? h.close__container + ' ' + h.active__back :  h.close__container}>
            </div>
            <button onClick={onClick} className={h.closeOpen}>{Icon}</button>
        </>
    )
}

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
                <span>Расписание недели</span><i className="fa-solid fa-upload"></i> 
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
    

    const [isActive, setActive] = useState(true)
    const [isIcon, setIcon] = useState(<i className="fa-solid fa-bars"></i>)
    const headerChange = () =>{
        if(isActive){
            setIcon(<i className="fa-solid fa-xmark"></i>)
        }else{
            setIcon(<i className="fa-solid fa-bars"></i>)
        }
        setActive(!isActive)
    }

    return(
    <div className={isActive ? h.container + ' ' + h.nonActive  : h.container }>
        <header>
            <User {...actualUser}/>
            <Menu />
        </header>
        <CloseOpen onClick={headerChange} Icon={isIcon} active={isActive} />
    </div >
    )
}
export default Header;