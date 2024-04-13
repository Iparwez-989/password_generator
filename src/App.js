import React, { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
function App() {
  const[length,setlength]= useState(8);
  const[numAllow,setnumAllow]=useState(false);
  const[charAllow,setCharAllow]=useState(false)
  const[password,setPassword]=useState("")

  const passwordRef = useRef(null)
  // function handleCopy(){
  //   passwordRef.current?.select();
  //   window.navigator.clipboard.writeText(password)
  // } // both handle copy function are same
  const handleCopy = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])
  const passwordGenerator = useCallback( ()=>{
    let pass= "";
    let str ="QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"

    if(numAllow) str+="0123456789"
    if(charAllow) str+="~!@#$%^&*()_+{}[]"

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
      console.log(pass)
      
    }
    setPassword(pass)
  },[length,numAllow,charAllow,setPassword])

useEffect(()=>{
  passwordGenerator()},
  [length,numAllow,charAllow,passwordGenerator]
)

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 bg-gray-600'>
        <h1 className='text-center text-2xl'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4 '>
          <input type="text"
          value={password}
          className="outline-none w-full text-xl py-1 px-3 "
          placeholder='Password'
          readOnly
          ref={passwordRef}
          />
            <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
            onClick={()=> handleCopy()}>Copy</button>

        </div>
        <div className='flex text-md gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
            type="range"
            min={6} 
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e)=>setlength(e.target.value)}
            />
            <label>length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={numAllow}
            id="num"
            onChange={()=>setnumAllow((prev)=> !prev)}
            />
            <label className='text-sm'>Allow Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={charAllow}
            id="char"
            onChange={()=>setCharAllow((prev)=> !prev)}
            />
            <label className='text-sm'>Allow Characters</label>
          </div>

        </div>

        </div>    
    
    
    </>
  )
}

export default App
