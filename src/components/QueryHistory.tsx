function QueryHistory ({userQueries}) {
  return (
    <>
      <h2>History</h2>
      {userQueries.length > 0 ? (
        userQueries.map( query => (
          <div key={query.id}>
            <HistoryItem query = {query}/>
            <hr />
          </div>
        ))

      ) : <>Create some history :)</>}
    </>

  )
}

export default QueryHistory;

function HistoryItem ({query}) {

  let {id, details} = query;
  let lastItem = details.slice(-1)[0]

  return (
    <>
        <p>{lastItem.year}</p>
        <p>{lastItem.initialDeposit}</p>
        <p>{lastItem.rateOfInterest}</p>
        <p>{lastItem.currentAmount}</p>
    </>
  )
}
