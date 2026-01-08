
export enum View {
  LOGIN = 'LOGIN',
  HOME = 'HOME',
  REPORT = 'REPORT',
  PROFILE = 'PROFILE',
  POINTS = 'POINTS',
  SCHEDULE = 'SCHEDULE'
}

export interface WasteAnalysis {
  plastic: number;
  glass: number;
  cardboard: number;
  metal: number;
  trash: number;
}

export interface User {
  name: string;
  email: string;
  phone: string;
  contribution: string;
  points: number;
  profilePic?: string;
}

export interface PickupDetails {
  address: string;
  pincode: string;
  state: string;
  landmark: string;
  date: string;
  type: string;
}
