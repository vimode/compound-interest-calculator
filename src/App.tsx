import localforage from "localforage";
import { useEffect } from "react";
import "./App.css";
import InputForm from "./components/InputForm";
import OverviewBar from "./components/OverviewBar";
import QueryHistory from "./components/QueryHistory";
import StackedAreaChart from "./components/StackedAreaChart";
import { useUserQueryStore } from "./store/userQueryStore";
import { UserQuery } from "./types";

function App() {
  const { userQueries, setUserQueries } = useUserQueryStore();

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

  return (
    <div className="outer_wrapper">
      <h1 className="header">Compound Interest Calculator</h1>
      <OverviewBar data={userQueries} />
      <StackedAreaChart data={userQueries} />
      <InputForm />
      <QueryHistory userQueries={userQueries} />
      <footer>:)</footer>
    </div>
  );
}

export default App;
