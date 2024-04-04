import { useState } from 'react';
import { Task } from './types';
import AddTask from './AddTask';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (taskName: string) => {
    setTasks([
      ...tasks,
      { id: Date.now(), title: taskName, isCompleted: false },
    ]);
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleEditTask = (taskId: number, newTitle: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, title: newTitle } : task,
      ),
    );
  };

  return (
    <div>
      <h1>Tasks</h1>
      <AddTask
        onAddTask={handleAddTask}
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTask}
      />
    </div>
  );
}

export default App;
