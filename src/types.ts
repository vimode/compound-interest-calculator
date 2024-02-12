export interface InputFormData {
  initialDeposit: number;
  yearsOfGrowth: number;
  rateOfInterest: number;
}

export interface InterestDetails {
  year: number;
  rateOfInterest:string;
  initialDeposit:string;
  currentAmount:string;
  increasingInterest:string | number;
}

export interface UserQuery {
  id: string;
  details: InterestDetails[];
}
