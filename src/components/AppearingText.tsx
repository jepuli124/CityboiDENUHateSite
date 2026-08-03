import React, { useEffect, useRef } from 'react'
import {animate, createScope, splitText, stagger, type Scope} from 'animejs'

interface incomingParams{
    givenText: string
    below?: boolean
}

const AppearingText: React.FC<incomingParams> = ({givenText = "", below = false}) => {
    
    const AnimRefPoint = useRef<HTMLDivElement>(null);
    const scope = useRef<Scope>(null);
    
    useEffect(() => {
    
    scope.current = createScope({ root: AnimRefPoint }).add( self => {
        if(!self){ return }
        const { chars } = splitText('p', { words: false, chars: true });

        animate(chars, {
        // Property keyframes
        y: [
            { to: below ? '2.75rem':'-2.75rem', ease: 'outExpo', duration: 600 },
            { to: 0, ease: 'outBounce', duration: 800, delay: 100 }
        ],
        opacity: [
            { from: 0, to: 1, ease: 'inOutCirc', duration: 1600 },
            { to: 0.95, ease: 'outBounce', duration: 800, delay: 100 }
        ],
        // Property specific parameters
        rotate: {
            from: '-1turn',
            delay: 0
        },
        delay: stagger(50),
        ease: 'inOutCirc',
        loop: false
        });
    });
    
    return () => {
        if(scope.current){ scope.current.revert() }
    }
    }, []);
    
    //Remember to add ref={AnimRefPoint} to 
    //Some div to set where the animation can happen.
    return (
    <div ref={AnimRefPoint}>
        <p>{givenText}</p>
    </div>
    )
}

export default AppearingText