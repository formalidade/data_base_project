import { Tournament, Team, Player, Match } from '../types';

export const tournaments: Tournament[] = [
  {
    id: '1',
    name: 'Summer Cup 2025',
    startDate: '2025-06-01',
    endDate: '2025-06-30',
    location: 'Central Stadium',
    status: 'upcoming',
  },
  {
    id: '2',
    name: 'City League',
    startDate: '2025-04-15',
    endDate: '2025-05-20',
    location: 'Municipal Fields',
    status: 'ongoing',
  },
  {
    id: '3',
    name: 'Winter Championship',
    startDate: '2024-12-10',
    endDate: '2025-01-15',
    location: 'Indoor Arena',
    status: 'completed',
  },
];

export const teams: Team[] = [
  { id: '1', tournamentId: '1', name: 'Red Dragons', points: 0 },
  { id: '2', tournamentId: '1', name: 'Blue Eagles', points: 0 },
  { id: '3', tournamentId: '1', name: 'Green Lions', points: 0 },
  { id: '4', tournamentId: '2', name: 'City Wanderers', points: 9 },
  { id: '5', tournamentId: '2', name: 'United FC', points: 7 },
  { id: '6', tournamentId: '2', name: 'Athletic Club', points: 12 },
  { id: '7', tournamentId: '3', name: 'Northern Stars', points: 15 },
  { id: '8', tournamentId: '3', name: 'Southern Tigers', points: 18 },
  { id: '9', tournamentId: '3', name: 'Eastern Falcons', points: 10 },
];

export const players: Player[] = [
  { id: '1', teamId: '1', name: 'Alex Johnson', position: 'Forward', isCaptain: true, goalsScored: 0, redCards: 0, approved: true },
  { id: '2', teamId: '1', name: 'Sam Wilson', position: 'Midfielder', isCaptain: false, goalsScored: 0, redCards: 0, approved: true },
  { id: '3', teamId: '1', name: 'Jamie Lee', position: 'Defender', isCaptain: false, goalsScored: 0, redCards: 0, approved: false },
  
  { id: '4', teamId: '4', name: 'Chris Taylor', position: 'Forward', isCaptain: true, goalsScored: 5, redCards: 0, approved: true },
  { id: '5', teamId: '4', name: 'Pat Rodriguez', position: 'Midfielder', isCaptain: false, goalsScored: 2, redCards: 1, approved: true },
  { id: '6', teamId: '4', name: 'Jordan Smith', position: 'Defender', isCaptain: false, goalsScored: 0, redCards: 0, approved: true },
  
  { id: '7', teamId: '7', name: 'Morgan Chen', position: 'Forward', isCaptain: false, goalsScored: 8, redCards: 0, approved: true },
  { id: '8', teamId: '7', name: 'Casey Brown', position: 'Midfielder', isCaptain: true, goalsScored: 3, redCards: 0, approved: true },
  { id: '9', teamId: '7', name: 'Riley Garcia', position: 'Defender', isCaptain: false, goalsScored: 1, redCards: 2, approved: true },
  
  { id: '10', teamId: '8', name: 'Taylor Kim', position: 'Forward', isCaptain: true, goalsScored: 10, redCards: 1, approved: true },
  { id: '11', teamId: '8', name: 'Avery Patel', position: 'Midfielder', isCaptain: false, goalsScored: 4, redCards: 0, approved: true },
  { id: '12', teamId: '8', name: 'Dakota Lee', position: 'Defender', isCaptain: false, goalsScored: 0, redCards: 3, approved: true },
];

export const matches: Match[] = [
  {
    id: '1',
    tournamentId: '2',
    homeTeamId: '4',
    awayTeamId: '5',
    homeTeamScore: 2,
    awayTeamScore: 1,
    date: '2025-04-20',
    status: 'completed',
  },
  {
    id: '2',
    tournamentId: '2',
    homeTeamId: '6',
    awayTeamId: '4',
    homeTeamScore: 3,
    awayTeamScore: 0,
    date: '2025-04-27',
    status: 'completed',
  },
  {
    id: '3',
    tournamentId: '2',
    homeTeamId: '5',
    awayTeamId: '6',
    homeTeamScore: 1,
    awayTeamScore: 1,
    date: '2025-05-04',
    status: 'completed',
  },
  {
    id: '4',
    tournamentId: '2',
    homeTeamId: '4',
    awayTeamId: '6',
    date: '2025-05-11',
    status: 'scheduled',
  },
  {
    id: '5',
    tournamentId: '3',
    homeTeamId: '7',
    awayTeamId: '8',
    homeTeamScore: 1,
    awayTeamScore: 3,
    date: '2024-12-15',
    status: 'completed',
  },
  {
    id: '6',
    tournamentId: '3',
    homeTeamId: '9',
    awayTeamId: '7',
    homeTeamScore: 0,
    awayTeamScore: 2,
    date: '2024-12-22',
    status: 'completed',
  },
  {
    id: '7',
    tournamentId: '3',
    homeTeamId: '8',
    awayTeamId: '9',
    homeTeamScore: 4,
    awayTeamScore: 0,
    date: '2024-12-29',
    status: 'completed',
  },
  {
    id: '8',
    tournamentId: '1',
    homeTeamId: '1',
    awayTeamId: '2',
    date: '2025-06-05',
    status: 'scheduled',
  },
];