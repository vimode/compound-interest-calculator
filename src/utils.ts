import { InputFormData, InterestDetails, UserQuery } from "./types";

// Generate a random UUID
export function randomUUID(): string {
  return self.crypto.randomUUID();
}

// Calculate Compound Interest 
export function calculateInterest(formData: InputFormData): InterestDetails[] {
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

  return interestDetails;
}

// Compare input form data with userQueries to find matching entry id
export function compareObjects(inputDataObject: InputFormData, allQueries: UserQuery[]): string | null {
  const inputValues = Object.values(inputDataObject);

  for (const thisQuery of allQueries) {
    const queryValues = Object.values(thisQuery.query)
    if (inputValues.length !== queryValues.length) continue;

    let isMatch = true;
    for (let i = 0; i < inputValues.length; i++) {
      if (inputValues[i] != queryValues[i]) {
        isMatch = false;
        break;
      }
    }
    if (isMatch) {
      return thisQuery.id
    }
  }
  return null
}

//dummy data
export const chartDummyData: UserQuery = {
  "id": "15e113df-605d-488a-9069-08e32cf70468",
  "query": {
    "initialDeposit": 1000,
    "rateOfInterest": 2,
    "yearsOfGrowth": 5
  },
  "details": [
    {
      "year": 0,
      "rateOfInterest": 2,
      "initialDeposit": 1000,
      "currentAmount": 1000,
      "increasingInterest": 0
    },
    {
      "year": 1,
      "rateOfInterest": 2,
      "initialDeposit": 1000,
      "currentAmount": 1020,
      "increasingInterest": 20
    },
    {
      "year": 2,
      "rateOfInterest": 2,
      "initialDeposit": 1000,
      "currentAmount": 1040.4,
      "increasingInterest": 20.400000000000002
    },
    {
      "year": 3,
      "rateOfInterest": 2,
      "initialDeposit": 1000,
      "currentAmount": 1061.208,
      "increasingInterest": 20.808000000000003
    },
    {
      "year": 4,
      "rateOfInterest": 2,
      "initialDeposit": 1000,
      "currentAmount": 1082.43216,
      "increasingInterest": 21.22416
    },
    {
      "year": 5,
      "rateOfInterest": 2,
      "initialDeposit": 1000,
      "currentAmount": 1104.0808032,
      "increasingInterest": 21.648643200000002
    }
  ]
}
