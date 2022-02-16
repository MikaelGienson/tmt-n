import "./Sidebar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MENU_ICON,
  ICONS,
  FOOTER_ICONS,
  ICONS_DESCR,
  FOOTER_ICONS_DESCR
} from "../icons";

const Sidebar = () => {
  const [isOpen, setOpen] = useState(true);

  return (
    <>
    
      <div className="container">
        <aside className={isOpen ? "sidebar open" : "sidebar"}>
          <div className="top-sidebar">
            <Link to="/" className="logo">
              <div className="tmt">TMT</div>
            </Link>
            <div className="hidden-sidebar your-channel">Your project</div>
            <div className="hidden-sidebar channel-name">
              Test Management Tool
            </div>
          </div>
          <div className="middle-sidebar">
            <ul className="sidebar-list">
              {ICONS.map((icon, idx) => (
                <li className="sidebar-list-item">
                  <Link to="/" className="sidebar-link">
                    {icon}
                    <div className="hidden-sidebar">{ICONS_DESCR[idx]}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="bottom-sidebar">
            <ul className="sidebar-list">
            <button
          className="menu-icon-btn"
          onClick={() => setOpen((prev) => !prev)}
        >
          {MENU_ICON}
        </button>
              {FOOTER_ICONS.map((icon, idx) => (
                <li className="sidebar-list-item">
                  <Link to="/" className="sidebar-link">
                    {icon}
                    <div className="hidden-sidebar">
                      {FOOTER_ICONS_DESCR[idx]}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <main className="content">content</main>
      </div>
    </>
  );
};

export default Sidebar;
