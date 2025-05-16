import React, { useState } from 'react';

const TABS = ['Profile', 'Permissions'];

const HRMProfileForm = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [formData, setFormData] = useState({});
  const [sendWelcomeEmail, setSendWelcomeEmail] = useState(true);

  // Employee form fields
  const fields = [
    { name: 'hrCode', label: 'HR code', required: true },
    { name: 'fullName', label: 'Full name', required: true },
    { name: 'sex', label: 'Sex', type: 'select' },
    { name: 'birthday', label: 'Birthday', type: 'date' },
    { name: 'birthplace', label: 'Birthplace' },
    { name: 'hometown', label: 'Hometown' },
    { name: 'maritalStatus', label: 'Marital status', type: 'select' },
    { name: 'nationality', label: 'Nationality' },
    { name: 'religion', label: 'Religion' },
    { name: 'identification', label: 'Identification' },
    { name: 'daysForIdentity', label: 'Days for identity', type: 'date' },
    { name: 'placeOfIssue', label: 'Place of issue' },
    { name: 'resident', label: 'Resident' },
    { name: 'homeAddress', label: 'Current Home Address' },
    { name: 'literacy', label: 'Literacy' },
    { name: 'status', label: 'Status', type: 'select' },
    { name: 'jobPosition', label: 'Job position', type: 'select' },
    { name: 'workplace', label: 'Workplace', type: 'select' },
    { name: 'bankAccount', label: 'Bank Account #' },
    { name: 'accountName', label: 'Name of account' },
    { name: 'bankOfIssue', label: 'Bank of issue' },
    { name: 'taxCode', label: 'Personal tax code' },
    { name: 'amount', label: 'Amount', type: 'number' },
    { name: 'fullName2', label: 'Full Name' },
    { name: 'facebook', label: 'Facebook' },
    { name: 'linkedin', label: 'LinkedIn' },
    { name: 'skype', label: 'Skype' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'defaultLanguage', label: 'Default Language', type: 'select' },
    { name: 'direction', label: 'Direction', type: 'select' },
    { name: 'emailSignature', label: 'Email Signature', type: 'textarea' },
    { name: 'otherDetails', label: 'Other Details', type: 'textarea' },
    { name: 'password', label: 'Password', type: 'password', required: true },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', { ...formData, sendWelcomeEmail });
  };

  // Permissions section data
  const permissionData = [
    { name: "Bulk PDF Export", capabilities: ["View (Global)"] },
    { name: "Projects", capabilities: ["View (Own)", "View (Global)", "Create", "Edit", "Delete"] },
    { name: "Credit Notes", capabilities: ["View (Own)", "View (Global)", "Create", "Edit", "Delete"] },
    { name: "Employees", capabilities: ["View (Own)", "View (Global)", "Create", "Edit", "Delete"] },
    { name: "Email Templates", capabilities: ["View (Global)", "Edit"] },
    { name: "Estimates", capabilities: ["View (Own)", "View (Global)", "Create", "Edit", "Delete"] },
    { name: "Expenses", capabilities: ["View (Own)", "View (Global)", "Create", "Edit", "Delete"] },
    { name: "Invoices", capabilities: ["View (Own)", "View (Global)", "Create", "Edit", "Delete"] },
    { name: "Items", capabilities: ["View (Global)", "Create", "Edit", "Delete"] },
    { name: "Newsletter", capabilities: ["View (Global)", "Create", "Edit", "Delete"] },
    { name: "Payments", capabilities: ["View (Own)", "View (Global)", "Create", "Edit", "Delete"] },
    { name: "Duties", capabilities: ["View (Own)", "View (Global)", "Create", "Edit", "Delete"] },
    { name: "Proposals", capabilities: ["View (Own)", "View (Global)", "Create", "Edit", "Delete"] },
    { name: "Reports", capabilities: ["View (Global)", "View Timesheets Report"] },
    { name: "Staff Roles", capabilities: ["View (Global)", "Create", "Edit", "Delete"] },
    { name: "Settings", capabilities: ["View (Global)", "Edit"] },
    { name: "Staff", capabilities: ["View (Global)", "Create", "Edit", "Delete"] },
    { name: "Track Payments", capabilities: ["View (Own)", "View (Global)", "Create", "Edit", "Delete"] },
    { name: "Tasks", capabilities: ["View (Own)", "View (Global)", "Create", "Edit", "Delete"] },
    { name: "Task Checklist Templates", capabilities: ["Create", "Delete"] },
    { name: "Request", capabilities: ["View (Own)", "View (Global)", "Create", "Edit", "Delete"] },
    { name: "Leads", capabilities: ["View (Global)", "Delete"] },
    { name: "Custom Links", capabilities: ["View (Global)", "Create", "Edit", "Delete"] },
    { name: "HRM", capabilities: ["View (Global)", "Create", "Edit", "Delete"] },
    { name: "Timesheet - Attendance", capabilities: ["View", "View (Global)"] },
    { name: "Timesheet - Leave", capabilities: ["View", "View (Global)"] },
    { name: "Work routes", capabilities: ["View", "View (Global)"] },
    { name: "Timesheet - Additional Work Hours", capabilities: ["View", "View (Global)"] },
    { name: "Timesheet - Work shift table", capabilities: ["View", "View (Global)"] },
    { name: "Timesheet - Report", capabilities: ["View", "View (Global)"] },
    { name: "Timesheet - Workplace management", capabilities: ["View", "View (Global)"] },
    { name: "Appointments", capabilities: ["View (Global)", "View (Own)", "Create", "Edit", "Delete"] },
    { name: "Chat Module", capabilities: ["Grant Access"] },
  ];

  // Handle checkbox change for permissions
  const [permissions, setPermissions] = useState({});

  const handlePermissionChange = (feature, capability) => {
    setPermissions(prev => {
      const updatedPermissions = prev[feature] || [];
      if (updatedPermissions.includes(capability)) {
        return {
          ...prev,
          [feature]: updatedPermissions.filter(perm => perm !== capability),
        };
      } else {
        return {
          ...prev,
          [feature]: [...updatedPermissions, capability],
        };
      }
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Tabs */}
      <div className="flex mb-4 border-b">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`mr-4 px-4 py-2 font-semibold border-b-2 ${activeTab === tab ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'Profile' && (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fields.map((field, i) => (
            <div key={i} className={field.type === 'textarea' ? 'col-span-full' : ''}>
              <label className="block font-medium mb-1">
                {field.required && <span className="text-red-500 mr-1">*</span>}
                {field.label}
              </label>
              {field.type === 'select' ? (
                <select
                  name={field.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  <option value="">None selected</option>
                  {field.name === 'defaultLanguage' && (
                    <>
                      <option value="en">English</option>
                      <option value="fr">French</option>
                      <option value="es">Spanish</option>
                    </>
                  )}
                  {field.name === 'direction' && (
                    <>
                      <option value="ltr">Left to Right</option>
                      <option value="rtl">Right to Left</option>
                    </>
                  )}
                  {field.name === 'status' && (
                    <>
                      <option value="active">Active</option>
                      <option value="maternity-leave">Maternity Leave</option>
                      <option value="inactive">Inactive</option>
                    </>
                  )}
                </select>
              ) : field.type === 'date' ? (
                <input
                  type="date"
                  name={field.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                />
              ) : field.type === 'number' ? (
                <div className="flex items-center">
                  <input
                    type="number"
                    name={field.name}
                    onChange={handleChange}
                    className="w-full border rounded-l-lg px-4 py-2"
                    defaultValue="0"
                  />
                  <span className="bg-gray-100 border border-l-0 rounded-r-lg px-4 py-2">£</span>
                </div>
              ) : field.type === 'textarea' ? (
                <textarea
                  name={field.name}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border rounded-lg px-4 py-2"
                />
              ) : (
                <input
                  type={field.type || 'text'}
                  name={field.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder={field.label}
                />
              )}
            </div>
          ))}

          {/* Welcome Email Checkbox */}
          <div className="col-span-full flex items-center mt-2">
            <input
              type="checkbox"
              checked={sendWelcomeEmail}
              onChange={() => setSendWelcomeEmail(prev => !prev)}
              className="mr-2"
            />
            <label className="font-medium">Send welcome email</label>
          </div>

          <div className="col-span-full text-right mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      )}

      {/* Permissions Tab */}
      {activeTab === 'Permissions' && (
        <div>
          <h2 className="text-2xl font-semibold mb-2">Role</h2>
          <select id="role" name="role" className="w-full mb-3 border rounded-lg px-4 py-2">
            <option value="">Select a role</option>
            <option value="srid">SRID</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="employee">Employee</option>
          </select>
          <h2 className="text-2xl font-semibold mb-4">Permissions</h2>
          {permissionData.map((feature) => (
            <div key={feature.name} className="mb-6">
              <h3 className="text-lg font-semibold">{feature.name}</h3>
              <div className="space-y-2">
                {feature.capabilities.map((capability) => (
                  <label key={capability} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={permissions[feature.name]?.includes(capability) || false}
                      onChange={() => handlePermissionChange(feature.name, capability)}
                      className="h-4 w-4"
                    />
                    <span>{capability}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="col-span-full text-right mt-4">
            <button
              type="button"
              onClick={() => console.log(permissions)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700"
            >
              Save Permissions
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRMProfileForm;
