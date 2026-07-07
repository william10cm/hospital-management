// Central role -> permission matrix for the UI.
// Keep this in sync with the backend route guards (authorizeRoles / hasRole).
//
// Action                 | admin | doctor | receptionist
// -----------------------|-------|--------|-------------
// Create appointment     |  yes  |   no   |     yes
// Update appointment     |  yes  |   no   |     yes
// Delete appointment     |  yes  |   no   |     yes
// Create patient         |  yes  |   no   |     yes
// Update patient         |  yes  |   no   |     yes
// Update patient status  |  yes  |  yes   |     yes
// Delete patient         |  yes  |   no   |     no
// Manage employees       |  yes  |   no   |     no
const has = (role, roles) => roles.includes(role);

export function getPermissions(role) {
  return {
    // Appointments
    canCreateAppointment: has(role, ["admin", "receptionist"]),
    canUpdateAppointment: has(role, ["admin", "receptionist"]),
    canDeleteAppointment: has(role, ["admin", "receptionist"]),
    // Patients
    canCreatePatient: has(role, ["admin", "receptionist"]),
    canUpdatePatient: has(role, ["admin", "receptionist"]),
    canUpdatePatientStatus: has(role, ["admin", "doctor", "receptionist"]),
    canDeletePatient: has(role, ["admin"]),
    // Employee (user) accounts
    canManageEmployees: has(role, ["admin"]),
  };
}
