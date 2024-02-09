import { useState } from "react";

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

export default InputForm;
