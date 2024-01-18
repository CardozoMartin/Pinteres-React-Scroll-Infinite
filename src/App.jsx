

import { useEffect } from 'react';
import NavBar from './components/NavBar'
import { createApi } from "unsplash-js";
import { useState } from 'react';

import Masonry from '@mui/lab/Masonry';
import './App.css'



const api = createApi({
  // Don't forget to set your access token here!
  // See https://unsplash.com/developers
  accessKey: "sDcpoVDPnsI4xGH-stslIMDyDs2vF0hwl4olkekE13g"
});

function App() {
  const [data, setPhotosResponse] = useState([]);

console.log(data)

  useEffect(() => {
    api.search
      .getPhotos({ query: "perros" })
      .then(result => {
        setPhotosResponse(result.response.results);
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }, []);

  return (
    <div className=''>
     <NavBar/>
     <Masonry columns={4} spacing={2}>
     {data.map(item=> (
       <img key={item.id} src={item.urls.thumb} alt={item.description} />
       ))}
     </Masonry>
    </div>
  )
}

export default App
