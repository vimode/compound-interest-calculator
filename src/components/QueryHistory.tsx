import { UserQuery } from "../types";

type QueryHistoryProps = {
  userQueries: UserQuery[];
}

function QueryHistory ({userQueries}:QueryHistoryProps) {
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

      ) : <>Create some history 📈</>}
    </>

  )
}

export default QueryHistory;

type HistyorItemProps = {
  query : UserQuery;
}

function HistoryItem ({query}:HistyorItemProps) {

  const {details} = query;
  const lastItem = details.slice(-1)[0]

  return (
    <>
        <p>{lastItem.year}</p>
        <p>{lastItem.initialDeposit}</p>
        <p>{lastItem.rateOfInterest}</p>
        <p>{lastItem.currentAmount}</p>
    </>
  )
}
