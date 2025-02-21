/* eslint-disable react/prop-types */
// src/components/TaskForm.jsx
// You need to write the code for TaskForm component in the TaskForm.jsx file.

import  { useState } from "react";
import axios from "axios"

export default function TaskForm({ onTaskCreated }) {
    const [formData,setFormData]=useState({
        title:"",
        dueDate: '',
        priority: 'Medium',
        status: 'To Do'
    })

    const [error,setError]=useState("")
    
    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        })
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        setError("")

        if(!formData.title.trim() || !formData.dueDate){
            setError('Please fill in all required fields');
            return;
        }

        try {
            await axios.post('http://localhost:3000/tasks', formData);
            // Clear form
            setFormData({
                title: '',
                dueDate: '',
                priority: 'Medium',
                status: 'To Do'
            });
            // Refresh task list
            if (onTaskCreated) {
                onTaskCreated();
            }
        } catch (error) {
            setError('Failed to create task. Please try again.');
            console.error('Error:', error);
        }
        
    }

    return (
        <div className="task-form-container" style={{ maxWidth: '500px', margin: '20px auto', padding: '20px' }}>
        <h2>Create New Task</h2>
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
                <label htmlFor="title">Title:*</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px' }}
                    required
                />
            </div>

            <div>
                <label htmlFor="dueDate">Due Date:*</label>
                <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px' }}
                    required
                />
            </div>

            <div>
                <label htmlFor="priority">Priority:</label>
                <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px' }}
                >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>

            <div>
                <label htmlFor="status">Status:</label>
                <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px' }}
                >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
            </div>

            <button 
                type="submit"
                style={{
                    padding: '10px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Create Task
            </button>
        </form>
    </div>
    );
}