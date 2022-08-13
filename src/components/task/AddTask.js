import React, { useState } from 'react';
import TaskService from "../../service/task.services";
import { Form, InputGroup, Button } from "react-bootstrap";
import '../../styles/AddTask.css';

export const AddTask = () => {

    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    // handle form submit
    const handleSubmit = async (e) => {

        e.preventDefault();

        // get the current date
        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

        const newTask = {
            taskName, taskDescription, date
        }

        // validate required details
        if (taskName === "" || taskDescription === "") {
            alert("Please fill the required details");
            return;
        }

        try {
            await TaskService.addTasks(newTask);
            setTaskName("");
            setTaskDescription("");
        } catch (err) {
            console.log(err);
            return;
        }
    };

    return (
        <div id='mainDiv'>
            <form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                <h1>Add new task</h1>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Task name"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Task description"
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                        />
                    </InputGroup>
                </Form.Group>

                <Button variant="primary" type="Submit">
                    Add Task
                </Button>
            </form>
        </div>
    )
}
