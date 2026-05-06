const API_BASE_URL = "https://hospital-management-xzxg.onrender.com/api";

export async function loginUser(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}

export async function getPatients() {
  const token = localStorage.getItem("hospitalToken");

  const response = await fetch(`${API_BASE_URL}/patients`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch patients");
  }

  return data;
}

export async function createPatient(patientData) {
  const token = localStorage.getItem("hospitalToken");

  const response = await fetch(`${API_BASE_URL}/patients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(patientData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create patient");
  }

  return data;
}

export async function deletePatient(patientId) {
  const token = localStorage.getItem("hospitalToken");

  const response = await fetch(`${API_BASE_URL}/patients/${patientId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete patient");
  }

  return data;
}

export async function updatePatient(patientId, updatedData) {
  const token = localStorage.getItem("hospitalToken");

  const response = await fetch(`${API_BASE_URL}/patients/${patientId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update patient");
  }

  return data;
}

export async function getDoctors() {
  const token = localStorage.getItem("hospitalToken");

  const response = await fetch(`${API_BASE_URL}/doctors`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch doctors");
  }

  return data;
}

export async function createDoctor(doctorData) {
  const token = localStorage.getItem("hospitalToken");

  const response = await fetch(`${API_BASE_URL}/doctors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(doctorData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create doctor");
  }

  return data;
}

export async function updateDoctor(doctorId, updatedData) {
  const token = localStorage.getItem("hospitalToken");

  const response = await fetch(`${API_BASE_URL}/doctors/${doctorId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update doctor");
  }

  return data;
}

export async function deleteDoctor(doctorId) {
  const token = localStorage.getItem("hospitalToken");

  const response = await fetch(`${API_BASE_URL}/doctors/${doctorId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete doctor");
  }

  return data;
}

export async function getAppointments() {
  const token = localStorage.getItem("hospitalToken");

  const res = await fetch(`${API_BASE_URL}/appointments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);
  return data;
}

export async function createAppointment(appointmentData) {
  const token = localStorage.getItem("hospitalToken");

  const res = await fetch(`${API_BASE_URL}/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(appointmentData),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);
  return data;
}

export async function updateAppointment(id, dataToUpdate) {
  const token = localStorage.getItem("hospitalToken");

  const res = await fetch(`${API_BASE_URL}/appointments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dataToUpdate),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);
  return data;
}

export async function deleteAppointment(id) {
  const token = localStorage.getItem("hospitalToken");

  const res = await fetch(`${API_BASE_URL}/appointments/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);
  return data;
}