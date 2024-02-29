import { UserQuery } from "../types";

type QueryHistoryProps = {
  userQueries: UserQuery[];
  chartItem: string;
};

function QueryHistory({ userQueries, chartItem }: QueryHistoryProps) {
  return (
    <section className="history_wrapper">
      <h2>History</h2>
      {userQueries.length > 0 ? (
        [...userQueries].reverse().map((query) => (
          <div key={query.id}>
            <HistoryItem query={query} chartItem={chartItem} />
          </div>
        ))
      ) : (
        <>Create some history 📈</>
      )}
    </section>
  );
}

export default QueryHistory;

type HistoryItemProps = {
  query: UserQuery;
  chartItem: string;
};

function HistoryItem({ query, chartItem }: HistoryItemProps) {
  const { id, details } = query;
  const lastItem = details.slice(-1)[0];

  return (
    <ul className={`historyItems_wrapper  ${chartItem === id ? 'active' : ''}`}>
      <li>{lastItem.year}</li>
      <li>{Number(lastItem.initialDeposit).toFixed(2)}</li>
      <li>{Number(lastItem.rateOfInterest).toFixed(2)}</li>
      <li>{Number(lastItem.currentAmount).toFixed(2)}</li>
    </ul>
  );
}
