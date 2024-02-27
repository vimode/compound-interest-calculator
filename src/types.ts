export interface InputFormData {
  initialDeposit: number;
  yearsOfGrowth: number;
  rateOfInterest: number;
}

export interface InterestDetails {
  year: number;
  rateOfInterest:number;
  initialDeposit:number;
  currentAmount:number;
  increasingInterest: number;
}

export interface UserQuery {
  id: string;
  query: InputFormData;
  details: InterestDetails[];
}
