
import { useEffect, useState } from 'react';
import './App.scss';
import Customers from './Customer/Customers';
import CustomerMockData from '../Data/CustomerMockData.json'
import Loader from './Loader/Loader';



const getData = async() => {
  const waitForData = () => {
    return new Promise(resolve => {
      setTimeout(() => {
              resolve(CustomerMockData)
      }, 5000);
    });
  }
  return await waitForData()
  .then((data)=>{
      return data;
  })
}

const App = () => {
  const [customersData, setCustomersData] = useState(null);

  useEffect(()=>{
    getData()
    .then((data) => {
      setCustomersData(data.customers);
    })
  },[])

  return (
    <div className="App">
      {customersData ? <Customers data={customersData} /> : <Loader />}
    </div>
  );
}

export default App;
