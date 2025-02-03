// ----- hook: (usually combines well with useIntersectionObserver)

import { useState } from 'react'

const useImageOnLoad = () => {
    const [isLoaded, setIsLoaded] = useState(false)

    const handleImageOnLoad = () => setIsLoaded(true)

    const transitionStyles = {
        lowRes: {
            opacity: isLoaded ? 0 : 1,
            filter: 'blur(2px)',
            transition: 'opacity 500ms ease-out 300ms',
        },
        highRes: {
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 500ms ease-in 300ms',
        },
    }

    const imageStyles = {
        wrapper: {
            position: 'relative',
            width: '100%',
            height: '0',
        },
        image: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectPosition: 'center center',
            objectFit: 'cover',
        },
    }

    const lowResStyle = {
        ...imageStyles.image,
        ...transitionStyles.lowRes,
    }
    
    const highResStyle = {
        ...imageStyles.image,
        ...transitionStyles.highRes,
    }

    return { handleImageOnLoad, imageStyles, lowResStyle, highResStyle }
}

export default useImageOnLoad




// ----- consumer component:

// import useImageOnLoad from '../../hooks/useImageOnLoad';

// export default function ImageGrid() {
//     const { handleImageOnLoad, imageStyles, lowResStyle, highResStyle } = useImageOnLoad();
  
//     return (<>
//         {imageData.images.map((image, i) => (
//             <div key={`img-${i}`} style={imageStyles.wrapper}>                        
//                     <img 
//                         loading="lazy" 
//                         className="img-post" 
//                         src={image.img} 
//                         alt={image.alt} 
//                         width="188" 
//                         height="189" 
//                         style={lowResStyle}
//                     />

//                     {isVisible && 
//                         <img 
//                             onLoad={handleImageOnLoad} 
//                             loading="lazy" 
//                             className="img-post" 
//                             src={image.img} 
//                             alt={image.alt} 
//                             width="288" 
//                             height="289" 
//                             style={highResStyle}
//                         />
//                     }
//             </div>
//         ))}
//     </>)
// }
