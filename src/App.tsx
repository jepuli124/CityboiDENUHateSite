import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero" style={{display: 'flex', justifyContent: 'space-between', gap: '10%'}}>
          <div>
            <img src="./slay.png" alt="" />
            <p>Here is Slay. He HATES </p>
            <p style={{fontFamily: 'moonlitflow'}}>Denu</p>
          </div>
          <div></div>
          <div>
            <img src="./denu.png" alt="" />
            <p style={{fontFamily: 'moonlitflow'}}>Here is denu</p>
          </div>
          
          
        </div>
        <div>
          <h1 style={{fontFamily: 'thernaly'}}>Here we "hate" denu very much, such wow</h1>
        </div>
        <button
          className="counter"
          onClick={() => {
            setCount((count) => count + 1)

          
          }}
        >
          You hate Denu this much: {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Watch this guy here</h2>
          <p>He smells, should eat some deodorant</p>
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
    </>
  )
}

export default App
