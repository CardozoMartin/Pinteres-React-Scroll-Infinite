

import { useEffect } from 'react';
import './App.css'
import NavBar from './components/NavBar'
import { createApi } from "unsplash-js";
import { useState } from 'react';

const api = createApi({
  // Don't forget to set your access token here!
  // See https://unsplash.com/developers
  accessKey: "sDcpoVDPnsI4xGH-stslIMDyDs2vF0hwl4olkekE13g"
});

function App() {
  const [data, setPhotosResponse] = useState(null);

console.log(data)

  useEffect(() => {
    api.search
      .getPhotos({ query: "cat", orientation: "landscape" })
      .then(result => {
        setPhotosResponse(result);
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }, []);

  return (
    <>
     <NavBar/>
    </>
  )
}

export default App
