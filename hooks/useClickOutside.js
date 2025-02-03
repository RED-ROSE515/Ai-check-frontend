// --- hook:

import { useState, useEffect, useRef } from "react";

function useClickOutside(ref, handler) {
  
  useEffect(
    () => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) { // Do nothing if clicking ref's element or descendent elements
          return;
        }
        handler(event);
      };
      
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    
    // Add ref and handler to effect dependencies
    // because passed in handler is a new function on every render that will cause this effect callback/cleanup to run every render.
    // so you can optimize by wrapping the handler in useCallback before passing it into this hook.
    
    [ref, handler]
  );
}



// --- Consumer Component:

// function App() {
//   // Create a ref that we add to the element for which we want to detect outside clicks
//   const ref = useRef();
//   // State for our modal
//   const [isModalOpen, setModalOpen] = useState(false);
//   // Call hook passing in the ref and a function to call on outside click
//   useClickOutside(ref, () => setModalOpen(false));
//   return (
//     <div>
//       {isModalOpen ? (
//         <div ref={ref}>
//           👋 Hey, I'm a modal. Click anywhere outside of me to close.
//         </div>
//       ) : (
//         <button onClick={() => setModalOpen(true)}>Open Modal</button>
//       )}
//     </div>
//   );
// }
