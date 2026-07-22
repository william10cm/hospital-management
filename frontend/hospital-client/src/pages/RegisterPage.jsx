import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";
import "./LoginPage.css";

const ROLE_OPTIONS = ["doctor", "receptionist"];

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("receptionist");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const data = await registerUser({ name, email, password, role });

      localStorage.setItem("hospitalToken", data.token);
      localStorage.setItem("hospitalUser", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <h1>Register User</h1>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleSubmit} className="login-form">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <label>Role</label>
          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            required
          >
            {ROLE_OPTIONS.map((roleOption) => (
              <option key={roleOption} value={roleOption}>
                {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
              </option>
            ))}
          </select>

          <button type="submit">Register</button>
        </form>

        <p className="login-link-row">
          Already have an account? <Link to="/">Back to login</Link>
        </p>
      </section>
    </main>
  );
}

export default RegisterPage;
