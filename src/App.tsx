import { useRef, useState } from "react"
import './App.css'

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
  )
}

export default App

function InputForm () {

  const [formErrors, setformErrors] = useState({initialDeposit:""})
  const form = useRef(null)

  function handleSubmit(event) {
    event.preventDefault()
    let formData = new FormData(form.current)
    console.log(formData)


  }

  return (
    <form ref={form} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="initialDeposit">
          Initial Deposit
          <span className="visually-hidden">is required</span>
          <span aria-hidden>*</span>
        </label>
        <input 
          type="number"
          id="initialDeposit"
          name="initial deposit"
          aria-required
          aria-invalid={!!formErrors?.initialDeposit}
          aria-errormessage={formErrors?.initialDeposit ? 'Please insert an amount' : undefined}
          aria-description='initial deposit amount'
        />
        {formErrors?.initialDeposit && (
          <span id="intial-deposit-error-message"
            aria-live="polite"
            aria-relevant="additions removals">
            {formErrors.initialDeposit}
          </span>
        )}
      </div>


    </form>
  )
}
