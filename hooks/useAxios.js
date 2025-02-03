// --- hook:

import {useState, useEffect} from 'react';
import axios from 'axios';

export default function useAxios(url) {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const loading = !data && !error;

    useEffect(() => {
        axios.get(url).then((response) => {
            setData(response.data);
        }).catch(error => {
            setError(error);
            console.log(error, 'oops, the request is not working at the moment')
        });
    }, [url]);

    return {
        data,
        loading,
        error
    }
}



// --- Consumer Component:

// import React, {useState, useEffect} from 'react';
// import useAxios from "../hooks/useAxios";
// const API_KEY = '';

// export default function ComponentName(url) {
//     const url = `https://api.openweathermap.org/data/2.5/onecall?&units=imperial&lat=${position.lat}&lon=${position.long}&exclude=daily&appid=${API_KEY}`;
//     const {data, loading, error} = useAxios(url);
//     if (loading || !data) return '...';
//     if (error) return '';
    
//     return (<>
//         <div className="data-container">
//             {data.current.temp}
//         </div>
//     </>)
// }
