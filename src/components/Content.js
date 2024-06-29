// src/Content.js
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { TaskProvider } from '../context/TaskContext';
import TaskManager from './TaskManager';

const Content = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <div style={{ background: theme === 'light' ? '#f9f9f9' : '#555', color: theme === 'light' ? '#000' : '#fff', padding: '20px' }}>
            <TaskProvider>
                <TaskManager />
            </TaskProvider>
        </div>
    );
};

export default Content;
