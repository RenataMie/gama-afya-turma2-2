import React, { useCallback, useEffect, useState } from "react";
import { uuid } from "uuidv4";
import { api } from "./services/api";

interface IData {
  id: string;
  name: string;
  price: number;
}

const App: React.FC = () => {
  const [data, setData] = useState<IData[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [fruta, setFruta] = useState<string>("");
  const [frutaValue, setFrutaValue] = useState<any>();

  useEffect(() => {
    api.get("data").then(
      response => {
        setData(response.data)
      }
    )
  }, [isLoad]);

  const convertToCurrency= useCallback(
    (value: number) => Intl.NumberFormat("pt-br", {style: "currency", currency: "BRL"}).format(value),
    [],
  )

  const addToApi= useCallback(
    () => {
      setIsLoad(true)
      api.post("data", {
        id: uuid,
        name: fruta,
        price: frutaValue
      }).then (
        response => alert("tudo certo")
        
      ).catch (e => alert ("error")).finally(
        ()=> {setIsLoad(false)}
      )
  }, [uuid, fruta, frutaValue]
  )

//  function convertToCurrency(value: number){
//   return Intl.NumberFormat("pt-br", {style: "currency", currency: "BRL"}).format(value)
//  }
  

  return (
    <div>
      <h1>Join us too:</h1>

      <ul >
      {data.map(frut => (
        <li key={frut.id}>
          {frut.name} | {convertToCurrency(frut.price)}
        </li> 
      ))}
      </ul>

      <hr/>
        <h1>{fruta}</h1>
      <hr/>

     {isLoad ? (
       <div>
         <p>carregando...</p>
       </div>
     ): (
       <div>
          <input type="text" onChange={e => setFruta(e.target.value)} placeholder="informe uma fruta" />
      
      <input type="number" onChange={e => setFrutaValue(parseFloat(e.target.value))} placeholder="informe um valor" />
    
      <button onClick={addToApi}>Add</button>
       </div>
     )}
    </div>
  );
}

export default App;


