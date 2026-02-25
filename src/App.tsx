import { useEffect, useState } from 'react';

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

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h1>PWA Task Manager</h1>
      <p style={{ fontSize: '0.8rem', color: '#666' }}>Materia: Desarrollo Web Profesional (UTT)</p>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nueva tarea..."
          style={{ flex: 1, padding: '8px' }}
        />
        <button onClick={addTask} style={{ padding: '8px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px' }}>
          Añadir
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            padding: '10px', 
            borderBottom: '1px solid #eee',
            background: task.completed ? '#f0f0f0' : 'transparent'
          }}>
            <span 
              onClick={() => toggleTask(task.id)} 
              style={{ cursor: 'pointer', textDecoration: task.completed ? 'line-through' : 'none' }}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      
      {tasks.length === 0 && <p>No hay tareas pendientes.</p>}
    </div>
  )
}

export default App