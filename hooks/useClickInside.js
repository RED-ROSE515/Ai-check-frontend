// --- hook

import {useEffect} from 'react';

const useClickInside = (ref, callback) => {
  
  const handleClick = e => {
    if (ref.current && ref.current.contains(e.target)) {
     callback(); 
    }
  }
  
  useEffect(() => {
    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('click', handleClick);
    }
  })
}

export default useClickInside



// --- consumer component

import {useRef} from 'react';
import useClickInside from '../hooks/useClickInside';

const HitBox = ({onClickInside}) => {
  const clickRef = useRef();
  
  useClickInside(clickRef, onClickInside);
  
  return (
    <div className="box" ref={clickRef}>
      <p>Don't hit the box</p>
    </div>
  );
}

export default Hitbox
