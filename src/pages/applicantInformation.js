import React from "react"
import { useState, useEffect} from 'react'
import { useContext } from "react"

import { ActiveUser } from './_app.js'

import { TextField, Button } from '@mui/material'
import { Box } from '@mui/system'

import { createUser } from '../graphql/mutations'
import { API, graphqlOperation, Auth } from 'aws-amplify'


function ApplicantInformation() {
    const activeUser = useContext(ActiveUser);
    const [groupName, setGroupName] = useState('');
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setGroupName(activeUser.group);
        if(localStorage.getItem('formData')){
            setFormData(JSON.parse(localStorage.getItem('formData')));
        }
    }, [activeUser]);

    const handleSave = (e) => {
        e.preventDefault();
        localStorage.setItem('formData', JSON.stringify(formData));
    }

    const handleClearAll = (e) => {
        e.preventDefault();
        localStorage.removeItem('formData');
        setFormData({});
    }
    
    const handleForm = (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };

    const handleChange = async (e) => {
        e.preventDefault();
        try{
          const inputData = {
            firstName: firstName,
            lastName: lastName,
            classification: classification
          }
          await API.graphql(graphqlOperation(createUser, {input: inputData}))
        } catch(err) {
          console.log('error creating user: ', err)
        }
    }

    return (
        <div>
            {groupName &&
            <div>
                <div>
                    <h1>Applicant Information Form</h1>
                </div>

                <div>
                    <Box
                        component="form"
                        sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                    <div>
                        <label htmlFor="outlined-required">Full Name</label>
                        <br />
                        <br />
                        <TextField
                            required
                            id="outlined-required"
                            label="Required"
                            placeholder='Full Name'
                            name="fullName"
                            value={formData.fullName || ''}
                            // onChange={(e) => setFirstName(e.target.value)}
                            onChange={(e) => handleForm(e)}
                            />
                        <br />
                        <br />
                        <label htmlFor="outlined-required">ULM CWID #</label>
                        <br />
                        <br />
                        <TextField
                            required
                            id="outlined-required"
                            label="Required"
                            placeholder='ULM CWID'
                            name="cwid"
                            value={formData.cwid || ''}
                            // onChange={(e) => setLastName(e.target.value)}
                            onChange={(e) => handleForm(e)}
                            />
                        <br />
                        <br />
                        <label htmlFor="outlined-required">Cell Phone</label>
                        <br />
                        <br />
                        <TextField
                            required
                            id="outlined-required"
                            label="Required"
                            placeholder='Cell Phone'
                            name="cellPhone"
                            value={formData.cellPhone || ''}
                            // onChange={(e) => setClassification(e.target.value)}
                            onChange={(e) => handleForm(e)}
                            />
                        <br />
                        <br />
                        <label htmlFor="outlined-required">Alternative email</label>
                        <br />
                        <br />
                        <TextField
                            required
                            id="outlined-required"
                            label="Required"
                            placeholder='Alternative Email'
                            name="alternativeEmail"
                            value={formData.alternativeEmail || ''}
                            // onChange={(e) => setClassification(e.target.value)}
                            onChange={(e) => handleForm(e)}
                            />
                        <br />
                        <br />
                        <label htmlFor="outlined-required">Major(s)</label>
                        <br />
                        <br />
                        <TextField
                            required
                            id="outlined-required"
                            label="Required"
                            placeholder='Major(s)'
                            name="major"
                            value={formData.major || ''}
                            // onChange={(e) => setClassification(e.target.value)}
                            onChange={(e) => handleForm(e)}
                            />
                        <br />
                        <br />
                        <label htmlFor="outlined-required">Minor(s)</label>
                        <br />
                        <br />
                        <TextField
                            required
                            id="outlined-required"
                            label="Required"
                            placeholder='Minor(s)'
                            name="minor"
                            value={formData.minor || ''}
                            // onChange={(e) => setClassification(e.target.value)}
                            onChange={(e) => handleForm(e)}
                            />
                    </div>
                    <Button variant="contained"
                    onClick={(e) => {
                        handleSave(e)}}     
                    >Save</Button>
                    <br />
                    <Button variant="contained"
                    onClick={(e) => {
                        handleClearAll(e)}}     
                    >Clear All</Button>
                    <br />
                    <Button variant="contained"
                    onClick={(e) => {
                        handleChange(e)}}     
                    >Submit</Button>
                    <br />
                    <Button variant="contained"   
                    >Download Form</Button>
                    <br />
                </Box>
            </div>
            </div>
            }
        </div> 
    )
}

export default ApplicantInformation