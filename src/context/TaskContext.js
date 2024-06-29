// src/TaskProvider.js
import React, { createContext, useReducer, useEffect, useCallback } from 'react';

// Define initial state
const initialState = [];

// Create the TaskContext
const TaskContext = createContext();

// Define the reducer function
const taskReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return [
                ...state,
                { id: state.length ? Math.max(...state.map(task => task.id)) + 1 : 1, text: action.payload, completed: false }
            ];
        case 'TOGGLE_TASK':
            return state.map(task =>
                task.id === action.payload ? { ...task, completed: !task.completed } : task
            );
        case 'DELETE_TASK':
            return state.filter(task => task.id !== action.payload);
        case 'EDIT_TASK':
            return state.map(task =>
                task.id === action.payload.id ? { ...task, text: action.payload.text } : task
            );
        case 'SET_TASKS':
            return action.payload;
        default:
            return state;
    }
};

// Define the TaskProvider component
const TaskProvider = ({ children }) => {
    const [tasks, dispatch] = useReducer(taskReducer, initialState);

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) {
            dispatch({ type: 'SET_TASKS', payload: savedTasks });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = useCallback((text) => {
        dispatch({ type: 'ADD_TASK', payload: text });
    }, [dispatch]);

    const toggleTaskCompletion = useCallback((taskId) => {
        dispatch({ type: 'TOGGLE_TASK', payload: taskId });
    }, [dispatch]);

    const deleteTask = useCallback((taskId) => {
        dispatch({ type: 'DELETE_TASK', payload: taskId });
    }, [dispatch]);

    const editTask = useCallback((taskId, text) => {
        dispatch({ type: 'EDIT_TASK', payload: { id: taskId, text } });
    }, [dispatch]);

    return (
        <TaskContext.Provider value={{ tasks, addTask, toggleTaskCompletion, deleteTask, editTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export { TaskContext, TaskProvider };
