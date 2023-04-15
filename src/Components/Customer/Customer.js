import { useEffect, useState } from "react"
import './Customers.scss'

const calculatePoints = (amountSpent) => {
    let calcAmount = 0

    if(amountSpent > 100) {
      calcAmount = (amountSpent - 100) *2 // 2 points for every dollar spent of $100
      calcAmount = calcAmount + 50 // 1 point for every dollar spent between 50 and 100
    } else if(amountSpent > 50) {
      calcAmount = amountSpent - 50; // 1 point for every dollar spent between 50 and 100
    }
    return calcAmount
  }
 
const Customer = (data) => {
  const[values, setValues] = useState(null)
  const custData = data.data;
  

  useEffect(()=>{
    const collection = []
    let totalAmount = 0;
    let totalPoints = 0;
    
    custData.purchases.forEach(value => {
      const points = calculatePoints(parseFloat(value))
      collection.push({amount: value, points: points})

      totalPoints = totalPoints + points;
      totalAmount = totalAmount + parseFloat(value)
    });
    setValues({'collection': collection, "totalAmount": totalAmount, "totalPoints": totalPoints})    
  },[data])


  return (
    <div className="customer">
      <div className="name">{`Name: ${custData.name}`}</div>
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
          {values ? values.collection.map(value =>{
            return(
              <tr key={value.amount * Math.random()}><td>{`$${value.amount}`}</td><td>{value.points}</td></tr>
            )
          }) : null}
          </tbody>
        </table>
      <div className="totalContainer">
        <div>
          <span>Total Amount:  </span><span>{values ? `$${values.totalAmount}` : null}</span>
        </div>
        <div>
          <span>Total Points:  </span><span>{values ? values.totalPoints : null}</span>
        </div>
      </div>
    </div>
  )
}

export default Customer