// src/TaskManager.js
import React, { useState, useContext, useMemo, useRef } from 'react';
import Button from './Button';
import { TaskContext } from '../context/TaskContext';

const TaskManager = () => {
    const [text, setText] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [filter, setFilter] = useState('all');
    const { tasks, addTask, toggleTaskCompletion, deleteTask, editTask } = useContext(TaskContext);
    const inputRef = useRef(null);

    const handleAddOrEditTask = () => {
        if (editingTaskId) {
            editTask(editingTaskId, text);
            setEditingTaskId(null);
        } else {
            addTask(text);
        }
        setText('');
        inputRef.current.focus();
    };

    const handleInputChange = (event) => {
        setText(event.target.value);
    };

    const handleEditClick = (task) => {
        setText(task.text);
        setEditingTaskId(task.id);
    };

    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            if (filter === 'all') return true;
            if (filter === 'completed') return task.completed;
            if (filter === 'incomplete') return !task.completed;
        });
    }, [tasks, filter]);

    return (
        <div>
            <h2>Task Manager</h2>
            <input
                type="text"
                value={text}
                onChange={handleInputChange}
                placeholder="Enter new task"
                ref={inputRef}
            />
            <Button onClick={handleAddOrEditTask}>
                {editingTaskId ? 'Edit Task' : 'Add Task'}
            </Button>
            <div>
                <Button onClick={() => setFilter('all')}>All</Button>
                <Button onClick={() => setFilter('completed')}>Completed</Button>
                <Button onClick={() => setFilter('incomplete')}>Incomplete</Button>
            </div>
            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                {filteredTasks.map(task => (
                    <li key={task.id} style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTaskCompletion(task.id)}
                        />
                        {task.text}
                        <button onClick={() => handleEditClick(task)}>Edit</button>
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskManager;
