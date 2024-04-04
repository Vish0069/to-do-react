import React, { useState } from 'react';
import { Task } from './types';

type AddTaskProps = {
  onAddTask: (taskName: string) => void;
  tasks: Task[];
  onDeleteTask: (taskId: number) => void;
  onEditTask: (taskId: number, newTitle: string) => void;
};

export default function AddTask({
  onAddTask,
  tasks,
  onDeleteTask,
  onEditTask,
}: AddTaskProps) {
  const [taskName, setTaskName] = useState('');
  const [editableTaskId, setEditableTaskId] = useState<number | null>(null);

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTaskName = taskName.trim();

    if (!trimmedTaskName) return;

    onAddTask(trimmedTaskName);
    setTaskName('');
  };

  const handleDeleteTask = (taskId: number) => {
    onDeleteTask(taskId);
  };

  const handleEditTask = (taskId: number, newTitle: string) => {
    onEditTask(taskId, newTitle);
    setEditableTaskId(null);
  };

  const handleToggleEdit = (taskId: number) => {
    setEditableTaskId(taskId === editableTaskId ? null : taskId);
  };

  return (
    <div>
      <form onSubmit={handleAddTask}>
        <label htmlFor="task-input">Add Task:</label>
        <input
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          id="task-input"
        />
        <button>Add</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {editableTaskId === task.id ? (
              <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            ) : (
              task.title
            )}
            <button onClick={() => handleToggleEdit(task.id)}>Edit</button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            {editableTaskId === task.id && (
              <button onClick={() => handleEditTask(task.id, taskName)}>
                Save
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
