import {message } from 'antd';
import React, {useState,useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'

const Header = () => {
    const [loginUser, setLoginUser] = useState('');

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'));

        if(user){
            setLoginUser(user);
        }
    },[])

    let navigate = useNavigate();
    const handleClick = () =>{
        localStorage.removeItem('user');
        message.success('Logged out Succesfully')
        navigate('/login')
    }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Expense Management System</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="/"></Link>
        </li>
      </ul>
      <form className="d-flex">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item my-2 mx-2">
         {loginUser && loginUser.name}
        </li>
        <button className="btn btn-primary mx-2" onClick={handleClick}>
         Log Out
        </button>
        
      </ul>
          {/* <Button className="btn btn-primary " aria-current="page">Log Out</Button> */}
      </form>
    </div>
  </div>
</nav>
    </>
  )
}

export default Header
