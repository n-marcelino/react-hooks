import React, { useState } from 'react';
import Button from './Button'

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState('');
    const [strikeThroughCSS, setStrikeThroughCSS] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    let nextId = tasks.length ? Math.max(...tasks.map(task => task.id)) + 1 : 1; // Generate next ID based on existing tasks

    const handleAddTask = () => {
        if (text.trim() !== '') {
            if (isEditing) {
                setTasks(tasks.map(task =>
                    task.id === currentTask.id ? { ...task, text: text } : task
                ));
                setIsEditing(false);
                setCurrentTask(null);
            } else {
                setTasks([
                    ...tasks,
                    { id: nextId++, text: text, completed: false }
                ]);
            }
            setText('');
        }
    };

    const handleInputChange = (event) => {
        setText(event.target.value);
    };

    const handleEditTask = (task) => {
        setIsEditing(true);
        setCurrentTask(task);
        setText(task.text);
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    return (
        <div>
            <h2>Task Manager</h2>
            <input
                type="text"
                value={text}
                onChange={handleInputChange}
                placeholder="Enter new task"
            />
            <Button onClick={handleAddTask}>{isEditing ? 'Update Task' : 'Add Task'}</Button>
            <ul style={{listStyleType:'none', paddingLeft:0}}>
                {tasks.map(task => (
                    <li key={task.id} style={{textDecoration: task.completed ? "line-through" : "none"}}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => {
                                setTasks(tasks.map(t =>
                                    t.id === task.id ? { ...t, completed: !t.completed } : t
                                ));
                            }}
                        />
                        {task.text}
                        <Button onClick={() => handleEditTask(task)}>Edit</Button>
                        <Button onClick={() => handleDeleteTask(task.id)}>Delete</Button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskManager;
