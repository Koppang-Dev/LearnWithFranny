import { useRouter } from "next/router";
import { useState } from "react";

// SignIn component handles user login
export default function SignIn() {
  const router = useRouter();

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  // Updates state with form input values
  function handleChange(e) {
    const copy = { ...state };
    copy[e.target.name] = e.target.value;
    setState(copy);
  }

  async function handleSubmit() {
    // Send a POST request to the server with the user's credentials
    const res = await fetch("https://localhost:3001", {
      method: "POST",
      body: JSON.stringify(state),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      // Store the token in localStorage on successful login

      const json = await res.json();
      localStorage.setItem("token", json.token);
      router.push("/dashboard");
    } else {
      alert("Bad Credentials");
    }
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Sign In</h1>
        <div className={styles.form}>
          <input
            className={styles.input}
            type="text"
            name="username"
            placeholder="username"
            value={state.username}
            onChange={handleChange}
            autoComplete="off"
          />
          <input
            className={styles.input}
            type="password"
            name="password"
            placeholder="password"
            value={state.password}
            onChange={handleChange}
          />
          <button className={styles.btn} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </Layout>
  );
}
