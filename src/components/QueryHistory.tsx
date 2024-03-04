import { UserQuery } from "../types";

type QueryHistoryProps = {
  userQueries: UserQuery[];
  chartItem: string;
  setchartItem: (value: UserQuery) => void;
};

function QueryHistory({ userQueries, chartItem, setchartItem }: QueryHistoryProps) {

  function updateChartItem(id: string) {
    const lastItem = userQueries.filter(item => item.id === id)[0]
    setchartItem(lastItem)
  }

  return (
    <section className="history_wrapper">
      <h2>History</h2>
      {userQueries.length > 0 ? (
        [...userQueries].reverse().map((query) => (
          <div key={query.id} onClick={() => updateChartItem((query.id))}>
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

  const itemData = {
    amount: new Intl.NumberFormat("currency", { maximumFractionDigits: 0 }).format(lastItem.initialDeposit),
    years: new Intl.NumberFormat("en-US", { unit: "year", unitDisplay: "short", maximumFractionDigits: 0 }).format(lastItem.year),
    interest: new Intl.NumberFormat("currency", { maximumFractionDigits: 0 }).format(lastItem.rateOfInterest),
    total: new Intl.NumberFormat("currency", { maximumFractionDigits: 0 }).format(lastItem.currentAmount),
  }

  return (
    <ul className={`historyItems_wrapper  ${chartItem === id ? 'active' : ''}`}>
      <li>{itemData.amount}</li>
      <li>{itemData.years} yrs</li>
      <li>{itemData.interest}%</li>
      <li>{itemData.total}</li>
    </ul>
  );
}
