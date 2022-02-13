import { Link, Outlet } from "react-router-dom";
import './TempNavBar.css'
export default function TempNavBar() {
    return (
        <>
            <nav className="nav-bar">
                 <ul>
                    <li>
                         <Link to="/"> Login Form</Link>
                    </li>
                     <li>
                         <Link to="testruntable"> Test Run Table</Link>
                     </li>
                     <li>
                         <Link to="testsuites">Test Suites</Link>
                     </li>
                 </ul>
            </nav>
            <Outlet />
        </>
    );
}