import React, { useEffect } from 'react';
import { ActiveUser } from '../pages/_app.js'
import { useContext, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import { updateUser } from '@/graphql/mutations.js';
import { onUpdateUser } from '@/graphql/subscriptions.js';
import { API } from '@aws-amplify/api';

export default function AppUsers(){
    const activeUser = useContext(ActiveUser);
    const [users, setUsers] = useState(activeUser.users);
    let groupList = ['Student', 'Faculty', 'Chair Committee'];

    useEffect(() => {
        
        const updateUser = API.graphql({
            query: onUpdateUser,
            authMode: 'AMAZON_COGNITO_USER_POOLS',
          }).subscribe({
            next: (userData) => {
            setUsers((prevUsers) => {
                return prevUsers.map((user) => {
                    if(user.id === userData.value.data.onUpdateUser.id){
                        return userData.value.data.onUpdateUser;
                    }
                    else{
                        return user;
                    }
                })
            })
        }})
        

          return () => {
            updateUser.unsubscribe();
          }
    }, [])

    const handleUserVerification = async (e, user) => {
        e.preventDefault();
        try{
            await API.graphql({
                query: updateUser,
                variables: {
                    input: {
                        id: user.id,
                        verified: true
                    }
                },
                authMode: 'AMAZON_COGNITO_USER_POOLS'
            })
            .then((res) => {
                console.log(res);
            }
            )
            .catch((err) => {
                console.log(err);
            }
            )
        } catch (err) {
            console.log(err);
        }
    }

    const handleGroup = async (e, group, user) => {
        e.preventDefault();
        try{
            await API.graphql({
                query: updateUser,
                variables: {
                    input: {
                        id: user.id,
                        groups: [group]
                    }
                },
            })
            .then((res) => {
                console.log(res);
            }
            )
            .catch((err) => {
                console.log(err);
            }
            )
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div>
            <h1>Applicants List</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 400 }} aria-label="caption table">
                    <caption>Users</caption>
                    <TableHead>
                    <TableRow>
                        <TableCell><b>Name</b></TableCell>
                        <TableCell align="right"><b>Username</b></TableCell>
                        <TableCell align="right"><b>Email</b></TableCell>
                        {console.log(activeUser.group[0])}
                        { activeUser.group[0] === 'Admin' ? 
                        <>
                            <TableCell align="right"><b>Group</b></TableCell>
                            <TableCell align="right"><b>Verified</b></TableCell>
                        </> :
                        <>
                            <TableCell align="right"><b>Upload File</b></TableCell>
                        </>
                        }
                        
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {users.filter(user => user.username != activeUser.username).map((user) => {
                        return (
                        <TableRow key={user.id}>
                        <TableCell component="th" scope="row">
                            {user.name}
                        </TableCell>
                        <TableCell align="right">{user.username}</TableCell>
                        <TableCell align="right">{user.email}</TableCell>
                        
                        {/* ONLY ADMIN */}
                        { activeUser.group[0] === 'Admin' ? 
                        <>
                            <TableCell align="right">
                            <select name="plan" id="plan">
                                <option onClick={(e) => handleGroup(e, 'Student', user)}>{user.groups[0]}</option>
                                {
                                    groupList.filter((group) => group != user.groups[0]).map((group) => ( 
                                        <option key={group} onClick={(e) => handleGroup(e, group, user)}>{group}</option>))
                                }
                            </select>
                            </TableCell>
                            <TableCell align='right'>
                            {
                                user.verified ? 
                                <Button variant="contained" color="success">
                                    Verified
                                </Button> :
                                <Button variant="outlined" color="error" onClick={(e) => handleUserVerification(e, user)}>
                                    Click to verify
                                </Button> 
                            }
                            </TableCell>
                        </> :
                        <>
                            <TableCell align="right">
                                <input type="file" id="myfile" name="myfile" />
                            </TableCell>
                        </>

                        }
                        {/* ONLY ADMIN */}



                        </TableRow>
                    )})}

                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}