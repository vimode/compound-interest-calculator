import { UserQuery } from "../types"
import DonutChart from "./DonutChart";

type OverviewBarProps = {
  data : UserQuery[];
}

function OverviewBar ({data}:OverviewBarProps) {

  const latestItem = data?.slice(-1)[0];
  const lastItem = latestItem?.details.slice(-1)[0] ||1;

  return (
    <>
    {data.length > 0 ? (
      <ul>
        <li>
          <p>i</p>
          <div>
            <p>Amount</p>
            <p>{Number(lastItem.initialDeposit).toFixed(2)}</p>
          </div>
        </li>
        <li>
          <p>i</p>
          <div>
            <p>Time</p>
            <p>{Number(lastItem.year).toFixed(2)} yrs</p>
          </div>
        </li>
        <li>
          <p>i</p>
          <div>
            <p>Interest</p>
            <p>{Number(lastItem.increasingInterest).toFixed(2)}</p>
          </div>
        </li>
        <li>
          <p>i</p>
          <div>
            <p>Total</p>
            <p>{Number(lastItem.currentAmount).toFixed(2)}</p>
          </div>
        </li>
        <li>
          {lastItem && <DonutChart data = {lastItem}/>}
        </li>
      </ul>): null}
    </>
  )
}
export default OverviewBar
