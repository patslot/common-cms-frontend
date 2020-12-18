import React, {useState, useEffect, createContext, useContext} from 'react'
import {UserContext} from './UserContext'

export const LikesContext = createContext(null)

// eslint-disable-next-line import/no-anonymous-default-export
export default ({children}) =>{
    const hostname = 'http://localhost:1337'
    const {user} = useContext(UserContext)
    const [likesGiven, setLikesGiven] = useState([])
    const [likesReceived, setLikesReceived] = useState([])


    const reloader = () =>{
        if(user){
            const loadLikesGiven = async ()=>{
                const response = await fetch(`${hostname}/likes/given?user=${user.user.id}`,{
                    headers:{
                        'Authorization': `Bearer ${user.jwt}`
                    }
                })
                const data = await response.json()
                setLikesGiven(data)
            }
            loadLikesGiven()
            const loadLikesRecevied = async ()=>{
                const response = await fetch(`${hostname}/likes/received?post.author=${user.user.id}`,{
                    headers:{
                        'Authorization': `Bearer ${user.jwt}`
                    }
                })
                const data = await response.json()
                setLikesReceived(data)
            }
            loadLikesRecevied()
        }
    }
    useEffect(()=>{
        reloader()
    },[user])

    console.log('Likes Given: ', likesGiven)
    console.log('Likes Recevied: ', likesReceived)

    return (
        <LikesContext.Provider value={{likesGiven, likesReceived, reloader}}>
            {children}
        </LikesContext.Provider>
    )
}