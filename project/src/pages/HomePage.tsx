import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Users, Award, Calendar, BarChart } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import { Card, CardBody } from '../components/ui/Card';
import { tournaments, teams, players, matches } from '../data/mockData';

const HomePage: React.FC = () => {
  // Get upcoming matches
  const upcomingMatches = matches
    .filter(match => match.status === 'scheduled')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  // Get top scorer
  const topScorer = [...players]
    .sort((a, b) => b.goalsScored - a.goalsScored)[0];
  
  const topScorerTeam = teams.find(team => team.id === topScorer?.teamId);

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-700 to-blue-900 rounded-xl overflow-hidden mb-12">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-20"></div>
        <div className="relative px-8 py-16 md:py-24 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Soccer Tournament Management System
            </h1>
            <p className="text-xl mb-8">
              Manage tournaments, teams, and players with ease. Track match results, player statistics, and more.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/tournaments">
                <Button variant="primary" size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                  <Trophy className="h-5 w-5 mr-2" />
                  View Tournaments
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-blue-800">
                  Admin Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
          <CardBody className="flex items-center p-6">
            <div className="rounded-full bg-blue-600 p-3 mr-4">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <div>
              <p className="text-sm text-blue-700 font-medium">Tournaments</p>
              <p className="text-2xl font-bold">{tournaments.length}</p>
            </div>
          </CardBody>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
          <CardBody className="flex items-center p-6">
            <div className="rounded-full bg-green-600 p-3 mr-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div>
              <p className="text-sm text-green-700 font-medium">Teams</p>
              <p className="text-2xl font-bold">{teams.length}</p>
            </div>
          </CardBody>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
          <CardBody className="flex items-center p-6">
            <div className="rounded-full bg-purple-600 p-3 mr-4">
              <Award className="h-8 w-8 text-white" />
            </div>
            <div>
              <p className="text-sm text-purple-700 font-medium">Players</p>
              <p className="text-2xl font-bold">{players.length}</p>
            </div>
          </CardBody>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200">
          <CardBody className="flex items-center p-6">
            <div className="rounded-full bg-amber-600 p-3 mr-4">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <div>
              <p className="text-sm text-amber-700 font-medium">Matches</p>
              <p className="text-2xl font-bold">{matches.length}</p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Featured Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardBody className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Upcoming Matches
              </h2>
              
              <div className="space-y-4">
                {upcomingMatches.map(match => {
                  const homeTeam = teams.find(t => t.id === match.homeTeamId);
                  const awayTeam = teams.find(t => t.id === match.awayTeamId);
                  const tournament = tournaments.find(t => t.id === match.tournamentId);
                  
                  return (
                    <div key={match.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-lg">
                            {homeTeam?.name || 'Unknown'} vs {awayTeam?.name || 'Unknown'}
                          </p>
                          <p className="text-sm text-gray-500">
                            {tournament?.name} • {new Date(match.date).toLocaleDateString()}
                          </p>
                        </div>
                        <Link to={`/tournaments`}>
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
                
                {upcomingMatches.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No upcoming matches scheduled</p>
                )}
              </div>
              
              <div className="mt-4 text-center">
                <Link to="/tournaments">
                  <Button variant="outline">
                    View All Matches
                  </Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <CardBody className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2 text-blue-600" />
                Top Scorer
              </h2>
              
              {topScorer ? (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 mb-4">
                    <Award className="h-12 w-12 text-blue-600" />
                  </div>
                  
                  <h3 className="text-xl font-bold">{topScorer.name}</h3>
                  <p className="text-gray-600 mb-2">{topScorerTeam?.name}</p>
                  
                  <div className="flex justify-center items-center space-x-2 mb-4">
                    <span className="text-3xl font-bold text-blue-600">{topScorer.goalsScored}</span>
                    <span className="text-gray-500">goals</span>
                  </div>
                  
                  <Link to="/stats">
                    <Button variant="outline" size="sm">
                      <BarChart className="h-4 w-4 mr-1" />
                      View All Stats
                    </Button>
                  </Link>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No data available</p>
              )}
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white mb-8">
        <CardBody className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to manage your tournament?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Sign in as an administrator to create tournaments, manage teams, approve players, and more.
          </p>
          <Link to="/login">
            <Button variant="primary" size="lg" className="bg-white text-indigo-700 hover:bg-gray-100">
              Get Started
            </Button>
          </Link>
        </CardBody>
      </Card>
    </Layout>
  );
};

export default HomePage;