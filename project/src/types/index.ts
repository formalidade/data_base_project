export interface User {
  id: string;
  username: string;
  role: 'admin' | 'guest';
}

export interface Tournament {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface Team {
  id: string;
  tournamentId: string;
  name: string;
  logo?: string;
  points: number;
}

export interface Player {
  id: string;
  teamId: string;
  name: string;
  position: string;
  isCaptain: boolean;
  goalsScored: number;
  redCards: number;
  approved: boolean;
}

export interface Match {
  id: string;
  tournamentId: string;
  homeTeamId: string;
  awayTeamId: string;
  homeTeamScore?: number;
  awayTeamScore?: number;
  date: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}