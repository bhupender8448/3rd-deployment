import { Avatar } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/auth';
import { async } from '@firebase/util';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import ReactDOM from 'react-dom'

function Post({postData, userData}) {
    console.log(postData);
    console.log(userData);

    const {user} = useContext(AuthContext)
    const [like,setLike] = useState(false)


    const [playPause,setPlayPause] = useState(false)


    const videoRef = useRef();





    useEffect(() => {
      if(postData.likes.includes(user.uid)){
        setLike(true)
      }else{
        setLike(false)
      }

    },[postData, user.uid])

    const handleLike = async() => {
      if(!like){
        await updateDoc(doc(db, "posts", postData.postId), {likes: arrayUnion(user.uid)})
      }else{
        await updateDoc(doc(db, "posts", postData.postId), {likes: arrayRemove(user.uid)})
      }
    }

    const handleClick = (e) => {
      e.preventDefault();
      e.target.muted = !e.target.muted

      // videoRef.current.play();

      if(playPause == false){
        videoRef.current.play();
        setPlayPause(true)
        
      }else{
        videoRef.current.pause();
        setPlayPause(false)
      }


    }
    // const handleScroll = (e) => {
    //   let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling
    //   if(next){
    //     next.scrollIntoView()
    //     e.target.muted = true
    //   }
    // }
    // onEnded={handleScroll}







    // const handlePause = (e) => {

    //   videoRef.current.pause();
      
    // }
    // onDoubleClick={handlePause}

    // onEnded={handleScroll}

    // onEnded={handleScroll} 

    //try with autoplay


  return (
    <div className="post-container">
          <video src={postData.postUrl}  muted="muted"  onClick={handleClick}  ref={videoRef} />
          <div className="videos-info">
            <div className="avatar_container">
                <Avatar alt="Remy Sharp" src={postData.profileUrl} sx={{margin:"0.5rem"}}/>
                <p style={{color:"black", fontWeight:"bold"}}>{postData.profileName}</p>
             </div>
            <div className="post-like"><FavoriteIcon fontSize="large" style={like? {color:"red"} : {color:"white"}} onClick={handleLike}/>
              {postData.likes.length > 0 && postData.likes.length} 
             </div>
          </div>
        </div>
  )
}

export default Post
