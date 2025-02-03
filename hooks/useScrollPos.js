// --- Hook:

import { useLayoutEffect, useState } from "react";

export const useScrollPos = () => {
  const [scrollPos, setScrollPos] = useState({
    x: 0,
    y: 0
  });

  useLayoutEffect(() => {
    const getScrollPos = () =>
      setScrollPos({
        x: window.pageXOffset,
        y: window.pageYOffset
      });

    window.addEventListener("scroll", getScrollPos);

    return () => window.removeEventListener("scroll", getScrollPos);
  }, []);

  return (
    <span>
      X: {scrollPos.x} <br />
      Y: {scrollPos.y}
    </span>
  );
};


// --- Consumer Component:

// import { useScrollPos } from "./useScrollPos";

// const App = () => {
//   const scrollPos = useScrollPos();
//   console.log(scrollPos.x, scrollPos.y);

//   return (
    // <div>
    //   <p>
    //     your scroll position is: <br/>
    //     {scrollPos}
    //   </p>
    // </div>
//   );
// };
// export default App;
