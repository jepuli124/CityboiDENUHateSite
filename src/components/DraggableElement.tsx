import { createDraggable, createScope, type Scope } from 'animejs';
import React, { useEffect, useRef, type ReactNode } from 'react'

interface incomingParams{
    children: ReactNode,
    container?: boolean

}

const DraggableElement: React.FC<incomingParams> = ({children, container}) => {

    const AnimRefPoint = useRef<HTMLDivElement>(null);
    const scope = useRef<Scope>(null);

    useEffect(() => {
    
    scope.current = createScope({ root: AnimRefPoint }).add( self => {
        if(!self){ return }
        createDraggable('.dragDiv', {
            container: container ? [0, 0, 0, 0] : undefined,
            containerFriction: 0,

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

        <div className='dragDiv' draggable={true}>
            {children}
        </div>
        
    </div>
    )
}

export default DraggableElement