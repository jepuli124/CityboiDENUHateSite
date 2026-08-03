import { useState } from 'react'

import './App.css'
import './Font.css'
import './css/button.css'
import './css/inputfield.css'
import Sparkles from './components/Sparkles'
import { getFromStore, store } from './hooks/StorageHook'
import GoogleSheetHandler from './components/GoogleSheetHandler'
import DraggableElement from './components/DraggableElement'
import GoogleFormPoster from './components/GoogleFormPoster'

const fetchHate = () => {
  const value = getFromStore("denuHateAmount")
  if(Number(value) > 0){
    return Number(value)
  }
  return 0
}

function App() {
  const [count, setCount] = useState(fetchHate())
  const [spawnParticles, setSpawnParticles] = useState<boolean>(false)
  const [displayForm, setDisplayForm] = useState<boolean>(false)

  return (
    <div style={{fontFamily: "grabstein"}}>
      <h3 >Disclaimer: this is a joke made with consent and love.</h3>
      <section id="center">
        <div className="hero" style={{display: 'flex', justifyContent: 'space-between', gap: '10%'}}>
          <div>
            <img src="./slay.png" alt="" />
            <p>Here is Slay. He HATES </p>
            <p style={{fontFamily: 'moonlitflow'}}>Denu</p>
          </div>
          <div></div>
          <div>
            <DraggableElement>
              <img src="./denu.png" alt="" />
            </DraggableElement>
            
            <p style={{fontFamily: 'moonlitflow'}}>Here is denu</p>
            <p>(you can throw him away)</p>
          </div>
          
          
        </div>
        <div>
          <h1 style={{fontFamily: 'thernaly'}}>Here we "hate" denu very much, such much</h1>
          <h1 style={{fontFamily: 'thernaly'}}>Allegedly he has 67 IQ</h1>
        </div>
        <button
          className="counter"
          onClick={() => {
            setCount((count) => {
              store("denuHateAmount", (count + 1).toString())
              return count + 1
            })
            setSpawnParticles(true)
            const timeOut = setTimeout(() => {
              setSpawnParticles(false)
              clearTimeout(timeOut)
            }, 100)
          
          }}
        >
          You hate Denu this much: {count}
        </button>
        <div style={{display: 'flex'}}>
          {Array.from({ length: Math.floor(count/25) }, (_, i) => i).map((value) => (
            <div key={value}>
              🔥
            </div>
          ))}
        </div>
      </section>
      
      <section id="spacer"></section>

      <section >
        <h1 style={{fontFamily: 'thernaly'}}>What other people have said about denu</h1>
        <br />
        <div className='posts'>
          <GoogleSheetHandler sheetId='1JGVFpSMulRW6mnYys6QYMe1Zk-Jv2hlbbscutWtpK24' WORKSHEET_GID="922221082" ></GoogleSheetHandler>
        </div>
        <h2 style={{fontFamily: "thernaly"}}>Want to comment yourself? click <a style={{fontFamily: 'thernaly', color: "#88c6f8", cursor: "pointer"}} onClick={() => setDisplayForm(old => !old)}>here</a></h2>
        {
          displayForm?
          <>
            <GoogleFormPoster></GoogleFormPoster>
          </>
          :
          <></>
        }
        
      </section>
      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Watch this guy here</h2>
          <p>He smells (allegedly), should eat some deodorant, that should help him</p>
          <ul>
            <li>
            <a href="https://www.twitch.tv/cityboidenu">Twitch</a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Support me</h2>
          <p>Here you can find me</p>
          <ul>
            <li>
              <a href="https://github.com/jepuli124" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
           
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
      {
        count >= 5 ? 
        <>
        <section>
          <img src="./QR.png" alt="" />

        </section>

        <section id="spacer"></section>
        </>
        : 

        <></>
      }
      
      <Sparkles spawnParticles={spawnParticles}></Sparkles>

    </div>
  )
}

export default App
