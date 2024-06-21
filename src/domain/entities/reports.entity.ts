export interface Report {
  vin: string;
  vehicleId: string;
  generatorId: string;
  observations: {text: string; createdAt: Date}[];
  status: 'pending' | 'completed' | 'cancelled';
  step1: string;
  step2: string;
  step3: string;
  createdAt: Date;
}
