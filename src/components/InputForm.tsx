import { useState } from "react";
import { useUserQueryStore } from "../store/userQueryStore";
import { compareObjects, randomUUID } from "../utils";
import { InputFormData } from "../types";

function InputForm() {
  const { userQueries, setUserQueries } = useUserQueryStore((state) => {
    return { userQueries: state.userQueries, setUserQueries: state.setUserQueries}
  });

  const [formData, setFormData] = useState({
    initialDeposit: 1000,
    rateOfInterest: 2,
    yearsOfGrowth: 5,
  });

  const [formErrors, setformErrors] = useState({
    initialDeposit: null,
    rateOfInterest: null,
    yearsOfGrowth: null,
  });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    // console.log(userQueries)
    compareObjects(formData,userQueries)
    calculateInterest(formData);
  }

  function calculateInterest(formData: InputFormData) {
    const { initialDeposit, yearsOfGrowth, rateOfInterest } = formData;
    const decimalInterestRate = rateOfInterest / 100;

    let currentAmount = Number(initialDeposit);
    const interestDetails = [];

    // Add initial data
    interestDetails.push({
      year: 0,
      rateOfInterest: rateOfInterest,
      initialDeposit: initialDeposit,
      currentAmount: currentAmount,
      increasingInterest: 0,
    });

    for (let year = 1; year <= yearsOfGrowth; year++) {
      const interestForYear = Number(currentAmount) * Number(decimalInterestRate);

      currentAmount = Number(currentAmount) + Number(interestForYear);

      interestDetails.push({
        year,
        rateOfInterest: rateOfInterest,
        initialDeposit: initialDeposit,
        currentAmount: currentAmount,
        increasingInterest: interestForYear,
      });
    }

    const newId = randomUUID();
    const query = formData;
    setUserQueries([...userQueries, { id: newId, query, details: interestDetails }]);
  }

  return (
    <form className="inputForm_wrapper" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="initialDeposit">
          Initial Deposit
          <span className="visually-hidden">is required</span>
          {/* <span aria-hidden>*</span> */}
        </label>
        <input
          type="number"
          step="0.01"
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
          step="0.01"
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
      <button type="submit">Calculate</button>
    </form>
  );
}

export default InputForm;
