import React, { useContext, useEffect } from 'react'
import TextField from '@mui/material/TextField';
// Next inbuilt Image
import Image from 'next/image'
import insta from '/assets/hello_world.png'
import { Button } from '@mui/material';
import { CarouselProvider, Slider, Slide, Image as Img } from 'pure-react-carousel';
import img1 from '/assets/img1.jpg';
import img2 from '/assets/img2.jpg';
import img3 from '/assets/img3.webp';
import img4 from '/assets/img4.jpg';
import img5 from '/assets/img5.jpg';
import { AuthContext } from '../../context/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';
var Carousel = require('react-responsive-carousel').Carousel;

function Index() {

  const router = useRouter()
  const [email,setEmail] = React.useState('')
  const [password,setPassword] = React.useState('')
  const [error,setError] = React.useState('')
  const [loading,setLoading] = React.useState(false)

  const {login,user} = useContext(AuthContext)


  const handleClick = async () => {
    try{
      setLoading(true)
      setError('')
      await login(email, password)
      console.log("logged in!");
      
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
  },[user])


  return (
    <div className="login-container">
        <div className="carbg">
            <div className="car">
            {/* <CarouselProvider
             visibleSlides={1}
             naturalSlideWidth={100}
             naturalSlideHeight={125}
             totalSlides={5}
             isPlaying={true}
             infinite={true}
             dragEnabled={false}
             touchEnabled={false}
             hasMasterSpinner>
            <Slider>
                <Slide index={0}><Img src={img1} /></Slide>
                <Slide index={1}><Img src={img2} /></Slide>
                <Slide index={2}><Img src={img3} /></Slide>
                <Slide index={3}><Img src={img4} /></Slide>
                <Slide index={4}><Img src={img5} /></Slide>
            </Slider>
            </CarouselProvider> */}
            <Carousel
            showIndicators={false}
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            interval={2000}
            autoPlay={true}
            showArrows={false}>
                <Image src={img1}></Image>
                <Image src={img2}></Image>
                <Image src={img3}></Image>
                <Image src={img4}></Image>
                <Image src={img5}></Image>
            </Carousel>


            </div>
        </div>
        <div>
      <div className="login-card">
        <Image src={insta}/>
      <TextField id="outlined-basic" margin='dense' size="small" fullWidth label="Email" variant="outlined" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <TextField id="outlined-basic" margin='dense' size="small" fullWidth label="Password" type="password" variant="outlined" value={password} onChange={(e)=>setPassword(e.target.value)}/>

      {
        error != '' && 
        <div style={{color:'red'}}>{error}</div>
      }
      
      
      <Button variant="contained" fullWidth component="span" style={{marginTop:'1rem'}} onClick={handleClick} disabled={loading}>
        Log In
      </Button>
      <div style={{color:'blue', marginTop:'0.5rem'}}>Forget Password ?</div>
      </div>
      <div className='bottom-card'>
        Don&apos;t Have an Account? <Link href="/signup"><span style={{color:'blue'}}>Sign Up</span></Link>
      </div>
    </div>
    </div>
  )
}

export default Index
