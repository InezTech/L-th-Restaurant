import React from "react";
import { Link, useHistory } from "react-router-dom";

const NavBar = () => {
  const history = useHistory();
  return (
    <nav className="navbar navbar-dark sticky-top">
      <div className="container-fluid d-flex justify-content-between align-items-center px-4">
        <Link className="navbar-brand d-flex align-items-center" to="/" style={{ textDecoration: 'none' }}>
          <span style={{
            fontSize: '1.4rem',
            fontWeight: '800',
            letterSpacing: '0.15em',
            color: '#fff',
            borderRight: '1px solid rgba(255,255,255,0.2)',
            paddingRight: '1rem',
            marginRight: '1rem',
            fontFamily: "'Outfit', sans-serif"
          }}>LÉTHÉ</span>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--admin-accent)'
          }}>Management Cockpit</span>
        </Link>
        <div className="d-flex gap-3 align-items-center">
          <button
            onClick={() => {
              if (window.location.hostname === "localhost") {
                window.location.href = "http://localhost:8080";
              } else {
                window.location.href = "/";
              }
            }}
            className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2"
            style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
          >
            <i className="bi bi-grid-fill"></i> Switch View
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => history.push("/search")}
          >
            <i className="bi bi-search me-2"></i>Search
          </button>
          <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)', margin: '0 0.5rem' }}></div>
          <div className="d-flex align-items-center">
            <div style={{ width: '8px', height: '8px', background: 'var(--success)', borderRadius: '50%', marginRight: '0.5rem' }}></div>
            <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', fontWeight: '600' }}>LIVE SYSTEM</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
