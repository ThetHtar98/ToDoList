import React, { useState, useEffect } from 'react';
import { Button, ListGroup, Form, InputGroup } from 'react-bootstrap';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState('');

    // Load todos from local storage on component mount
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        if (storedTodos) {
            setTodos(storedTodos);
        }
    }, []);

    // Save todos to local storage whenever the todos state changes
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    // Add a new todo item
    const handleAddTodo = () => {
        if (newTodo.trim() !== '') {
            setTodos([...todos, { text: newTodo, completed: false }]);
            setNewTodo('');
        }
    };

    // Start editing a todo item
    const handleEditTodo = (index) => {
        setEditIndex(index);
        setEditText(todos[index].text);
    };

    // Save the edited todo item
    const handleSaveEdit = () => {
        const updatedTodos = todos.map((todo, index) =>
            index === editIndex ? {...todo, text: editText } : todo
        );
        setTodos(updatedTodos);
        setEditIndex(null);
        setEditText('');
    };

    // Delete a todo item
    const handleDeleteTodo = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    // Toggle completion status of a todo item
    const handleToggleComplete = (index) => {
        const updatedTodos = todos.map((todo, i) =>
            i === index ? {...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    };

    return ( <
        div className = "container mt-4" >
        <
        h1 className = "mb-4" > Todo List < /h1> <
        InputGroup className = "mb-3" >
        <
        Form.Control type = "text"
        placeholder = "Add new todo"
        value = { newTodo }
        onChange = {
            (e) => setNewTodo(e.target.value)
        }
        /> <
        Button variant = "primary"
        onClick = { handleAddTodo } >
        Add Todo <
        /Button> < /
        InputGroup >

        <
        ListGroup > {
            todos.map((todo, index) => ( <
                ListGroup.Item key = { index }
                className = { `d-flex justify-content-between align-items-center ${todo.completed ? 'bg-light' : ''}` } >
                <
                div className = "d-flex align-items-center" >
                <
                Form.Check type = "checkbox"
                checked = { todo.completed }
                onChange = {
                    () => handleToggleComplete(index)
                }
                className = "me-2" /
                >
                <
                span className = { `me-2 ${todo.completed ? 'text-decoration-line-through' : ''}` }

                >
                {
                    editIndex === index ? ( <
                        Form.Control type = "text"
                        value = { editText }
                        onChange = {
                            (e) => setEditText(e.target.value)
                        }
                        />
                    ) : (
                        todo.text
                    )
                } <
                /span> < /
                div > <
                div > {
                    editIndex === index ? ( <
                        >
                        <
                        Button variant = "success"
                        className = "me-2"
                        onClick = { handleSaveEdit } >
                        Save <
                        /Button> <
                        Button variant = "secondary"
                        onClick = {
                            () => setEditIndex(null)
                        } >
                        Cancel <
                        /Button> < / >
                    ) : ( <
                        >
                        <
                        Button variant = "warning"
                        className = "me-2"
                        onClick = {
                            () => handleEditTodo(index)
                        } >
                        Edit <
                        /Button> <
                        Button variant = "danger"
                        onClick = {
                            () => handleDeleteTodo(index)
                        } >
                        Delete <
                        /Button> < / >
                    )
                } <
                /div> < /
                ListGroup.Item >
            ))
        } <
        /ListGroup> < /
        div >
    );
};

export default TodoList;