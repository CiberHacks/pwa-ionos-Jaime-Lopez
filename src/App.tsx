import { useEffect, useState } from 'react';
import './App.css';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  // Estado inicial cargando de LocalStorage
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('pwa-tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [input, setInput] = useState('');

  // Persistencia: Cada vez que 'tasks' cambia, guardamos en LocalStorage
  useEffect(() => {
    localStorage.setItem('pwa-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === '') return;
    const newTask: Task = {
      id: Date.now(),
      text: input,
      completed: false
    };
    setTasks([...tasks, newTask]);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">✨ Task Manager PWA</h1>
        <p className="app-subtitle">Desarrollo Web Profesional - UTT</p>
      </header>
      
      <div className="input-section">
        <input 
          className="task-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe una nueva tarea..."
        />
        <button className="btn btn-primary" onClick={addTask}>
          <span>➕</span>
          Añadir
        </button>
      </div>

      {tasks.length > 0 ? (
        <ul className="tasks-list">
          {tasks.map(task => (
            <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <div className="task-content" onClick={() => toggleTask(task.id)}>
                <div className="task-checkbox"></div>
                <span className="task-text">{task.text}</span>
              </div>
              <button className="btn btn-danger" onClick={() => deleteTask(task.id)}>
                🗑️
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <p className="empty-text">No hay tareas pendientes</p>
        </div>
      )}
    </div>
  )
}

export default App