import React, { useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
// Next inbuilt Image
import Image from 'next/image'
import insta from '/assets/hello_world.png'
import { Button, speedDialActionClasses } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/auth';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import {db, storage} from '../../firebase'
import { StayCurrentLandscapeOutlined } from '@mui/icons-material';
import { doc, setDoc } from 'firebase/firestore';

function Index() {

  
  const router = useRouter()
  const [email,setEmail] = React.useState('')
  const [password,setPassword] = React.useState('')
  const [name,setName] = React.useState('')
  const [file,setFile] = React.useState(null)
  const [error,setError] = React.useState('')
  const [loading,setLoading] = React.useState(false)

  const {signup,user} = useContext(AuthContext)

  const handleClick = async () => {
    
    try{
      setLoading(true)
      setError('')
      //auth -> unique id
      const user = await signup(email, password)
      console.log("Signed Up!")
      //storage
      const storageRef = ref(storage, `${user.uid}/Profile`);

const uploadTask = uploadBytesResumable(storageRef, file);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
  }, 
  (error) => {
    // Handle unsuccessful uploads
    console.log(error)
  }, 
  async () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      console.log('File available at', downloadURL);
      let obj = {
        name: name,
        email: email,
        uid : user.user.uid,
        photoURL: downloadURL,
        posts: []
      }
      //firestore treat as comment
      // async () => {
       await setDoc(doc(db,"users",user.user.uid),obj)
        
      // }
      console.log("doc added")
      

    });
  }
);

      
    }catch(err){
      console.log(err)
      setError(err.message)
      setTimeout(()=>{
        setError('')
      },2000)
    }
    setLoading(false)
  }

  useEffect(()=>{
    if(user){
        router.push('/')
    }
    else{
      console.log("Not logged in");
    }
  },[router, user])


  return (
    <div className="signup-container">
      <div className="signup-card">
        <Image src={insta} alt="abc" />
      <TextField id="outlined-basic" margin='dense' size="small" fullWidth label="Email" variant="outlined" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <TextField id="outlined-basic" margin='dense' size="small" fullWidth label="Password" type="password" variant="outlined" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <TextField id="outlined-basic" margin='dense' size="small" fullWidth label="Name" variant="outlined" value={name} onChange={(e)=>setName(e.target.value)}/>
      <Button variant="outlined" fullWidth component="label" style={{marginTop:'0.5rem'}}>
        <input type="file" accept="image/*" style={{display:'none'}} onChange={(e)=>setFile(e.target.files[0])}/>
        Upload
      </Button>
      <Button variant="contained" fullWidth component="span" style={{marginTop:'0.5rem'}} onClick={handleClick} disabled={loading}>
        Sign Up
      </Button>
      </div>
      <div className='bottom-card'>
        Already Have an Account? <Link href="/login"><span style={{color:'blue'}}>Login</span></Link>
      </div>
    </div>
  )
}

export default Index
