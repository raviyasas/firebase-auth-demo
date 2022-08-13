import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TaskService from "../../service/task.services";

export const TaskList = () => {

    const [tasks, setTasks] = useState([]);
    const [existingTaskId, setExistingTaskId] = useState("");
    const [existingTaskName, setExistingTaskName] = useState("");
    const [existingTaskDescription, setExistingTaskDescription] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getTasks();
    }, [tasks])

    // update a task
    const handleUpdate = async () => {

        // get the current date
        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

        // validate required fields
        if (existingTaskName === "" || existingTaskDescription === "") {
            console.log("Required data missing");
            alert("Please fill the required details");
            return;
        }

        const updatedTask = {
            taskName: existingTaskName,
            taskDescription: existingTaskDescription,
            date
        }

        // call service class to update
        try {
            await TaskService.updateTask(existingTaskId, updatedTask);
        } catch (err) {
            console.log(err);
            return;
        }
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    }

    // retrive all tasks
    const getTasks = async () => {
        try {
            const data = await TaskService.getAllTasks();
            setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (err) {
            console.log(err);
            return;
        }
    }

    // update states when updating
    const editTask = async (id, name, description) => {
        setOpen(true);
        setExistingTaskId(id);
        setExistingTaskName(name);
        setExistingTaskDescription(description);
    }

    // confirmation before deleting
    const showConfirm = async (id) => {
        if (window.confirm('Are you sure you want to delete this?')) {
            try {
                await TaskService.deleteTask(id)
            } catch (err) {
                console.log(err);
                return;
            }
        }
    }

    return (
        <div id='tableDiv'>
            <h1> View Tasks</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" >Task Name</TableCell>
                            <TableCell align="left">Task description</TableCell>
                            <TableCell align="left">Operations</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map(task => (
                            <TableRow
                                key={task.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{task.taskName}</TableCell>
                                <TableCell align="left">{task.taskDescription}</TableCell>
                                <TableCell align="left">
                                    <Stack direction="row" spacing={2}>
                                        <Button variant="outlined" onClick={(e) => editTask(task.id, task.taskName, task.taskDescription)}>
                                            Edit
                                        </Button>

                                        <Button
                                            className="delete"
                                            onClick={(e) => showConfirm(task.id)}
                                            color="error"
                                            variant="outlined"
                                        >
                                            Delete
                                        </Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleUpdate}>
                <h1>Update Task</h1>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        value={existingTaskName}
                        label="New Task name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setExistingTaskName(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        value={existingTaskDescription}
                        label="New Task description"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setExistingTaskDescription(e.target.value)}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleUpdate}>Save</Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}
