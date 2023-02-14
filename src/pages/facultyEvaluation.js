import React from "react"
import { useState, useEffect} from 'react'
import { useContext } from "react"

import { ActiveUser } from './_app.js'

import { TextField, Button } from '@mui/material'
import { Box } from '@mui/system'

import { createUser } from '../graphql/mutations'
import { API, graphqlOperation } from 'aws-amplify'


function Forms() {
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
                    <h1>Faculty Evaluation Form</h1>
                </div>

                <div>
                    <Box
                        component="form"
                        sx={{
                        '& > :not(style)': { m: 1, width: '60ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                    <div>
                        <b><label htmlFor="outlined-required">Name of Applicant</label></b>
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
                        <p>
                            The above-named student is in the process of applying to a pre-health professional program. The applicant has
                            asked to be interviewed by ULM’s Pre-Medical Advisory Committee. The information you provide will be used only
                            in the admissions/evaluation process. Please complete and return this form to Dr. Allison Wiedemeier, CNSB 326,
                            in the Biology Department as soon as possible. You may be contacted by a member of the Pre-Professional Health
                            Advisory Committee seeking additional information or verification. By signing below the <b>undersigned student
                            hereby waives his/her right of access to this information.</b>
                        </p>
                        <b><label htmlFor="outlined-required">Signature of Applicant</label></b>
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
                        <b><label htmlFor="outlined-required">Name of Evaluator</label></b>
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

                        <p>
                            Please indicate your estimation of this applicant by <u>circling</u> the appropriate description in the table below and
                            answering the questions on the back. Thank you for your assistance in this process.
                        </p>
                        <br />
                        <br />
                        <p><b>How long and in what capacity have you known or observed this student?</b></p>
                        <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        defaultValue="Answer Here"
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

export default Forms