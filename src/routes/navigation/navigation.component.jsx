import { Link, Outlet } from "react-router-dom"
import { Fragment, useContext } from "react";
import './navigation.styles.scss'
import { UserContext } from "../../contexts/user.context";
import { ReactComponent as CrownLogo } from "../../assets/MyLogo.svg";
import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () => {
    const { currentUser,setCurrentUser } = useContext(UserContext)

    const signOutHandler = async () => {
        const res = await signOutUser()
        setCurrentUser(null)
    }

    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <CrownLogo />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        SHOP
                    </Link>
                    {
                        currentUser ? (
                            <span className="nav-link" onClick={signOutHandler}>SIGN OUT</span> 
                        ) : (
                            <Link className="nav-link" to='/auth'>
                                SIGN IN
                            </Link>
                        )
                    }
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;