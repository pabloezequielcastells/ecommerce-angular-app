export interface Employee {
  specialization: Specializacion;
  skills: Skill[];
  qualizacation: Qualification;
  expectedSalary: number;
  experience: Experience[];
}


interface Specializacion {
  id: string;
  name: string;
}

interface Skill {
  id: string;
  name: string;
}

interface Qualification {
  id: string;
  name: string;
}

interface Experience {
  companyName: string;
  period: Period;
}

interface Period {
  from: number;
  to: number;
}
