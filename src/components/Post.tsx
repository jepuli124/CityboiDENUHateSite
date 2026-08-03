import React, { useMemo } from 'react'
import * as CryptoJS from 'crypto-js';

interface incomingParams{
    name: string,
    text: string,
    img?: number
}

const fetchImg = (name: string,img: number) => {
        if(img > 0){
            return "https://picsum.photos/100"
        }
        return "https://picsum.photos/id/"+ randomNumber(name) +"/100"
        
    }

const randomNumber = (name: string) => {
    const hash = CryptoJS.MD5("" + "RandomLetters" + name);
    // Take the first 32-bit word as an integer
    const word = hash.words[0]; 
    // Calculate index within the options array
    const i = Math.abs(word % 1084);
    return i;
}

const Post: React.FC<incomingParams> = ({name, text, img = 0}) => {
    const imagePath = useMemo(() => fetchImg(name, img), [name, img]) 
    return (
    <div style={{display: 'flex', gap: "1rem"}}>
        <div>
         <img src={imagePath}></img>
        </div>
        <div style={{}}>
        <h2 style={{justifySelf: "left", fontFamily: "grabstein"}}>{name}</h2>
        <h3>{text}</h3>
        </div>
        
    </div>
    )
}

export default Post