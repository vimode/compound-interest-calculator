import localforage from "localforage";
import { useEffect, useState } from "react";
import "./App.css";
import InputForm from "./components/InputForm";
import OverviewBar from "./components/OverviewBar";
import QueryHistory from "./components/QueryHistory";
import StackedAreaChart from "./components/StackedAreaChart";
import { useUserQueryStore } from "./store/userQueryStore";
import { InputFormData, UserQuery } from "./types";
import { calculateInterest, chartDummyData, compareObjects, randomUUID } from "./utils";

function App() {

  const { userQueries, setUserQueries } = useUserQueryStore((state) => {
    return { userQueries: state.userQueries, setUserQueries: state.setUserQueries}
  });

  const [chartItem, setchartItem] = useState<UserQuery>(chartDummyData)

  useEffect(() => {
    let localStorageValue;
    localforage
      .getItem<UserQuery[]>("queries")
      .then((value) => {
        localStorageValue = value ?? [];
        setUserQueries(localStorageValue);
        setchartItem(localStorageValue.slice(-1)[0] ?? chartDummyData)
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (userQueries.length > 0) localforage.setItem("queries", userQueries);
  }, [userQueries]);

  
  // New User Query
  function addNewEntry(formData:InputFormData) {
    const queryStatus = compareObjects(formData,userQueries)
    if(!queryStatus) {
      const interestDetails = calculateInterest(formData)
      const newId = randomUUID();
      const query = formData;
      const newItem:UserQuery = {id:newId, query, details: interestDetails}
      setUserQueries([...userQueries, newItem ]);
      setchartItem(newItem)
    } else {
      const lastItem = userQueries.filter(item =>  item.id === queryStatus)[0]
      setchartItem(lastItem)
    }
  }

  return (
    <div className="outer_wrapper">
      <section className="header">
        <h1>Compound Interest Calculator</h1>
        <p>See how your savings can grow with compound interest.</p>
      </section>
      <OverviewBar chartItem={chartItem}/>
      <StackedAreaChart chartItem = {chartItem} />
      <InputForm addNewEntry={addNewEntry} />
      <QueryHistory userQueries={userQueries} chartItem={chartItem.id} setchartItem={setchartItem} />
      <footer>Built with <a href="https://github.com/vimode/compound-interest-calculator">React and D3.js</a></footer>
    </div>
  );
}

export default App;
