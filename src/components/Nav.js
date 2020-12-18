import React, { useContext } from 'react'
import {NavLink} from 'react-router-dom'
import {UserContext} from '../context/UserContext'
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const {user} = useContext(UserContext)
    return(
       
        <div className="Nav">
            <NavLink to='/' exact>Home</NavLink>
            {user &&
                <NavLink to='/create'>Create</NavLink>
            }
            {!user &&
                <>
                    <NavLink to='/login'>Login</NavLink>
                    <NavLink to='/Signup'>Signup</NavLink>
                </>
            }
        </div>
    )
}