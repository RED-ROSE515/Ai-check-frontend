// ----- hook:

import { useRef } from "react";

export default function useSmoothScroll() {
  const ref = useRef();
  const smoothScroll = () => ref.current.scrollIntoView({ behavior: "smooth" });

  return [ref, smoothScroll];
};




// ----- consumer component:

// import useSmoothScroll from "./hooks/useSmoothScroll";

// function App() {
//   const [refToScroll, smoothScroll] = useSmoothScroll();
//   const [topRef, smoothScrollToTop] = useSmoothScroll();

//   return (
//     <div className="App">
//       <button ref={topRef} onClick={smoothScroll}>
//         Scroll
//       </button>
//       <div style={{ marginTop: "150vh" }} ref={refToScroll}>
//         I wanna be seen
//       </div>
//       <button onClick={smoothScrollToTop}>Go UP</button>
//     </div>
//   );
// }

// export default App;
