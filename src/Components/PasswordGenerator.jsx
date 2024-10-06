import React, { useEffect, useState } from "react";
import "./PasswordGenerator.css";
import { MdOutlineContentCopy } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
// import Bounce from 'react-reveal/Bounce';
// npm install react-reveal

import 'react-toastify/dist/ReactToastify.css';

const lowerLetter='abcdefghijklmnopqrstuvwxyz'
const upperLetter='ABCDEFGHIJKLMNOPRSTUVWXYZ'
const numberLetter='0123456789'
const symbolLetter='!@#$%<>*&^()`~'

export default function PasswordGenerator() {
    const [password,setpassword]=useState("");
    const [lowercase,setlowercase]=useState(true)
    const [uppercase,setuppercase]=useState(true)
    const [numbers,setnumbers]=useState(true)
    const [symbols,setsymbols]=useState(true)
    const [pwdlength,setpwdlength]=useState("8")
    const [selectedChoices,setselectedChoices]=useState(['lowercase','uppercase','symbols','numbers'])

    function generatePassword(){
        let characterList=''
        if(lowercase){
            characterList += lowerLetter
        }
        if(uppercase){
            characterList += upperLetter
        }
        if(numbers){
            characterList += numberLetter
        }
        if(symbols){
            characterList += symbolLetter
        }
        
        let temp=''
        let length=characterList.length

        for(let i=0; i< pwdlength; i++){
            const index=Math.round(Math.random()*length)
            temp += characterList.charAt(index)
        }
        setpassword(temp);
    }

    // function copyPassword(){
    //     navigator.clipboard.writeText(password);
    // })}
    const copyPassword =async () => {
        const copiedText= await navigator.clipboard.readText();
        if(password.length && copiedText!==password){
            navigator.clipboard.writeText(password)
            toast.success('Password copied to clipboard', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    }

    // useEffect(()=>{
    //     generatePassword()
    // },[pwdlength])
    useEffect(()=>{
        generatePassword()
    },[pwdlength,lowercase,uppercase,numbers,symbols])


    function handleChoices(type){
        let tempChoices=selectedChoices;
        if (tempChoices.includes(type)){
            const index=tempChoices.indexOf(type);
            tempChoices.splice(index,1)
        }
        else{
            tempChoices.push(type)
        }
        console.log(tempChoices)
        setselectedChoices(tempChoices)

    }

  return (
    <>
      <div className="container">
        <h2 className="title">Strong Password Generator</h2>


        <div className="password-wrapper">
            <div className="password-area">
                <div className="password">
                    <input type="text" disabled value={password} placeholder="Click on Generate Password" />
                    <p className="icon" onClick={copyPassword}><MdOutlineContentCopy /></p>
                </div>
            </div>
        </div>

        <div className="setting">
            <h3>Customize your Password</h3>
           <div className="customize">
           <div className="checkboxes">
                <div className="left">
                    <div className="checkbox">
                        <input type="checkbox" id="lower" name="lower" checked={lowercase} disabled={selectedChoices.length===1 && selectedChoices.includes('lowercase')} onChange={()=>{handleChoices('lowercase');setlowercase(!lowercase)}}/>
                        <label htmlFor="lower">LowerCase (a-z)</label>
                    </div>
                    <div className="checkbox">
                        <input type="checkbox" id="upper" name="upper" checked={uppercase} disabled={selectedChoices.length===1 && selectedChoices.includes('uppercase')} onChange={()=>{handleChoices('uppercase');setuppercase(!uppercase)}}/>
                        <label htmlFor="upper">UpperCase (A-Z)</label>
                    </div>
                </div>
                <div className="right">
                    <div className="checkbox">
                        <input type="checkbox" id="numbers" name="numbers" checked={numbers} disabled={selectedChoices.length===1 && selectedChoices.includes('numbers')} onChange={()=>{handleChoices('numbers');setnumbers(!numbers)}}/>
                        <label htmlFor="numbers">Numbers (0-9)</label>
                    </div>
                    <div className="checkbox">
                        <input type="checkbox" id="symbols" name="symbols" checked={symbols} disabled={selectedChoices.length===1 && selectedChoices.includes('symbols')} onChange={()=>{handleChoices('symbols');setsymbols(!symbols)}}/>
                        <label htmlFor="symbols">Symbols (@#%&...)</label>
                    </div>
                </div>
            </div>
           </div>
        </div>

        <div className="pwdlength">
            <h3>Password Length</h3>
            <div className="slider">
                <p className="rangeValue">{pwdlength}</p>
                <div className="range">
                    <input type="range"  min={8} max={40} defaultValue={pwdlength} onChange={(event)=> setpwdlength(event.currentTarget.value)}/>
                </div>
            </div>
        </div>

        <div className="buttons">
            <button type="button" onClick={generatePassword}>Generate Password</button>
            <button type="button" onClick={copyPassword}>Copy Password</button>
        </div>
      </div>
      <ToastContainer />
      </>
  );
}
