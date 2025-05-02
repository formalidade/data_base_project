import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { PlusCircle, Trash2, Users, Award, CheckCircle, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeaderCell } from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import Alert from '../components/ui/Alert';
import { tournaments, teams, players } from '../data/mockData';

const AdminDashboard: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isAddTournamentModalOpen, setIsAddTournamentModalOpen] = useState(false);
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);
  const [isManageTeamModalOpen, setIsManageTeamModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form states
  const [newTournament, setNewTournament] = useState({
    name: '',
    startDate: '',
    endDate: '',
    location: '',
  });

  const [newTeam, setNewTeam] = useState({
    name: '',
    tournamentId: '',
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleAddTournament = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API
    setSuccessMessage(`Tournament "${newTournament.name}" added successfully`);
    setIsAddTournamentModalOpen(false);
    setNewTournament({ name: '', startDate: '', endDate: '', location: '' });
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  const handleAddTeam = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API
    setSuccessMessage(`Team "${newTeam.name}" added successfully`);
    setIsAddTeamModalOpen(false);
    setNewTeam({ name: '', tournamentId: '' });
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  const handleDeleteTournament = (id: string) => {
    // In a real app, this would call an API
    setSuccessMessage('Tournament deleted successfully');
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  const handleManageTeam = (teamId: string) => {
    setSelectedTeam(teamId);
    setIsManageTeamModalOpen(true);
  };

  const handleSetCaptain = (playerId: string) => {
    // In a real app, this would call an API
    setSuccessMessage('Captain updated successfully');
    setIsManageTeamModalOpen(false);
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  const handleApprovePlayer = (playerId: string) => {
    // In a real app, this would call an API
    setSuccessMessage('Player approved successfully');
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  const pendingPlayers = players.filter(player => !player.approved);
  const selectedTeamData = teams.find(team => team.id === selectedTeam);
  const teamPlayers = players.filter(player => player.teamId === selectedTeam);

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex space-x-4">
            <Button 
              variant="primary" 
              onClick={() => setIsAddTournamentModalOpen(true)}
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Add Tournament
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => setIsAddTeamModalOpen(true)}
            >
              <Users className="h-5 w-5 mr-2" />
              Add Team
            </Button>
          </div>
        </div>

        {successMessage && (
          <Alert variant="success" className="mb-4">
            {successMessage}
          </Alert>
        )}

        {errorMessage && (
          <Alert variant="error" className="mb-4">
            {errorMessage}
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pending Approvals Card */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Pending Player Approvals</h2>
                <Badge variant="warning">{pendingPlayers.length}</Badge>
              </div>
            </CardHeader>
            <CardBody>
              {pendingPlayers.length > 0 ? (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>Name</TableHeaderCell>
                      <TableHeaderCell>Team</TableHeaderCell>
                      <TableHeaderCell>Position</TableHeaderCell>
                      <TableHeaderCell>Action</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pendingPlayers.map((player) => {
                      const playerTeam = teams.find(t => t.id === player.teamId);
                      return (
                        <TableRow key={player.id}>
                          <TableCell>{player.name}</TableCell>
                          <TableCell>{playerTeam?.name || 'Unknown'}</TableCell>
                          <TableCell>{player.position}</TableCell>
                          <TableCell>
                            <Button 
                              variant="success" 
                              size="sm"
                              onClick={() => handleApprovePlayer(player.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-gray-500 text-center py-4">No pending approvals</p>
              )}
            </CardBody>
          </Card>

          {/* Upcoming Matches Card */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Matches</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <Calendar className="h-10 w-10 text-blue-500 mr-3" />
                  <div>
                    <p className="font-medium">Red Dragons vs Blue Eagles</p>
                    <p className="text-sm text-gray-500">June 5, 2025 • Summer Cup</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    Send Reminder
                  </Button>
                </div>
                
                <div className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <Calendar className="h-10 w-10 text-blue-500 mr-3" />
                  <div>
                    <p className="font-medium">City Wanderers vs Athletic Club</p>
                    <p className="text-sm text-gray-500">May 11, 2025 • City League</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    Send Reminder
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Tournaments Table */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Tournaments</h2>
          </CardHeader>
          <CardBody>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Name</TableHeaderCell>
                  <TableHeaderCell>Dates</TableHeaderCell>
                  <TableHeaderCell>Location</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  <TableHeaderCell>Teams</TableHeaderCell>
                  <TableHeaderCell>Actions</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tournaments.map((tournament) => {
                  const tournamentTeams = teams.filter(team => team.tournamentId === tournament.id);
                  return (
                    <TableRow key={tournament.id}>
                      <TableCell className="font-medium">{tournament.name}</TableCell>
                      <TableCell>
                        {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{tournament.location}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            tournament.status === 'upcoming' ? 'info' : 
                            tournament.status === 'ongoing' ? 'warning' : 
                            'success'
                          }
                        >
                          {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{tournamentTeams.length}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setNewTeam({...newTeam, tournamentId: tournament.id});
                              setIsAddTeamModalOpen(true);
                            }}
                          >
                            <Users className="h-4 w-4 mr-1" />
                            Add Team
                          </Button>
                          <Button 
                            variant="danger" 
                            size="sm"
                            onClick={() => handleDeleteTournament(tournament.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardBody>
        </Card>

        {/* Teams Table */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Teams</h2>
          </CardHeader>
          <CardBody>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Name</TableHeaderCell>
                  <TableHeaderCell>Tournament</TableHeaderCell>
                  <TableHeaderCell>Players</TableHeaderCell>
                  <TableHeaderCell>Captain</TableHeaderCell>
                  <TableHeaderCell>Points</TableHeaderCell>
                  <TableHeaderCell>Actions</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teams.map((team) => {
                  const teamPlayers = players.filter(player => player.teamId === team.id);
                  const captain = teamPlayers.find(player => player.isCaptain);
                  const tournament = tournaments.find(t => t.id === team.tournamentId);
                  
                  return (
                    <TableRow key={team.id}>
                      <TableCell className="font-medium">{team.name}</TableCell>
                      <TableCell>{tournament?.name || 'Unknown'}</TableCell>
                      <TableCell>{teamPlayers.length}</TableCell>
                      <TableCell>{captain?.name || 'Not assigned'}</TableCell>
                      <TableCell>{team.points}</TableCell>
                      <TableCell>
                        <Button 
                          variant="primary" 
                          size="sm"
                          onClick={() => handleManageTeam(team.id)}
                        >
                          <Award className="h-4 w-4 mr-1" />
                          Manage
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

      {/* Add Tournament Modal */}
      <Modal
        isOpen={isAddTournamentModalOpen}
        onClose={() => setIsAddTournamentModalOpen(false)}
        title="Add New Tournament"
      >
        <form onSubmit={handleAddTournament} className="space-y-4">
          <Input
            label="Tournament Name"
            value={newTournament.name}
            onChange={(e) => setNewTournament({...newTournament, name: e.target.value})}
            required
            fullWidth
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="date"
              value={newTournament.startDate}
              onChange={(e) => setNewTournament({...newTournament, startDate: e.target.value})}
              required
              fullWidth
            />
            
            <Input
              label="End Date"
              type="date"
              value={newTournament.endDate}
              onChange={(e) => setNewTournament({...newTournament, endDate: e.target.value})}
              required
              fullWidth
            />
          </div>
          
          <Input
            label="Location"
            value={newTournament.location}
            onChange={(e) => setNewTournament({...newTournament, location: e.target.value})}
            required
            fullWidth
          />
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => setIsAddTournamentModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Tournament
            </Button>
          </div>
        </form>
      </Modal>

      {/* Add Team Modal */}
      <Modal
        isOpen={isAddTeamModalOpen}
        onClose={() => setIsAddTeamModalOpen(false)}
        title="Add New Team"
      >
        <form onSubmit={handleAddTeam} className="space-y-4">
          <Input
            label="Team Name"
            value={newTeam.name}
            onChange={(e) => setNewTeam({...newTeam, name: e.target.value})}
            required
            fullWidth
          />
          
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Tournament
            </label>
            <select
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={newTeam.tournamentId}
              onChange={(e) => setNewTeam({...newTeam, tournamentId: e.target.value})}
              required
            >
              <option value="">Select a tournament</option>
              {tournaments.map((tournament) => (
                <option key={tournament.id} value={tournament.id}>
                  {tournament.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => setIsAddTeamModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Team
            </Button>
          </div>
        </form>
      </Modal>

      {/* Manage Team Modal */}
      <Modal
        isOpen={isManageTeamModalOpen}
        onClose={() => setIsManageTeamModalOpen(false)}
        title={`Manage Team: ${selectedTeamData?.name || ''}`}
        size="lg"
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Team Players</h3>
            {teamPlayers.length > 0 ? (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>Position</TableHeaderCell>
                    <TableHeaderCell>Goals</TableHeaderCell>
                    <TableHeaderCell>Red Cards</TableHeaderCell>
                    <TableHeaderCell>Captain</TableHeaderCell>
                    <TableHeaderCell>Actions</TableHeaderCell>
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
                        {player.isCaptain ? (
                          <Badge variant="success">Captain</Badge>
                        ) : null}
                      </TableCell>
                      <TableCell>
                        {!player.isCaptain && (
                          <Button 
                            variant="primary" 
                            size="sm"
                            onClick={() => handleSetCaptain(player.id)}
                          >
                            Make Captain
                          </Button>
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
              onClick={() => setIsManageTeamModalOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default AdminDashboard;