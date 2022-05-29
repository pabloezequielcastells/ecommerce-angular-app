import { Recruiter, Employee } from './roles';
export * from './roles';

export interface User {
  uid: string;
  name:string;
  photoUrl: string;
  email: string;
  country: string;
  abount?: string;
  roleId: string;
  role: Employee | Recruiter;
  created: number;
  updated?: number;
}
