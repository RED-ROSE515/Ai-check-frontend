// ----- hook:

import {useEffect, useState} from 'react';

export default function useDeviceCheck() {
    const [isMobile, setMobile] = useState(false);

    useEffect(() => {
        const userAgent = typeof navigator === "undefined" ? "" : navigator.userAgent;

        console.log(`user's device is: ${window.navigator.userAgent}`);

        const mobile = Boolean(
            userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)
        );

        setMobile(mobile);
    }, []);

    return { isMobile };
}



// ----- consumer component:

// import React from "react";
// import useDeviceCheck from "../hooks/useDeviceCheck";

// function ComponentName() {
//   const { isMobile } = useDeviceCheck();

//   return (
//     <>
//       {!isMobile && <StickyHeader {...courseData} />}
//     </>
//   );
// }
