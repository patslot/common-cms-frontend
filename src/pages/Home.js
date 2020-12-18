import React, {useState, useEffect}from 'react'; 
import {Link} from 'react-router-dom';
import Post from '../components/Post'



  // eslint-disable-next-line import/no-anonymous-default-export
export default () =>{
 
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
      const getPosts = async () =>{
        const response = await fetch('http://localhost:1337/posts')
        const data = await response.json() 
        setPosts(data)
  
      }
      getPosts()
    },[])
    return (
      <div className="Home">
        { posts.map( (post, index)  => (
            <Link to={`/${post.id}`} key={index}>
            <Post 
              description={post.description}
              likes={post.likes}
              url={post.image && post.image.url} 

            />
            </Link>
          ))
        }
        
      </div>
    );
}