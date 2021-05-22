import React, { useCallback, useEffect, useState } from "react";
import {uuid} from "uuidv4";
import {api} from "./services/api";

interface IData {
  id: string;
  name: string;
  price: number;
}

const App: React.FC = () => {
  const [data, setData] = useState<IData[]>([]);
  const [fruta, setFruta] = useState<string>("");
  const [frutaValue, setFrutaValue] = useState<any>();

  useEffect(() => {
    console.log(data)
    api.get("data").then(
      response => {
        setData(response.data)
      }
    )
  }, [data]);

  const convertToCurrency= useCallback(
    (value: number) => Intl.NumberFormat("pt-br", {style: "currency", currency: "BRL"}).format(value),
    [],
  )

  const addToApi= useCallback(
    () => {
      api.post("data", {
        id: uuid,
        name: fruta,
        price: frutaValue
      }).then (
        response => alert("tudo certo")
      ).catch (e => alert ("error"))
  }, [uuid, fruta, frutaValue]
  )

//  function convertToCurrency(value: number){
//   return Intl.NumberFormat("pt-br", {style: "currency", currency: "BRL"}).format(value)
//  }
  

  return (
    <div>
      <h1>Join us too:</h1>

      <ul >
      {data.map(fruta => (
        <li key={fruta.id}>
          {fruta.name} | {convertToCurrency(fruta.price)}
        </li> 
      ))}
      </ul>

      <hr/>
        <h1>{fruta}</h1>
      <hr/>

      <input type="text" onChange={e => setFruta(e.target.value)} placeholder="informe uma fruta" />
      
      <input type="number" onChange={e => setFrutaValue(parseFloat(e.target.value))} placeholder="informe um valor" />
    
      <button onClick={addToApi}>Add</button>
    </div>
  );
}

export default App;


