import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./App.css";
import localforage from "localforage";
import { randomUUID } from "./utils";
import InputForm from "./components/InputForm";
import QueryHistory from "./components/QueryHistory";

function App() {

  const [userQueries, setUserQueries] = useState([])

  function calculateInterest(formData) {
    const { initialDeposit, yearsOfGrowth, rateOfInterest } = formData;
    const decimalInterestRate = rateOfInterest / 100;

    let currentAmount = initialDeposit;
    const interestDetails = [];

    // Add initial data
    interestDetails.push({
      year: 0,
      rateOfInterest: rateOfInterest.toFixed(2),
      initialDeposit: initialDeposit.toFixed(2),
      currentAmount: currentAmount.toFixed(2),
      increasingInterest: "0.00",
    });

    for (let year = 1; year <= yearsOfGrowth; year++) {
      const interestForYear = currentAmount * decimalInterestRate;
      currentAmount = currentAmount + interestForYear;

      interestDetails.push({
        year,
        rateOfInterest: rateOfInterest.toFixed(2),
        initialDeposit: initialDeposit.toFixed(2),
        currentAmount: currentAmount.toFixed(2),
        increasingInterest: (currentAmount - initialDeposit).toFixed(2),
      });
    }

    const newId = randomUUID()
    setUserQueries([...userQueries, {id: newId, details:interestDetails}]);
  }

  useEffect(() => {
    let localStorageValue;
    localforage.getItem('queries')?.then(function (value) {
      localStorageValue = value ?? [];
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
      {/* Right input */}
      <InputForm calculateInterest={calculateInterest}/>
      {/* History */}
      <QueryHistory userQueries={userQueries} />
      {/* Footer */}
    </>
  );
}

export default App;



