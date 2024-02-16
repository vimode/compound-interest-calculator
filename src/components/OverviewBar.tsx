import { UserQuery } from "../types"
import DonutChart from "./DonutChart";

type OverviewBarProps = {
  data : UserQuery[];
}

function OverviewBar ({data}:OverviewBarProps) {

  const latestItem = data?.slice(-1)[0];
  const lastItem = latestItem?.details.slice(-1)[0] ||1;

  return (
    <section className="overview_wrapper">
    {data.length > 0 ? (
      <ul>
        <li>
          <p>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="none" stroke="#000000" stroke-width="2" d="M1 5h22v14H1zm1 4a3 3 0 0 0 3-3m-3 9a3 3 0 0 1 3 3m17-9a3 3 0 0 1-3-3m3 9a3 3 0 0 0-3 3m-7-2c1.657 0 3-1.79 3-4s-1.343-4-3-4s-3 1.79-3 4s1.343 4 3 4Z"></path></svg>
          </p>
          <div>
            <p>Amount</p>
            <p>{Number(lastItem.initialDeposit).toFixed(2)}</p>
          </div>
        </li>
        <li>
          <p><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="#000000" d="M15 13h1.5v2.82l2.44 1.41l-.75 1.3L15 16.69zm4-5H5v11h4.67c-.43-.91-.67-1.93-.67-3a7 7 0 0 1 7-7c1.07 0 2.09.24 3 .67zM5 21a2 2 0 0 1-2-2V5c0-1.11.89-2 2-2h1V1h2v2h8V1h2v2h1a2 2 0 0 1 2 2v6.1c1.24 1.26 2 2.99 2 4.9a7 7 0 0 1-7 7c-1.91 0-3.64-.76-4.9-2zm11-9.85A4.85 4.85 0 0 0 11.15 16c0 2.68 2.17 4.85 4.85 4.85A4.85 4.85 0 0 0 20.85 16c0-2.68-2.17-4.85-4.85-4.85"></path></svg></p>
          <div>
            <p>Time</p>
            <p>{Number(lastItem.year).toFixed(2)} yrs</p>
          </div>
        </li>
        <li>
          <p>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 256 256"><path fill="#000000" d="M184 89.57V84c0-25.08-37.83-44-88-44S8 58.92 8 84v40c0 20.89 26.25 37.49 64 42.46V172c0 25.08 37.83 44 88 44s88-18.92 88-44v-40c0-20.7-25.42-37.32-64-42.43M232 132c0 13.22-30.79 28-72 28c-3.73 0-7.43-.13-11.08-.37C170.49 151.77 184 139 184 124v-18.26c29.87 4.45 48 16.53 48 26.26M72 150.25v-23.79A183.74 183.74 0 0 0 96 128a183.74 183.74 0 0 0 24-1.54v23.79A163 163 0 0 1 96 152a163 163 0 0 1-24-1.75m96-40.32V124c0 8.39-12.41 17.4-32 22.87V123.5c12.91-3.13 23.84-7.79 32-13.57M96 56c41.21 0 72 14.78 72 28s-30.79 28-72 28s-72-14.78-72-28s30.79-28 72-28m-72 68v-14.07c8.16 5.78 19.09 10.44 32 13.57v23.37C36.41 141.4 24 132.39 24 124m64 48v-4.17c2.63.1 5.29.17 8 .17c3.88 0 7.67-.13 11.39-.35a121.92 121.92 0 0 0 12.61 3.76v23.46c-19.59-5.47-32-14.48-32-22.87m48 26.25V174.4a179.48 179.48 0 0 0 24 1.6a183.74 183.74 0 0 0 24-1.54v23.79a165.45 165.45 0 0 1-48 0m64-3.38V171.5c12.91-3.13 23.84-7.79 32-13.57V172c0 8.39-12.41 17.4-32 22.87"></path></svg>
            </p>
          <div>
            <p>Interest</p>
            <p>{Number(lastItem.increasingInterest).toFixed(2)}</p>
          </div>
        </li>
        <li>
          <p><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 512 512"><rect width="448" height="256" x="32" y="80" fill="none" stroke="#000000" stroke-linejoin="round" stroke-width="32" rx="16" ry="16" transform="rotate(180 256 208)"></rect><path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M64 384h384M96 432h320"></path><circle cx="256" cy="208" r="80" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></circle><path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M480 160a80 80 0 0 1-80-80M32 160a80 80 0 0 0 80-80m368 176a80 80 0 0 0-80 80M32 256a80 80 0 0 1 80 80"></path></svg></p>
          <div>
            <p>Total</p>
            <p>{Number(lastItem.currentAmount).toFixed(2)}</p>
          </div>
        </li>
        <li>
          {lastItem && <DonutChart data = {lastItem}/>}
        </li>
      </ul>): null}
    </section>
  )
}
export default OverviewBar
