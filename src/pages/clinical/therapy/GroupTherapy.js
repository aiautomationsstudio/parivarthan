import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GroupTherapy = () => {
  const navigate = useNavigate();
  
  // State management
  const [activeTab, setActiveTab] = useState('sessions');
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sessionNotes, setSessionNotes] = useState('');
  const [attendanceList, setAttendanceList] = useState([]);

  // Sample data for demonstration
  useEffect(() => {
    // Simulating API call to fetch groups
    const sampleGroups = [
      {
        id: 1,
        name: 'Anxiety Management Group',
        type: 'CBT',
        status: 'active',
        members: 8,
        maxMembers: 10,
        facilitator: 'Dr. Sarah Johnson',
        schedule: 'Wednesdays, 3:00 PM',
        nextSession: '2025-01-15',
        duration: '90 minutes',
        progress: 65,
        description: 'Cognitive Behavioral Therapy group for managing anxiety symptoms'
      },
      {
        id: 2,
        name: 'Depression Support Circle',
        type: 'Support',
        status: 'active',
        members: 6,
        maxMembers: 8,
        facilitator: 'Dr. Michael Chen',
        schedule: 'Mondays, 4:00 PM',
        nextSession: '2025-01-13',
        duration: '60 minutes',
        progress: 40,
        description: 'Peer support group for individuals experiencing depression'
      },
      {
        id: 3,
        name: 'Mindfulness & Stress Reduction',
        type: 'MBSR',
        status: 'enrolling',
        members: 4,
        maxMembers: 12,
        facilitator: 'Dr. Emily Rodriguez',
        schedule: 'Fridays, 2:00 PM',
        nextSession: '2025-01-17',
        duration: '75 minutes',
        progress: 0,
        description: 'Mindfulness-Based Stress Reduction program'
      },
      {
        id: 4,
        name: 'Trauma Recovery Group',
        type: 'EMDR',
        status: 'active',
        members: 5,
        maxMembers: 6,
        facilitator: 'Dr. James Wilson',
        schedule: 'Thursdays, 5:00 PM',
        nextSession: '2025-01-16',
        duration: '120 minutes',
        progress: 80,
        description: 'EMDR-based trauma processing group'
      }
    ];
    setGroups(sampleGroups);
  }, []);

  // Sample attendance data
  const sampleAttendance = [
    { id: 1, name: 'John Doe', status: 'present', participation: 'active' },
    { id: 2, name: 'Jane Smith', status: 'present', participation: 'moderate' },
    { id: 3, name: 'Robert Johnson', status: 'absent', participation: '-' },
    { id: 4, name: 'Maria Garcia', status: 'present', participation: 'active' },
    { id: 5, name: 'David Lee', status: 'late', participation: 'minimal' },
    { id: 6, name: 'Sarah Brown', status: 'present', participation: 'active' }
  ];

  // Filter groups based on search and status
  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          group.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          group.facilitator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || group.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Create new group form component
  const CreateGroupModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Create New Group</h2>
            <button
              onClick={() => setShowCreateModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Group Name *
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter group name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Therapy Type *
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select type</option>
                  <option value="cbt">CBT - Cognitive Behavioral</option>
                  <option value="dbt">DBT - Dialectical Behavioral</option>
                  <option value="emdr">EMDR - Eye Movement</option>
                  <option value="support">Support Group</option>
                  <option value="mbsr">MBSR - Mindfulness Based</option>
                  <option value="psychoeducation">Psychoeducation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Members *
                </label>
                <input
                  type="number"
                  min="2"
                  max="20"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Session Duration *
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="60">60 minutes</option>
                  <option value="75">75 minutes</option>
                  <option value="90">90 minutes</option>
                  <option value="120">120 minutes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date *
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Frequency *
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter group description and objectives"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Group
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  // Session details component
  const SessionDetails = ({ group }) => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{group.name}</h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
            {group.type}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm ${
            group.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
          }`}>
            {group.status === 'active' ? 'Active' : 'Enrolling'}
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            {group.members}/{group.maxMembers} members
          </span>
        </div>
      </div>

      {/* Tabs for session management */}
      <div className="border-b border-gray-200 mb-4">
        <div className="flex space-x-6 overflow-x-auto">
          <button
            className={`pb-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'sessions' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('sessions')}
          >
            Session Info
          </button>
          <button
            className={`pb-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'attendance' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('attendance')}
          >
            Attendance
          </button>
          <button
            className={`pb-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'notes' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('notes')}
          >
            Session Notes
          </button>
          <button
            className={`pb-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'progress' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('progress')}
          >
            Progress
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div className="mt-4">
        {activeTab === 'sessions' && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Facilitator</p>
                <p className="font-medium">{group.facilitator}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Schedule</p>
                <p className="font-medium">{group.schedule}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Next Session</p>
                <p className="font-medium">{new Date(group.nextSession).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-medium">{group.duration}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Description</p>
              <p className="text-gray-700">{group.description}</p>
            </div>
            <div className="flex flex-wrap gap-2 pt-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <i className="fas fa-video mr-2"></i>Start Video Session
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <i className="fas fa-calendar-plus mr-2"></i>Schedule Session
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                <i className="fas fa-users mr-2"></i>Manage Members
              </button>
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold">Today's Attendance</h4>
              <button className="text-sm text-blue-600 hover:text-blue-700">
                <i className="fas fa-download mr-1"></i>Export
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Member</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Participation</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sampleAttendance.map((member) => (
                    <tr key={member.id}>
                      <td className="px-4 py-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                            <i className="fas fa-user text-gray-600 text-sm"></i>
                          </div>
                          <span className="font-medium">{member.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <select 
                          value={member.status}
                          className="text-sm border border-gray-300 rounded px-2 py-1"
                          onChange={() => {}}
                        >
                          <option value="present">Present</option>
                          <option value="absent">Absent</option>
                          <option value="late">Late</option>
                          <option value="excused">Excused</option>
                        </select>
                      </td>
                      <td className="px-4 py-2">
                        <select 
                          value={member.participation}
                          className="text-sm border border-gray-300 rounded px-2 py-1"
                          onChange={() => {}}
                          disabled={member.status === 'absent'}
                        >
                          <option value="-">-</option>
                          <option value="active">Active</option>
                          <option value="moderate">Moderate</option>
                          <option value="minimal">Minimal</option>
                        </select>
                      </td>
                      <td className="px-4 py-2">
                        <button className="text-blue-600 hover:text-blue-700 text-sm">
                          <i className="fas fa-sticky-note mr-1"></i>Note
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="mt-4 w-full md:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <i className="fas fa-save mr-2"></i>Save Attendance
            </button>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Date
              </label>
              <input
                type="date"
                className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                defaultValue={group.nextSession}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Type
              </label>
              <select className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="regular">Regular Session</option>
                <option value="assessment">Assessment Session</option>
                <option value="crisis">Crisis Intervention</option>
                <option value="termination">Termination Session</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Notes
              </label>
              <textarea
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter session observations, group dynamics, interventions used, and outcomes..."
                value={sessionNotes}
                onChange={(e) => setSessionNotes(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Themes Discussed
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  Coping Strategies
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  Emotional Regulation
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  Peer Support
                </span>
              </div>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Add more themes..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Homework Assigned
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Describe homework or exercises assigned to the group..."
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <i className="fas fa-save mr-2"></i>Save Notes
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                <i className="fas fa-file-pdf mr-2"></i>Export as PDF
              </button>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Overall Group Progress</span>
                <span className="text-2xl font-bold text-blue-600">{group.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${group.progress}%` }}
                />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Individual Member Progress</h4>
              <div className="space-y-3">
                {sampleAttendance.slice(0, 4).map((member, index) => (
                  <div key={member.id} className="flex items-center justify-between">
                    <span className="text-sm">{member.name}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${45 + index * 15}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{45 + index * 15}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Session Milestones</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-3"></i>
                  <span className="text-sm">Session 1-4: Building Trust & Rapport</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-3"></i>
                  <span className="text-sm">Session 5-8: Skills Development</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-circle text-yellow-500 mr-3"></i>
                  <span className="text-sm">Session 9-12: Practice & Application</span>
                </div>
                <div className="flex items-center">
                  <i className="far fa-circle text-gray-400 mr-3"></i>
                  <span className="text-sm">Session 13-16: Maintenance & Termination</span>
                </div>
              </div>
            </div>

            <button className="w-full md:w-auto px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              <i className="fas fa-chart-line mr-2"></i>Generate Progress Report
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Group Therapy Management</h1>
              <p className="mt-1 text-sm text-gray-600">Manage therapy groups and sessions</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="mt-4 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
            >
              <i className="fas fa-plus mr-2"></i>
              <span>Create New Group</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Groups List - Left Side */}
          <div className="lg:col-span-1">
            {/* Search and Filter */}
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search groups..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                </div>
                
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Groups</option>
                  <option value="active">Active</option>
                  <option value="enrolling">Enrolling</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Groups List */}
            <div className="space-y-3">
              {filteredGroups.map((group) => (
                <div
                  key={group.id}
                  className={`bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow ${
                    selectedGroup?.id === group.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedGroup(group)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-1">{group.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      group.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {group.status}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <i className="fas fa-user-md mr-2 w-4"></i>
                      <span className="line-clamp-1">{group.facilitator}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-users mr-2 w-4"></i>
                      <span>{group.members}/{group.maxMembers} members</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-clock mr-2 w-4"></i>
                      <span>{group.schedule}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{group.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${group.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-4 bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{groups.length}</div>
                  <div className="text-xs text-gray-600">Total Groups</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {groups.filter(g => g.status === 'active').length}
                  </div>
                  <div className="text-xs text-gray-600">Active</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {groups.reduce((sum, g) => sum + g.members, 0)}
                  </div>
                  <div className="text-xs text-gray-600">Total Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">12</div>
                  <div className="text-xs text-gray-600">This Week</div>
                </div>
              </div>
            </div>
          </div>

          {/* Group Details - Right Side */}
          <div className="lg:col-span-2">
            {selectedGroup ? (
              <SessionDetails group={selectedGroup} />
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <i className="fas fa-users text-6xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Select a Group</h3>
                <p className="text-gray-500">Choose a group from the list to view details and manage sessions</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showCreateModal && <CreateGroupModal />}
    </div>
  );
};

export default GroupTherapy;