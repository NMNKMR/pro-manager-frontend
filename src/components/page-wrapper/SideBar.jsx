import styles from "../css/SideBar.module.scss";
import {NavLink} from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FiDatabase, FiSettings } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5"

const navItems = [
    {
        name: "Board",
        route: "/dashboard",
        logo: <MdOutlineSpaceDashboard/>,
        key: "board"
      },
      {
        name: "Analytics",
        logo: <FiDatabase/>,
        route: "/analytics",
        key: "analytics"
      },
      {
        name: "Settings",
        logo: <FiSettings/>,
        route: "/settings",
        key: "settings"
    },
]

function SideBar() {
  return (
    <section className={styles.sidebar}>
      <nav>
        <div className={styles.brand}>
          <h3>
            <span>
              <img src="logo.svg" alt="logo" /> Pro Manage
            </span>
          </h3>
        </div>
        <div className={styles.navitems}>
          <ul>
            {navItems.map((nav) => (
              <li key={nav.key}>
                  <NavLink
                    to={nav.route}
                    className={({ isActive }) =>
                      `${isActive ? styles.active : ""}`
                    }
                  >
                    <span>
                      {nav.logo}{nav.name}
                    </span>
                  </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.logout}>
          <p>
            <span>
              <IoLogOutOutline/> Log out
            </span>
          </p>
        </div>
      </nav>
    </section>
  );
}

export default SideBar