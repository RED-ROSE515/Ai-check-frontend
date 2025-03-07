// ----- hook:

import { useEffect, useLayoutEffect, useState } from 'react'

export default function useLockBodyScroll() {
    const [locked, setLocked] = useState(false);

    useLayoutEffect(() => {
        if (!locked) {
            return
        }
        const originalOverflow = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';
        return () => document.body.style.overflow = originalOverflow;
    }, [locked]); 


    useEffect(() => {
        if (locked) {
            setLocked(true)
        }
    }, [locked])

    return [locked, setLocked];
}



// ----- component consumer:

// import React, {useState} from 'react';
// import useLockBodyScroll from '../hooks/useLockBodyScroll';

// export default function Popup() {
//     const [hidden, setHidden] = useState(true);
//     const [locked, setLocked] = useLockBodyScroll();

//     const toggleMenu = () => hidden ? setHidden(false) : setHidden(true);
//     const toggleLocked = () => locked ? setLocked(false) : setLocked(true);

//     return (<>
//         {!hidden &&
//             <div className={`popup ${hidden ? '' : 'appear'}`}>
//                 <p>Popup Title here</p>
//             </div>
//         }

//         <button className={`menuBtn ${hidden ? '' : 'open'}`} onClick={() => {toggleMenu(); toggleLocked();}}>
//             {hidden ? 'Menu' : 'Close'}    
//         </button>        
//     </>)
// }
