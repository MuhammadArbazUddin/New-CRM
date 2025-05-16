import { useState } from 'react';
import { Search, Filter, Users, MapPin, Calendar, Mail, LogIn, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StaffDashboard() {
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data
  const users = [
    {
      id: 1,
      hrCode: 'HR001',
      fullName: 'John Smith',
      email: 'john.smith@company.com',
      birthday: '15 Apr 1985',
      sex: 'Male',
      role: 'CEO/Founder',
      lastLogin: '2 hours ago',
      active: true,
      status: 'Active',
    },
    {
      id: 2,
      hrCode: 'HR002',
      fullName: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      birthday: '22 Jun 1990',
      sex: 'Female',
      role: 'IT & Tech Dept',
      lastLogin: '5 days ago',
      active: true,
      status: 'Active',
    },
    {
      id: 3,
      hrCode: 'HR003',
      fullName: 'Michael Wong',
      email: 'michael.w@company.com',
      birthday: '10 Jan 1988',
      sex: 'Male',
      role: 'IT & Tech Dept',
      lastLogin: '2 months ago',
      active: false,
      status: 'Inactive',
    },
    
  ];

  // Filter users based on search and filter selections
  const filteredUsers = users.filter((user) => {
    // Apply search filter
    const matchesSearch = searchQuery === '' || 
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.hrCode.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply role filter
    const matchesRole = roleFilter === '' || user.role === roleFilter;
    
    // Apply status filter
    const matchesStatus = statusFilter === '' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const StatusBadge = ({ status }) => {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        status === 'Active' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        <Circle className={`mr-1 h-2 w-2 ${
          status === 'Active' ? 'text-green-400' : 'text-red-400'
        }`} />
        {status}
      </span>
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen  p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <h1 className="text-xl font-semibold">Staff Management</h1>
          <Link to='/hrm/member' className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium transition-all hover:bg-blue-50">
            <Users size={18} />
            Add New Staff
          </Link>
        </div>

        {/* Filters */}
        <div className="p-6 bg-white border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search by name, email or HR code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            </div>

            <div className="flex flex-1 gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-auto">
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="appearance-none pl-10 pr-8 py-2.5 w-full md:w-48 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="">All Roles</option>
                  <option value="CEO/Founder">CEO/Founder</option>
                  <option value="IT & Tech Dept">IT & Tech Dept</option>
                </select>
                <Filter className="absolute left-3 top-3 text-gray-400" size={18} />
              </div>

              <div className="relative w-full md:w-auto">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none pl-10 pr-8 py-2.5 w-full md:w-48 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <Circle className="absolute left-3 top-3 text-gray-400" size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Staff Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                          {user.fullName.split(' ').map(name => name[0]).join('')}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                        <div className="text-sm text-gray-500">ID: {user.id} • HR: {user.hrCode}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.role}</div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={14} className="mr-1" />
                      {user.birthday}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-blue-600">
                      <Mail size={14} className="mr-1" />
                      {user.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <LogIn size={14} className="mr-1" />
                      Last login: {user.lastLogin}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="inline-flex items-center px-3 py-1.5 border border-blue-600 text-blue-600 bg-white hover:bg-blue-50 rounded-md transition-colors">
                      <MapPin size={14} className="mr-1" />
                      View Location
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
          Showing {filteredUsers.length} of {users.length} staff members
        </div>
      </div>
    </div>
  );
}