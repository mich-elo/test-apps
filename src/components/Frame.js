import React from 'react';
import { getTest } from '../services/axiosInit'
import  {
  Button,
  Box
} from '@mui/material'
import Image from 'next/image';

function roundToTwo(num) {
  return +(Math.round(num + "e+2")  + "e-2");
}

const carImage = '/car_black_1.png'
const roadImage ='/road.png'

export default function Frame(){

    const [score, setScore] = React.useState(10)

    const requestRef = React.useRef();
    const previousTimeRef = React.useRef();
    
    // 
    const valueCount = React.useRef();
    const baloonRef = React.useRef();

    // 
    const baloonSpeedRef = React.useRef(0);
    const baloonAccRef = React.useRef(1)
    
    // 
    const buttonTappeRef = React.useRef(false)

    // 
    const road1 = React.useRef()
    const road2 = React.useRef()

    // 

    const animate = time => {
      if(previousTimeRef.current != undefined) {
        const deltaTime = time - previousTimeRef.current;

        const space = roundToTwo((baloonSpeedRef.current * (deltaTime/10)))

        const road1Pos = parseFloat(road1.current.style.top) + space
        const road2Pos = parseFloat(road2.current.style.top) + space

        road1.current.style.top = (road1Pos ) + 'px';
        road2.current.style.top = (road2Pos ) + 'px';
        
        if(buttonTappeRef.current){
          // increase velocity
          addScore()
          if(baloonSpeedRef.current >= 8){
            baloonSpeedRef.current = 10
          }
          baloonSpeedRef.current = baloonSpeedRef.current + baloonAccRef.current
        }
        
        else{
          // decrease velocity
          if(baloonSpeedRef.current <= 0){
            baloonAccRef.current = 0
            baloonSpeedRef.current = 0
          }else{
            baloonSpeedRef.current = baloonSpeedRef.current - 0.01
          }
          
        }

        if(parseInt(road1.current.style.top) > 250){
          road1.current.style.top = (-250 + parseFloat(road2.current.style.top)) + 'px';
        }
        if(parseInt(road2.current.style.top) > 250){
          road2.current.style.top = (-250 + parseFloat(road1.current.style.top)) + 'px';
        }

        buttonTappeRef.current = false
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    }

    const addScore = ()=>{
      setScore((prev)=>(prev + 10))
    }

    const reduceScore = () => {
      if(score > 0){
        setScore((prev)=>(prev - 1))
      }
      else{
        setScore(()=>{
          return 0
        })
      }
    }
    const addVelocity = ()=>{
    
      if(baloonAccRef.current > 0.7){
        baloonAccRef.current = 0.7;
      }
      buttonTappeRef.current = true
      baloonAccRef.current = baloonAccRef.current + 0.125
    }
    
    React.useEffect(() => {
      requestRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(requestRef.current);
    }, []); // Make sure the effect runs only once
    
    return(
      <Box
      sx={{
        position:'relative',
        width:'100%',
        height:'100vh',
        display:'flex',
        justifyContent:'center'
      }}>
        <Box
        sx={{
          position:'re',
          width:300,
          height:"100%",
          backgroundColor:'#f7f7f7'
        }}>
          {/* screen */}
          <Box
          sx={{
            position:'relative',
            width:1,
            height:250,
            backgroundColor:'#b8b8b8',
            overflow:'hidden',
            backgroundColor:'#4dc951'
          }}>
            <Box>
              <span 
              style={{
                fontWeight:'normal'
              }}>score</span> :

              <span
              style={{
                fontWeight:'normal',
                color:'gold'
              }}> {score}</span>
            </Box>

            {/* moving roads */}
            <div
            ref={road1}
            style={{
              position:'absolute',
              top:-50,
              left:50,
              width:200,
              height:250,
              zIndex:5
            }}>
              <Image
              src={roadImage}
              width={200}
              height={250}
              objectFit="contain"
              />
            </div>
            <div
            ref={road2}
            style={{
              position:'absolute',
              top:200,
              left:50,
              width:200,
              height:250,
            }}>
              <Image
              src={roadImage}
              width={200}
              height={250}
              objectFit="contain"
              />
            </div>

            {/* car */}
            <div
            ref={baloonRef}
            style={{
              position:'absolute',
              top:160,
              left:123,
              width:50,
              height:50,
              zIndex:10
            }}>
              <Image
              src={carImage}
              width={50}
              height={50}
              objectFit="contain"
              />
            </div>
          </Box>
          <Box
          sx={{
            border:'1px solid red',
            position:'relative',
            width:'100%',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
          }}>
            <Button
            variant="contained"
            onClick={()=>{
              addVelocity()
            }}>
              tap
            </Button>
          </Box>
        </Box>
      </Box>
    );
}
