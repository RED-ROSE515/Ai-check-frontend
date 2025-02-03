// ----- hook

import {useState, useEffect} from 'react';

export default function useFetch(url, options) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response= await fetch(url);
                const result = await response.json();
                setData(result);
            } catch(error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);

    return {data, loading, error};
}



// ---- consumer component

import useFetch from '../hooks/useFetch';

const FetchData = (props) => {
    const {data, loading, error} = useFetch('https://urlgoeshere', {});

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const thing = resp.response.name;
    return (
       <ul>{data?.map(thing => <li key={thing.id}>{thing.name}</li>)}</ul>
    )
}




// --- or another way






// ---- hook

import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);

  return [data];
};

export default useFetch;



// ---- consumer component

import useFetch from "./useFetch";

const Home = () => {
  const [data] = useFetch("https://jsonplaceholder.typicode.com/todos");

  return (
    <>
      {data &&
        data.map((item) => {
          return <p key={item.id}>{item.title}</p>;
        })}
    </>
  );
};

export default Home;
