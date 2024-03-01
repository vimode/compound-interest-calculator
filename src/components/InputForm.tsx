import { useState } from "react";
import { InputFormData } from "../types";

type InputFormProps = {
  addNewEntry : (formData:InputFormData) => void;
}

function InputForm({addNewEntry}:InputFormProps) {

  const [formData, setFormData] = useState({
    initialDeposit: 1000,
    rateOfInterest: 2,
    yearsOfGrowth: 5,
  });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    addNewEntry(formData)
  }

  return (
    <form className="inputForm_wrapper" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="initialDeposit">
          Initial Deposit
          <span className="visually-hidden">is required</span>
        </label>
        <input
          type="number"
          step="0.01"
          id="initialDeposit"
          name="initialDeposit"
          required
          value={formData.initialDeposit}
          onChange={handleInputChange}
          aria-required
          aria-description="initial deposit amount"
        />
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
          required
          aria-required
          aria-description="rate of interest"
        />
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
          required
          aria-required
          aria-description="years of growth"
        />
      </div>
      <button type="submit">Calculate</button>
    </form>
  );
}

export default InputForm;
