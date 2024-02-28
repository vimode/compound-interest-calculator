import localforage from "localforage";
import { useEffect, useState } from "react";
import "./App.css";
import InputForm from "./components/InputForm";
import OverviewBar from "./components/OverviewBar";
import QueryHistory from "./components/QueryHistory";
import StackedAreaChart from "./components/StackedAreaChart";
import { useUserQueryStore } from "./store/userQueryStore";
import { InputFormData, UserQuery } from "./types";
import { calculateInterest, compareObjects, randomUUID } from "./utils";

function App() {

  const { userQueries, setUserQueries } = useUserQueryStore((state) => {
    return { userQueries: state.userQueries, setUserQueries: state.setUserQueries}
  });

  const [chartItem, setchartItem] = useState('')

  useEffect(() => {
    let localStorageValue;
    localforage
      .getItem<UserQuery[]>("queries")
      ?.then((value) => {
        localStorageValue = value ?? [];
        setUserQueries(localStorageValue);
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
      setUserQueries([...userQueries, { id: newId, query, details: interestDetails }]);
      setchartItem(newId)
    } else {
      setchartItem(queryStatus)
    }
  }

  return (
    <div className="outer_wrapper">
      <h1 className="header">Compound Interest Calculator</h1>
      <OverviewBar data={userQueries} chartItem={chartItem}/>
      <StackedAreaChart data={userQueries} chartItem = {chartItem} />
      <InputForm addNewEntry={addNewEntry} />
      <QueryHistory userQueries={userQueries} />
      <footer>:)</footer>
    </div>
  );
}

export default App;
