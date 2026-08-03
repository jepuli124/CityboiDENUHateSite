import React, { useState } from 'react'
import eventBusHandler from '../hooks/EventBus'
import AppearingText from './AppearingText'

interface incomingParams{
}

//Things that will ne be changed when copied:
const URL = "https://script.google.com/macros/s/AKfycbyh0fWFSLrYOhdDCtMlFRvjVWlIObQMZ5qZd7jfq2m5QKklnN0uJVRiyPStcYpn7WZD8g/exec" //script url
const entry1 = "entry.416784514" // these are individual fields that need to be copied from the actual google from's form response payload
const entry2 = "entry.181492766"


const formPost = async (form: HTMLFormElement) => {
    //Original from https://github.com/jsdevel/google-form/blob/master/google-form.js but changed to fetch and used with URLsearchParams suggested by qwen AI. 
    //And due to CORS, It uses a google script web app as middleman.

     try {
        const tempdata = new FormData(form)
        const params = new URLSearchParams(); 
        
        tempdata.forEach((value, name) => {
            if (value instanceof File) {
                params.append(name, value.name); // Adjust if you need file content
            } else {
                params.append(name, String(value));
            }
            });
        const data = params.toString();

        const response = await fetch(URL, {
        method: 'POST',
        headers: {
            Accept: 'application/xml, text/xml, */*; q=0.01',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: data
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        } catch (err) {
            console.error('Form failed:', err);

        }
    
    return false;
  
}

const GoogleFormPoster: React.FC<incomingParams> = () => {
    const [showLoading, setShowLoading] = useState<boolean>(false) 
    return (
    <div>
        <div>
            <form 
            method="POST"
            action={URL}
            onSubmit={(e) => {
                e.preventDefault()
                formPost(e.target)
                setShowLoading(true)
                setTimeout(() => {
                    eventBusHandler.publish("GoogleFormSent", "ack")
                    e.target.reset()
                    setShowLoading(false)
                }, 2500)
            }}
            >
                

                {showLoading ?
                <h3><AppearingText givenText='Posting'/></h3>
                
                :
                <>
                    <input type="text" placeholder='Nickname?' name={entry1} />
                    <input type="text" placeholder='Comment' name={entry2} />
                    <input type="submit" value="Add comment" />
                </>
                }
                
            </form>
            <p>Your post might take some time before loading!</p>
        </div>
    </div>
    )
}

export default GoogleFormPoster