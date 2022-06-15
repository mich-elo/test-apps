import React, { useEffect, useState, useRef } from 'react'
import { Box } from '@mui/material'


export default function MovingBackground(){
    const [inputValue, setInputValue] = useState("This is default text");
    const baloonRef = useRef<HTMLElement>()!
    const [animationID, setAnimationID] = useState<any>()

    function repeatOften() {
        // Do whatever
        const baloonEl = baloonRef.current!
        baloonEl.style.width = (parseFloat(baloonEl.style.width) + 1) + 'px'

        if(parseFloat(baloonEl.style.width) === 500){
            console.log("Animation is done")
            cancelAnimationFrame(animationID)
            return;
        }

       setAnimationID(requestAnimationFrame(repeatOften))
    }

    const handleChange = (e:any)=>{
        setInputValue(e.target.value)
        requestAnimationFrame(repeatOften);
    }

    useEffect(()=>{
        
    },[])

    return(
        <>
            <h1 className="text-center font-medium text-2xl">
                Gamefied &#128512;
            </h1>

            <div
            ref={baloonRef}
            style={{
                position:'absolute',
                width:50,
                height:50,
                backgroundColor:'green'
            }}/>
            <Box className="flex justify-center">
                <Box
                sx={{
                    position:'relative',
                    textAlign:'center',
                    width:300,
                    marginTop:30
                }}>
                    <input
                    className="w-full border-2 border-black rounded-md focus:bg-sky-700" 
                    type="text"
                    onChange={handleChange}
                    value={inputValue}
                    />
                    {animationID}
                </Box>  
                
            </Box>
        </>
    );  
}