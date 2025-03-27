import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SettingsButton from '@/components/SettingsButton';

export default function DepartmentManagement() {
  const { organizationId } = useParams();
  const [departments, setDepartments] = useState([]);
  const [newDept, setNewDept] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/organization/${organizationId}/departments`);
      const result = await response.json();
      if (result.departments) {
        setDepartments(result.departments);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [organizationId]);

  const handleCreate = async () => {
    try {
      const response = await fetch('/api/department', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newDept,
          organizationId
        }),
      });
      
      if (response.ok) {
        setNewDept({ name: '', description: '' });
        fetchDepartments();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">Department Management</h1>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              className="px-4 py-2 bg-zinc-900 border border-gray-800 rounded-lg"
              placeholder="Department Name"
              value={newDept.name}
              onChange={e => setNewDept(prev => ({ ...prev, name: e.target.value }))}
            />
            <input
              type="text"
              className="px-4 py-2 bg-zinc-900 border border-gray-800 rounded-lg"
              placeholder="Description"
              value={newDept.description}
              onChange={e => setNewDept(prev => ({ ...prev, description: e.target.value }))}
            />
            <SettingsButton onClick={handleCreate}>
              Create Department
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
              {departments.map((dept) => (
                <tr key={dept.id}>
                  <td className="px-6 py-4 border-b border-gray-800">{dept.name}</td>
                  <td className="px-6 py-4 border-b border-gray-800">{dept.description}</td>
                  <td className="px-6 py-4 border-b border-gray-800">
                    <SettingsButton onClick={() => window.location.href = `/admin/department/${dept.id}/workspaces`}>
                      Workspaces
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