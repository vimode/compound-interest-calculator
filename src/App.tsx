import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./App.css";

function App() {
  return (
    <>
      <h1>Compound Interest Calculator</h1>
      {/* Header */}
      {/* Left Graph */}
      {/* Right input */}
      <InputForm />
      {/* History */}
      {/* Footer */}
    </>
  );
}

export default App;

function InputForm() {
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

  function calculateInterest(formData) {
    const { initialDeposit, yearsOfGrowth, rateOfInterest } = formData;
    const decimalInterestRate = rateOfInterest / 100;

    let currentAmount = initialDeposit;
    let interestDetails = [];

    // Add initial data
    interestDetails.push({
      year: 0,
      initialDeposit: initialDeposit.toFixed(2),
      currentAmount: currentAmount.toFixed(2),
      increasingInterest: "0.00",
    });

    for (let year = 1; year <= yearsOfGrowth; year++) {
      const interestForYear = currentAmount * decimalInterestRate;
      currentAmount = currentAmount + interestForYear;

      interestDetails.push({
        year,
        initialDeposit: initialDeposit.toFixed(2),
        currentAmount: currentAmount.toFixed(2),
        increasingInterest: (currentAmount - initialDeposit).toFixed(2),
      });
    }
    console.log(interestDetails);
  }

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
