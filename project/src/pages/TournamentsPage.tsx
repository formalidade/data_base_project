import React, { useState } from 'react';
import { Calendar, Users, Trophy, ChevronRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeaderCell } from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { tournaments, teams, matches, players } from '../data/mockData';

const TournamentsPage: React.FC = () => {
  const [selectedTournament, setSelectedTournament] = useState<string | null>(null);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [isMatchesModalOpen, setIsMatchesModalOpen] = useState(false);

  const handleViewTeam = (teamId: string) => {
    setSelectedTeam(teamId);
    setIsTeamModalOpen(true);
  };

  const handleViewMatches = (tournamentId: string) => {
    setSelectedTournament(tournamentId);
    setIsMatchesModalOpen(true);
  };

  const selectedTournamentData = tournaments.find(t => t.id === selectedTournament);
  const tournamentMatches = matches.filter(m => m.tournamentId === selectedTournament)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const selectedTeamData = teams.find(t => t.id === selectedTeam);
  const teamPlayers = players.filter(p => p.teamId === selectedTeam);

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tournaments</h1>
          <p className="text-gray-600">Browse all soccer tournaments, teams, and matches</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tournaments.map((tournament) => {
            const tournamentTeams = teams.filter(team => team.tournamentId === tournament.id);
            const tournamentMatches = matches.filter(match => match.tournamentId === tournament.id);
            const completedMatches = tournamentMatches.filter(match => match.status === 'completed');
            
            return (
              <Card key={tournament.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold">{tournament.name}</h2>
                    <Badge 
                      variant={
                        tournament.status === 'upcoming' ? 'info' : 
                        tournament.status === 'ongoing' ? 'warning' : 
                        'success'
                      }
                      className="bg-white"
                    >
                      {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-5 w-5 mr-2" />
                      <span>
                        {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Trophy className="h-5 w-5 mr-2" />
                      <span>{tournament.location}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Users className="h-5 w-5 mr-2" />
                      <span>{tournamentTeams.length} Teams</span>
                    </div>
                    
                    <div className="pt-2 flex justify-between">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewMatches(tournament.id)}
                      >
                        View Matches
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                      
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Matches</div>
                        <div className="font-semibold">
                          {completedMatches.length}/{tournamentMatches.length}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">All Teams</h2>
          </CardHeader>
          <CardBody>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Team Name</TableHeaderCell>
                  <TableHeaderCell>Tournament</TableHeaderCell>
                  <TableHeaderCell>Players</TableHeaderCell>
                  <TableHeaderCell>Points</TableHeaderCell>
                  <TableHeaderCell>Actions</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teams.map((team) => {
                  const teamPlayers = players.filter(player => player.teamId === team.id);
                  const tournament = tournaments.find(t => t.id === team.tournamentId);
                  
                  return (
                    <TableRow key={team.id}>
                      <TableCell className="font-medium">{team.name}</TableCell>
                      <TableCell>{tournament?.name || 'Unknown'}</TableCell>
                      <TableCell>{teamPlayers.length}</TableCell>
                      <TableCell>{team.points}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewTeam(team.id)}
                        >
                          View Team
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>

      {/* Team Details Modal */}
      <Modal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        title={`Team: ${selectedTeamData?.name || ''}`}
        size="lg"
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Players</h3>
            {teamPlayers.length > 0 ? (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>Position</TableHeaderCell>
                    <TableHeaderCell>Goals</TableHeaderCell>
                    <TableHeaderCell>Red Cards</TableHeaderCell>
                    <TableHeaderCell>Role</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teamPlayers.map((player) => (
                    <TableRow key={player.id}>
                      <TableCell>{player.name}</TableCell>
                      <TableCell>{player.position}</TableCell>
                      <TableCell>{player.goalsScored}</TableCell>
                      <TableCell>{player.redCards}</TableCell>
                      <TableCell>
                        {player.isCaptain && (
                          <Badge variant="success">Captain</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-gray-500 text-center py-4">No players in this team</p>
            )}
          </div>
          
          <div className="flex justify-end">
            <Button 
              variant="outline"
              onClick={() => setIsTeamModalOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>

      {/* Matches Modal */}
      <Modal
        isOpen={isMatchesModalOpen}
        onClose={() => setIsMatchesModalOpen(false)}
        title={`Matches: ${selectedTournamentData?.name || ''}`}
        size="lg"
      >
        <div className="space-y-6">
          {tournamentMatches.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Date</TableHeaderCell>
                  <TableHeaderCell>Home Team</TableHeaderCell>
                  <TableHeaderCell>Away Team</TableHeaderCell>
                  <TableHeaderCell>Score</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tournamentMatches.map((match) => {
                  const homeTeam = teams.find(t => t.id === match.homeTeamId);
                  const awayTeam = teams.find(t => t.id === match.awayTeamId);
                  
                  return (
                    <TableRow key={match.id}>
                      <TableCell>{new Date(match.date).toLocaleDateString()}</TableCell>
                      <TableCell>{homeTeam?.name || 'Unknown'}</TableCell>
                      <TableCell>{awayTeam?.name || 'Unknown'}</TableCell>
                      <TableCell>
                        {match.status === 'completed' 
                          ? `${match.homeTeamScore} - ${match.awayTeamScore}` 
                          : '-'
                        }
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            match.status === 'scheduled' ? 'info' : 
                            match.status === 'completed' ? 'success' : 
                            'warning'
                          }
                        >
                          {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <p className="text-gray-500 text-center py-4">No matches scheduled for this tournament</p>
          )}
          
          <div className="flex justify-end">
            <Button 
              variant="outline"
              onClick={() => setIsMatchesModalOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default TournamentsPage;