import {Link} from 'react-router-dom'
import NewGroupButton from './NewGroupButton'

function Navbar({user}) {
    return (
        <nav>
            <div>
                <Link to='/'>
                    Home
                </Link>
            </div>

            <div>
                {user ? (
                    <>
                        <NewGroupButton />
                        <a href="http://localhost:3000/auth/logout/">
                            <button>Logout</button>
                        </a>
                    </>
                ) : (
                    <a href="http://localhost:3000/auth/google/">
                        <button>Login with UCI</button>
                    </a>
                )}
            </div>
        </nav>
    )
}

export default Navbar