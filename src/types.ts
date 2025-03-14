export interface GrandPrix {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface Race {
  id: number;
  date: string;
}

export interface Driver {
  id: number;
  firstName: string;
  lastName: string;
  driverCode: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface Rater {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface Team {
  id: number;
  name: string;
  fullName: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface InsertResult {
  driverId: number;
  teamId: number;
  raceId: number;
  position: number;
}

export interface InsertRating {
  resultId: number;
  raterId: number;
  rating: number;
}

export interface InsertedResult {
  id: number;
  driverId: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T[];
}
