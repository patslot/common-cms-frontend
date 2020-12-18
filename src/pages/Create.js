import React, {useState,useContext} from 'react'
import {UserContext} from '../context/UserContext'
// eslint-disable-next-line import/no-anonymous-default-export
export default ({history})=> {
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)
    const [error, setError] = useState('')

    const {user} = useContext(UserContext)

    const handleSubmit = async (event) =>{
        event.preventDefault() 

        if(!user){
            setError("Please login in first")
            return
        }

        if(!description){
            setError("Please add a description")
            return 
        }
        if(!file){
            setError("Please add a file")
            return
        }  
        const formData = new FormData()
        formData.append('data', JSON.stringify({description}))
        formData.append('files.image',file)

        try{
            const response = await fetch('http://localhost:1337/posts',{
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.jwt}`
                },
                body: formData
            })
            const data = await response.json()
            history.push('/')
            console.log('data', data);    
        }catch(err){
            console.log("exception", err);
            setError(err);
        }
        
    }
    return (
        <div className="Create">
            <h2>Create Post</h2>
            { error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input 
                    placeholder="Description"
                    value={description}
                    onChange={(event)=>{
                        setError('')
                        setDescription(event.target.value)
                    }}
                />
                <input 
                    type="file"
                    placeholder="Add a File"
                    onChange={(event)=>{
                        setError('')
                        setFile(event.target.files[0])
                    }}
                />
                <button>Submit</button>
            </form>    
        </div>
    )
}