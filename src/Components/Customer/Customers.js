import { useState } from "react";
import Customer from "./Customer";
import './Customers.scss'

const Customers = (customersData) => {
  const [current, setCurrent] = useState(0)

  const btnPushed = (evt) => {
    const btn = evt.target.firstChild.data;
    if(btn === ">") {
      if(current < customersData.data.length -1){
        setCurrent(current + 1)
      }
    }else{
      if(current > 0){
        setCurrent(current -1)
      }
    }
  }

  return (
    <div>
    <div className="customers">
      <header className="App-header">
        Retail Rewards
      </header>
      <Customer data={customersData.data[current]} />
      <div className="buttons">
        <button disabled={current === 0} className="button" onClick={btnPushed}>{"<"}</button>
        <button disabled={current === customersData.data.length -1} className="button" onClick={btnPushed}>{">"}</button>
      </div>
    </div>
    <div style={{marginTop:"10px", alignItems:"flex-start", fontStyle:"italic", fontSize:"12px"}} className="customers">
      Note: React and Sass are the only libraries used.
    </div>
    </div>
  )
}

export default Customers;