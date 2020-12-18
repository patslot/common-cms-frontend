import React , {useContext, useEffect, useState}from 'react'
import {UserContext} from '../context/UserContext'
// eslint-disable-next-line import/no-anonymous-default-export
export default ({history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const {user, setUser} = useContext(UserContext)

    useEffect( () => {
        if(user){
            history.push('/')
        }
    }, [user,history])
    const handleSubmit = async (event)=>{
        event.preventDefault()
        try{
            const response = await fetch('http://localhost:1337/auth/local',{
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    identifier: email,
                    password: password
                })
            })
    
            const data = await response.json();
            
            console.log('Data', data);
            if(data.message){
                setError(data.message[0].messages[0].message);
                return 
            }
            setUser(data);
        }catch(err){
            setError('Something went wrong ', err);
        }
       

    }
    return (
        <div>
           <h2>Login</h2>
           <form onSubmit={handleSubmit}>
               <input 
                    type="email"
                    value={email}
                    onChange={(event)=>{
                        setError('')
                        setEmail(event.target.value)
                    }}
                />
                <input 
                    type="password"
                    value={password}
                    onChange={(event)=>{
                        setError('')
                        setPassword(event.target.value)}
                    }
                />
                <button>Login</button>
           </form>
           {error && <p>{error}</p>}
        </div>
    )
}