import { Link } from "react-router-dom";
import NewGroupButton from "./NewGroupButton";
import "../styles/Navbar.css";
import UserGroupsButton from "./UserGroupsButton";

function Navbar({ user }) {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="navbar-logo">
                    StudyGroups
                </Link>
            </div>

            <div className="navbar-right">
                {user ? (
                    <>
                        <UserGroupsButton />
                        <NewGroupButton />
                        <a href="http://localhost:3000/auth/logout/">
                            <button className="navbar-button">Logout</button>
                        </a>
                    </>
                ) : (
                    <a href="http://localhost:3000/auth/google/">
                        <button className="navbar-button login-button">Login with UCI</button>
                    </a>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
