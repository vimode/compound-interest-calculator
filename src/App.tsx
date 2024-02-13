import { useEffect} from "react";
import "./App.css";
import localforage from "localforage";
import InputForm from "./components/InputForm";
import QueryHistory from "./components/QueryHistory";
import { useUserQueryStore } from "./store/userQueryStore";
import { UserQuery } from "./types";
import StackedAreaChart from "./components/StackedAreaChart";

function App() {

  const {userQueries, setUserQueries} = useUserQueryStore()

  useEffect(() => {
    let localStorageValue;
    localforage.getItem<UserQuery[]>('queries')?.then((value) => {
      localStorageValue = value ?? [] ;
      setUserQueries(localStorageValue)
    }).catch(function(err) {
        console.log(err)
    })
  },[])

  useEffect(() => {
    if(userQueries.length > 0 ) localforage.setItem('queries', userQueries);
  }, [userQueries])

  return (
    <>
      <h1>Compound Interest Calculator</h1>
      {/* Header */}
      {/* Left Graph */}
      <StackedAreaChart data = {userQueries}/>
      {/* Right input */}
      <InputForm />
      {/* History */}
      <QueryHistory userQueries={userQueries} />
      {/* Footer */}
    </>
  );
}

export default App;
