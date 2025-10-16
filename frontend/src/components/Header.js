import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header(){
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('ss_user') || 'null');

  const logout = () => {
    localStorage.removeItem('ss_token');
    localStorage.removeItem('ss_user');
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div className="brand"><Link to="/" style={{textDecoration:'none',color:'#0f172a'}}>Serpent Savers</Link></div>
        <nav className="nav">
          <Link to="/requests">Requests</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/contact">Contact</Link>
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={logout} style={{marginLeft:8}}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
