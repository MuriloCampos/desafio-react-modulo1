import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      "title": "Novo Projeto",
      "url": "http://novoprojeto.com",
      "techs": ["ReactJS", "NodeJS"]
    });

    const project = response.data;

    setRepositories([...repositories, project]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(
      setRepositories(repositories.filter(repository => repository.id !== id))
    );
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
