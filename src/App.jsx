import { useEffect, useRef } from "react";
import NavBar from "./components/NavBar";
import { createApi } from "unsplash-js";
import { useState } from "react";

import Masonry from "@mui/lab/Masonry";
import "./App.css";
import Card from "./components/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import { useBockStore } from "./store/bockStore";

const api = createApi({
  // Don't forget to set your access token here!
  // See https://unsplash.com/developers
  accessKey: "sDcpoVDPnsI4xGH-stslIMDyDs2vF0hwl4olkekE13g",
});

function App() {
  const [data, setPhotosResponse] = useState([]);
  //creamos esta variable de estado para detener las peticiones en un momento
  const [hasMore, setHasMore] = useState(true)
  //utilizamos un useRef para que no vuelva a renderizar
  let index = useRef(1)
  const val = useBockStore(state => state.value);

  console.log(data);

  useEffect(() => {
    index.current = 1;
    setHasMore(true)
    api.search
      .getPhotos({ query: val, perPage: 20, page: index.current })
      .then((result) => {
        setPhotosResponse(result.response.results);
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }, [val]);

  const moreData = ()=>{
    //agregamos en uno la paginacion cada vez que llegamos al final del scroll
    index.current = index.current + 1
    //creamos esta condicion cuando la page llegue a 3 ya no siga llamando a la funcion para obtener mas images y no superar el limite de peticiones
    if(index.current === 3){
      setHasMore(false);
    }
    api.search
      .getPhotos({ query: val, perPage: 20, page: index.current })
      .then((result) => {
        setPhotosResponse(data.concat(result.response.results));
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }

  return (
    <div className="container">
      <NavBar />
      <InfiniteScroll
        dataLength={data.length} //This is important field to render the next data
        next={moreData}
        //aqui agregamos la variable de estado
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        style={{overflow: 'none'}}
      >
        <Masonry
          columns={{ xs: 2, sm: 3, md: 5 }}
          spacing={{ xs: 1, sm: 2, md: 3 }}
          className="masonry"
        >
          {data.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </Masonry>
      </InfiniteScroll>
    </div>
  );
}

export default App;
