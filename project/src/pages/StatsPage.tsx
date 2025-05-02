import React, { useState } from 'react';
import { Award, AlertTriangle, User } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeaderCell } from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import { tournaments, teams, players } from '../data/mockData';

const StatsPage: React.FC = () => {
  const [selectedTournament, setSelectedTournament] = useState<string>('all');

  // Filter players based on selected tournament
  const filteredPlayers = selectedTournament === 'all'
    ? players
    : players.filter(player => {
        const playerTeam = teams.find(team => team.id === player.teamId);
        return playerTeam?.tournamentId === selectedTournament;
      });

  // Sort players by goals scored (descending)
  const topScorers = [...filteredPlayers]
    .sort((a, b) => b.goalsScored - a.goalsScored)
    .slice(0, 10);

  // Get players with red cards
  const redCardedPlayers = filteredPlayers.filter(player => player.redCards > 0);

  // Group red carded players by team
  const redCardsByTeam = redCardedPlayers.reduce((acc, player) => {
    const team = teams.find(t => t.id === player.teamId);
    if (team) {
      if (!acc[team.id]) {
        acc[team.id] = {
          teamName: team.name,
          players: []
        };
      }
      acc[team.id].players.push(player);
    }
    return acc;
  }, {} as Record<string, { teamName: string; players: typeof players }>);

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tournament Statistics</h1>
          <p className="text-gray-600">View top scorers, red cards, and team information</p>
        </div>

        <div className="flex justify-end">
          <div className="w-64">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Tournament
            </label>
            <select
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={selectedTournament}
              onChange={(e) => setSelectedTournament(e.target.value)}
            >
              <option value="all">All Tournaments</option>
              {tournaments.map((tournament) => (
                <option key={tournament.id} value={tournament.id}>
                  {tournament.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Scorers Card */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-800 text-white">
              <div className="flex items-center">
                <Award className="h-6 w-6 mr-2" />
                <h2 className="text-xl font-bold">Top Scorers</h2>
              </div>
            </CardHeader>
            <CardBody>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Rank</TableHeaderCell>
                    <TableHeaderCell>Player</TableHeaderCell>
                    <TableHeaderCell>Team</TableHeaderCell>
                    <TableHeaderCell>Goals</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topScorers.map((player, index) => {
                    const playerTeam = teams.find(team => team.id === player.teamId);
                    return (
                      <TableRow key={player.id}>
                        <TableCell>
                          {index === 0 ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-400 text-white rounded-full font-bold">
                              1
                            </span>
                          ) : index === 1 ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-400 text-white rounded-full font-bold">
                              2
                            </span>
                          ) : index === 2 ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 bg-amber-700 text-white rounded-full font-bold">
                              3
                            </span>
                          ) : (
                            index + 1
                          )}
                        </TableCell>
                        <TableCell className="font-medium">
                          {player.name}
                          {player.isCaptain && (
                            <Badge variant="info" className="ml-2">C</Badge>
                          )}
                        </TableCell>
                        <TableCell>{playerTeam?.name || 'Unknown'}</TableCell>
                        <TableCell className="font-bold">{player.goalsScored}</TableCell>
                      </TableRow>
                    );
                  })}
                  {topScorers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                        No data available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardBody>
          </Card>

          {/* Red Cards Card */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-red-600 to-red-800 text-white">
              <div className="flex items-center">
                <AlertTriangle className="h-6 w-6 mr-2" />
                <h2 className="text-xl font-bold">Red Cards by Team</h2>
              </div>
            </CardHeader>
            <CardBody>
              {Object.values(redCardsByTeam).length > 0 ? (
                <div className="space-y-6">
                  {Object.values(redCardsByTeam).map(({ teamName, players }) => (
                    <div key={teamName} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                      <h3 className="font-semibold text-lg mb-2">{teamName}</h3>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableHeaderCell>Player</TableHeaderCell>
                            <TableHeaderCell>Position</TableHeaderCell>
                            <TableHeaderCell>Red Cards</TableHeaderCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {players.map((player) => (
                            <TableRow key={player.id}>
                              <TableCell className="font-medium">
                                {player.name}
                                {player.isCaptain && (
                                  <Badge variant="info" className="ml-2">C</Badge>
                                )}
                              </TableCell>
                              <TableCell>{player.position}</TableCell>
                              <TableCell>
                                <Badge variant="danger">{player.redCards}</Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <AlertTriangle className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                  <p>No red cards recorded</p>
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Team Rankings */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Team Rankings</h2>
          </CardHeader>
          <CardBody>
            {selectedTournament !== 'all' ? (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Rank</TableHeaderCell>
                    <TableHeaderCell>Team</TableHeaderCell>
                    <TableHeaderCell>Players</TableHeaderCell>
                    <TableHeaderCell>Top Scorer</TableHeaderCell>
                    <TableHeaderCell>Points</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teams
                    .filter(team => team.tournamentId === selectedTournament)
                    .sort((a, b) => b.points - a.points)
                    .map((team, index) => {
                      const teamPlayers = players.filter(player => player.teamId === team.id);
                      const topScorer = [...teamPlayers].sort((a, b) => b.goalsScored - a.goalsScored)[0];
                      
                      return (
                        <TableRow key={team.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell className="font-medium">{team.name}</TableCell>
                          <TableCell>{teamPlayers.length}</TableCell>
                          <TableCell>
                            {topScorer ? (
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-1 text-gray-500" />
                                <span>{topScorer.name}</span>
                                <span className="ml-1 text-gray-500">({topScorer.goalsScored})</span>
                              </div>
                            ) : (
                              '-'
                            )}
                          </TableCell>
                          <TableCell className="font-bold">{team.points}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-6 text-gray-500">
                Please select a specific tournament to view team rankings
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export default StatsPage;