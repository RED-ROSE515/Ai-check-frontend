// ----- hook:

import { useRef, useEffect, useState } from 'react'

const useIntersectionObserver = elementRef => {
  const observer = useRef();
  const [entry, setEntry] = useState();

  const updateEntry = entries => {
    setEntry(entries[0])
  }

  useEffect(() => {
    
    const options = {
      threshold: 0.1,
      root: null,
      rootMargin: '0%',
    }

    const node = elementRef?.current
    if (!node) return
    if (observer.current) observer.current.disconnect()
    
    observer.current = new IntersectionObserver(updateEntry, options)
    const { current: currentObserver } = observer
    currentObserver.observe(node)

    return () => currentObserver.disconnect()
    
  }, [elementRef])

  return { isVisible: !!entry?.isIntersecting, entry }
}

export default useIntersectionObserver



// ----- consumer component

// import useIntersectionObserver from '../../hooks/useIntersectionObserver';

// export default function ComponentName() {
//     const imageRef = useRef();
//     const { isVisible } = useIntersectionObserver(imageRef);
  
//     return (
//       <div className="image-grid-container" ref={imageRef}>
//         {imageData.map((image, i) => (
//           <div key={`image-${i}`} className="image-wrapper">
//             {isVisible && 
//                 <img 
//                     loading="lazy" 
//                     className="img-post" 
//                     src={image.img} 
//                     alt={image.alt} 
//                     width="288" 
//                     height="289" 
//                 />
//             }
//           </div>
//         ))}
//       </div>
//     )
// }
