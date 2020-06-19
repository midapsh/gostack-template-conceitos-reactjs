import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then(response => {
      if (response.data.results) {
        setRepositories(response.data.results);
      }
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: `Novo repositorio ${Date.now()}`,
      url: `Nova url ${Date.now()}`,
    });
    if (response.status === 200) {
      setRepositories([...repositories, response.data]);
    }
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    if (response.status === 204) {
      const newRepositories = repositories.filter(repository => repository.id !== id);
      setRepositories(newRepositories);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories && repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
