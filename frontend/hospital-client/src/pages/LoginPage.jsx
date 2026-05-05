import { useState } from "react";
import { loginUser } from "../api/api";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("admin@test.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const data = await loginUser(email, password);

      localStorage.setItem("hospitalToken", data.token);
      localStorage.setItem("hospitalUser", JSON.stringify(data.user));

      setError("");
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <h1>Hospital Login</h1>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleSubmit} className="login-form">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button type="submit">Login</button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;