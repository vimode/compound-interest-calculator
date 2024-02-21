import { useEffect } from "react";
import "./App.css";
import localforage from "localforage";
import InputForm from "./components/InputForm";
import QueryHistory from "./components/QueryHistory";
import { useUserQueryStore } from "./store/userQueryStore";
import { UserQuery } from "./types";
import StackedAreaChart from "./components/StackedAreaChart";
import OverviewBar from "./components/OverviewBar";

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
      {/* Left Graph */}
      <StackedAreaChart data={userQueries} />
      {/* Right input */}
      <InputForm />
      {/* History */}
      <QueryHistory userQueries={userQueries} />
      {/* Footer */}
      <footer>:)</footer>
    </div>
  );
}

export default App;

