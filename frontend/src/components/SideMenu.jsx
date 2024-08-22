import '../styles/componentsStyles/sideMenu.css'

import { NavLink, Outlet } from "react-router-dom";

const SideMenu = () => {
  return (
    <main className='user-home'>
      <aside>
        <nav id="sidebar-menu">
          <ul className="sidebar-links">
            <li className="sidebar-link">
              <NavLink to="/dashboard">dashboard </NavLink>
            </li>
            <li className="sidebar-link">
              <NavLink to="expense">expense </NavLink>
            </li>
            <li className="sidebar-link">
              <NavLink to="income">income </NavLink>
            </li>
            <li className="sidebar-link">
              <NavLink to="budget">budget </NavLink>
            </li>
            <li className="sidebar-link">
              <NavLink to="investment">investment </NavLink>
            </li>
            <li className="sidebar-link">
              <NavLink to="transactions">transactions </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <Outlet/>
    </main>
  );
};

export default SideMenu;
