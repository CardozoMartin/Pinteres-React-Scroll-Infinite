import { useState } from "react"
import Logo from "./icon/Logo"
import { useBockStore } from "../store/bockStore"


const NavBar = () => {
  const [value, setValue] = useState("cat")
  const updateValue = useBockStore(state => state.updateValue);

  const handleKey = (e)=>{
    if(e.key === "Enter"){
      //console.log('pres enter', value)
      updateValue(value);
    }
  }
  return (
    <header>
        <ul>
            <li><a href=""><Logo/></a></li>
            <li><a href="">Inicio</a></li>
            <li><a href="">Hoy</a></li>
            <li><a href="">Crear</a></li>
            <li>
              <input type="search"
              placeholder="search"
              onChange={e=>setValue(e.target.value)}
              onKeyDown={handleKey}
              />
              </li>
            <li><a href="">User</a></li>
        </ul>
    </header>
  )
}

export default NavBar