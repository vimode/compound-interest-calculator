import { UserQuery } from "../types";

type QueryHistoryProps = {
  userQueries: UserQuery[];
}

function QueryHistory ({userQueries}:QueryHistoryProps) {
  return (
    <section className="history_wrapper">
      <h2>History</h2>
      {userQueries.length > 0 ? (
        userQueries.map( query => (
          <div key={query.id}>
            <HistoryItem query = {query}/>
            <hr />
          </div>
        ))

      ) : <>Create some history 📈</>}
    </section>

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
    <div className="historyItems_wrapper">
        <p>{lastItem.year}</p>
        <p>{Number(lastItem.initialDeposit).toFixed(2)}</p>
        <p>{Number(lastItem.rateOfInterest).toFixed(2)}</p>
        <p>{Number(lastItem.currentAmount).toFixed(2)}</p>
    </div>
  )
}
