import React, { useEffect, useState } from 'react';
import SettingsButton from '@/components/SettingsButton';

export default function OrganizationManagement() {
  const [organizations, setOrganizations] = useState([]);
  const [newOrg, setNewOrg] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/organizations');
      const result = await response.json();
      if (result.organizations) {
        setOrganizations(result.organizations);
      }
    } catch (error) {
      console.error('Failed to fetch organizations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const handleCreate = async () => {
    try {
      const response = await fetch('/api/organization', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrg),
      });
      
      if (response.ok) {
        setNewOrg({ name: '', description: '' });
        fetchOrganizations();
        console.log('Organization created successfully');
      }
    } catch (error) {
      console.error('Failed to create organization:', error);
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">Organization Management</h1>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              className="px-4 py-2 bg-zinc-900 border border-gray-800 rounded-lg"
              placeholder="Organization Name"
              value={newOrg.name}
              onChange={e => setNewOrg(prev => ({ ...prev, name: e.target.value }))}
            />
            <input
              type="text"
              className="px-4 py-2 bg-zinc-900 border border-gray-800 rounded-lg"
              placeholder="Description"
              value={newOrg.description}
              onChange={e => setNewOrg(prev => ({ ...prev, description: e.target.value }))}
            />
            <SettingsButton onClick={handleCreate}>
              Create Organization
            </SettingsButton>
          </div>
        </div>
        
        <div className="bg-zinc-900 rounded-lg shadow">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-800 text-left">Name</th>
                <th className="px-6 py-3 border-b border-gray-800 text-left">Description</th>
                <th className="px-6 py-3 border-b border-gray-800 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {organizations.map((org) => (
                <tr key={org.id}>
                  <td className="px-6 py-4 border-b border-gray-800">{org.name}</td>
                  <td className="px-6 py-4 border-b border-gray-800">{org.description}</td>
                  <td className="px-6 py-4 border-b border-gray-800">
                    <SettingsButton onClick={() => window.location.href = `/admin/organization/${org.id}/departments`}>
                      Departments
                    </SettingsButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 