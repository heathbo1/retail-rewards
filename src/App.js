import { useEffect, useState } from 'react';
import './App.css';
import Table from './Table';
import mockdata from './mockdata.json';

function App() {
  const [rewards, setRewards] = useState(null);

  const getData = async () => {
    const data = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockdata);
      }, 2000);
    })

    return data;
  }

  const processData = (data) => {
    const customers = []; // collection of processed customers

    const calculatePoints = (amount) => {
      const amountNum = Number(amount);
      let totalPoints = 0;

      if (amountNum > 100) {
        totalPoints += ((amountNum - 100) * 2);

        if ((amountNum - 100) > 50) {
          totalPoints += amountNum - 150;
        }

      } else if (amountNum > 50) {
        totalPoints += amountNum - 50;
      }
      return totalPoints;
    }

    const keys = Object.keys(data);
    keys.forEach((month) => {
      data[month].forEach((transaction) => {

        const purchase = {
          "month": month,
          "amount": transaction.amount
        }

        const points = calculatePoints(transaction.amount)

        const index = customers.findIndex((customer) => customer.customerId === transaction.customerId)

        if (index === -1) { // didn't find customer

          const newCustomer = {
            "customerId": transaction.customerId,
            "name": transaction.name,
            "pointsPerMonth": [
              {
                "month": month,
                "points": points
              }
            ],
            "purchases": [purchase],
            "totalPoints": points
          }

          customers.push(newCustomer)

        } else {
          customers[index].purchases.push(purchase)
          customers[index].totalPoints += points;

          const monthIndex = customers[index].pointsPerMonth.findIndex(m => m.month === month)

          if (monthIndex === -1) { // didn't find month
            const newPoints = {
              "month": month,
              "points": points
            }
            customers[index].pointsPerMonth.push(newPoints);
          } else {
            customers[index].pointsPerMonth[monthIndex].points += points
          }
        }
      })
    })

    return customers;
  }

  useEffect(() => {
    getData().then((d) => {
      const data = processData(d)
      setRewards(data)
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        RETAIL OFFERS & REWARDS PROGRAM
      </header>
      <div>
        <Table data={rewards} />
      </div>
    </div>
  );
}

export default App;
