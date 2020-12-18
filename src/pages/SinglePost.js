import React, {useState, useEffect, useContext} from 'react'
import Post from '../components/Post'
import {UserContext} from '../context/UserContext'
import {LikesContext} from '../context/LikesContext'
// eslint-disable-next-line import/no-anonymous-default-export
export default ({match,history})=>{
    const {id} = match.params
    // console.log("id", id)
    const hostname = 'http://localhost:1337' ; 

    const {likesGiven, reloader} = useContext(LikesContext)
    console.log("likesGiven" , likesGiven)

    const isPostAlreadyLiked = (()=>{
        return likesGiven.find(like => {
            return like.post && (String(like.post.id) === id)
        })
    })()
    
    console.log("Is Post Already Liked", isPostAlreadyLiked)

    const {user, setUser} = useContext(UserContext)
    // console.log(user);
    // console.log(setUser);
    const [post, setPost] = useState({}); 
    const [Loading, setLoading] = useState(true);
    const [error, setError] = useState(''); 
    const [edit, setEdit] = useState(false);
    const [description, setDescription] = useState('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchPost = async () =>{
        try{
            const response = await fetch(`${hostname}/posts/${id}`)
            const data = await response.json()
            // console.log("data", data)
            setPost(data);
            setDescription(data.description);
            setLoading(false)
        }
        catch(err){
            console.log("error - ", err)
            setError(err);
        }
       
    }
    const handleLike = async () => {
        try{
            const response = await fetch(`${hostname}/likes`,{
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.jwt}`, 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    post: parseInt(id)
                })
            })
            const data = await response.json()
            console.log(data)
            if(data.message){
                setError(data.message);
                return 
            }
            fetchPost();
            reloader();
        }catch(err){
            console.log("exception ", err)
            setError(err);
        }
    }
    const handleRemoveLike = async () => {
        try{
            const response = await fetch(`${hostname}/likes/${id}`,{
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.jwt}`
                }
            })
            const data = await response.json()
            console.log(data)
            fetchPost();
            reloader();
        }catch(err){
            console.log("exception ",err)
            // setError(err);
        }
    }
    const handleDelete = async () =>{
        const response = await fetch(`${hostname}/posts/${id}`,{
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.jwt}`
            }
        })
        const data = await response.json()
        console.log(data)
        history.push('/')
    }
    const handleEditSubmit = async (event) =>{
        event.preventDefault()
        const response = await fetch(`${hostname}/posts/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${user.jwt}`
            },
            body: JSON.stringify({description})
        })
        const data = await response.json();
        fetchPost();
        console.log('handleEditSubmit return: ', data);
    }
    useEffect(fetchPost,[])

    return (
        <div className="SinglePost">
            { !error && 
                <>
                { Loading && <p>Loading...</p>}
                { !Loading &&
                    <>
                        {post.id &&
                            <>
                                <Post 
                                    description={post.description}
                                    likes={post.likes}
                                    url={post.image && post.image.url} 
                                />
                                {user && 
                                    <>
                                        {isPostAlreadyLiked && 
                                        <button onClick={handleRemoveLike}>Remove Like</button>
                                        }
                                        {!isPostAlreadyLiked && 
                                            <button onClick={handleLike}>Like</button> 
                                        }
                                    </>
                                }
                                {user && 
                                    <>
                                        <button onClick={handleDelete}>Delete this Post</button>
                                        <button onClick={()=>setEdit(true)}>Edit this Post</button>
                                        {edit && 
                                            <form onSubmit={handleEditSubmit}>
                                                <input 
                                                    value={description} 
                                                    onChange={(event)=>setDescription(event.target.value)}
                                                    placeholder="New Description"
                                                />
                                                <button>Confirm</button>
                                            </form>
                                        }
                                    </>
                                }
                            </>
                        }
                        {!post.id &&
                            <p> 404 - not found</p>
                        }
                    </>
                }
                </>
            }
            { error && <p>{error}</p>}
        </div>
    )
}
