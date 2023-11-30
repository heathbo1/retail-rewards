
const Table = (data) => {

  if (data.data) {
    return (
      <div id="tableContainer">
        <table id="table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>{data.data[0].pointsPerMonth[0].month}</th>
              <th>{data.data[0].pointsPerMonth[1].month}</th>
              <th>{data.data[0].pointsPerMonth[2].month}</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map(element => {
              return (
                <tr key={element.customerId}>
                  <td>{element.name}</td>
                  <td>{element.pointsPerMonth[0].points}</td>
                  <td>{element.pointsPerMonth[1].points}</td>
                  <td>{element.pointsPerMonth[2].points}</td>
                  <td>{element.totalPoints}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
  return (<div>Loading...</div>)
}

export default Table;