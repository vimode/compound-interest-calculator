import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./App.css";
import localforage from "localforage";

export function randomUUID():string {
  return self.crypto.randomUUID();
}

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
    if(userQueries.length > 0 ) {
    localforage.setItem('queries', userQueries).then( function (value) {
      console.log(value)
    }).catch(function (err) {
        console.log(err)
      }) }
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

function InputForm({calculateInterest}) {
  const [formData, setFormData] = useState({
    initialDeposit: 1000,
    rateOfInterest: 2,
    yearsOfGrowth: 1,
  });
  const [formErrors, setformErrors] = useState({
    initialDeposit: "",
    rateOfInterest: "",
    yearsOfGrowth: "",
  });


  function handleInputChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    calculateInterest(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="initialDeposit">
          Initial Deposit
          <span className="visually-hidden">is required</span>
          {/* <span aria-hidden>*</span> */}
        </label>
        <input
          type="number"
          id="initialDeposit"
          name="initialDeposit"
          value={formData.initialDeposit}
          onChange={handleInputChange}
          aria-required
          aria-invalid={!!formErrors?.initialDeposit}
          aria-errormessage={
            formErrors?.initialDeposit ? "Please insert an amount" : undefined
          }
          aria-description="initial deposit amount"
        />
        {/* {formErrors?.initialDeposit && ( */}
        {/*   <span id="intial-deposit-error-message" */}
        {/*     aria-live="polite" */}
        {/*     aria-relevant="additions removals"> */}
        {/*     {formErrors.initialDeposit} */}
        {/*   </span> */}
        {/* )} */}
      </div>

      <div>
        <label htmlFor="rateOfInterest">
          Rate of Interest
          <span className="visually-hidden">is required</span>
        </label>
        <input
          type="number"
          id="rateOfInterest"
          name="rateOfInterest"
          value={formData.rateOfInterest}
          onChange={handleInputChange}
          aria-required
          aria-invalid={!!formErrors?.rateOfInterest}
          aria-errormessage={
            formErrors?.rateOfInterest ? "Please insert an amount" : undefined
          }
          aria-description="rate of interest"
        />
        {formErrors?.rateOfInterest && (
          <span
            id="rate-of-interest-error-message"
            aria-live="polite"
            aria-relevant="additions removals"
          >
            {formErrors.rateOfInterest}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="yearsOfGrowth">
          Years of growth
          <span className="visually-hidden">is required</span>
        </label>
        <input
          type="number"
          id="yearsOfGrowth"
          name="yearsOfGrowth"
          value={formData.yearsOfGrowth}
          onChange={handleInputChange}
          aria-required
          aria-invalid={!!formErrors?.yearsOfGrowth}
          aria-errormessage={
            formErrors?.yearsOfGrowth ? "Please insert the years" : undefined
          }
          aria-description="years of growth"
        />
        {formErrors?.yearsOfGrowth && (
          <span
            id="years-of-growth-error-message"
            aria-live="polite"
            aria-relevant="additions removals"
          >
            {formErrors.yearsOfGrowth}
          </span>
        )}
      </div>
      <button>Submit</button>
    </form>
  );
}


function QueryHistory ({userQueries}) {
  return (
    <>
      <h2>History</h2>
      {userQueries.length > 0 ? (
        userQueries.map( query => (
          <div key={query.id}>
            {/* {query.details.map(item => ( */}
            {/* <p key={item.year}>year: {item.year}</p> */}
            {/* ))} */}
            <p>{query.details[query.details.length - 1].year}</p>
          </div>
        ))

      ) : <>Create some history :)</>}
    </>

  )
}
