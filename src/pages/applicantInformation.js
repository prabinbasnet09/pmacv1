import React from "react"
import { useState, useEffect} from 'react'
import { useContext } from "react"

import { ActiveUser } from './_app.js'

import { TextField, Button } from '@mui/material'
import { Box } from '@mui/system'

import { createApplicantForm, updateApplicantForm} from '../graphql/mutations'
import { API } from 'aws-amplify'
import { getApplicantForm } from "@/graphql/queries.js"


function ApplicantInformation() {
    const activeUser = useContext(ActiveUser);
    const [groupName, setGroupName] = useState('');
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setGroupName(activeUser.group);

        const getFormData = async () => {
            await API.graphql({
                query: getApplicantForm,
                variables: {userId: activeUser.id},
                authMode: 'AMAZON_COGNITO_USER_POOLS'
                })
                .then((res) => {
                    const response = res.data.getApplicantForm;
                    setFormData({
                        fullName: response.fullName,
                        cwid: response.cwid,
                        cellPhone: response.cellPhone,
                        email: response.email,
                        major: response.major[0],
                    });
                }
                )
                .catch((err) => {
                    console.log(err);
                    return null;
                }
            );
        }

        if(!localStorage.getItem('formData')){
            getFormData();
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

    const handleUpdate = async(e) => {
        e.preventDefault();
        var majors = [];
        majors.push(formData.major);
        try{
            const inputData = {
                userId: activeUser.id,
                fullName: formData.fullName,
                cwid: formData.cwid,
                cellPhone: formData.cellPhone,
                email: formData.email,
                major: majors,
              }
            await API.graphql({
                query: updateApplicantForm,
                variables: {input: inputData},
                authMode: 'AMAZON_COGNITO_USER_POOLS'
            })
            .then((res) => {
                console.log("Form updated successfully")
              })
            .catch((err) => {
                console.log(err);
                return null;
            });
        } catch(err) {
            console.log('error updating user: ', err)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        var majors = [];
        majors.push(formData.major);
        try{
          const inputData = {
            userId: activeUser.id,
            fullName: formData.fullName,
            cwid: formData.cwid,
            cellPhone: formData.cellPhone,
            email: formData.email,
            major: majors,
          }
          console.log(inputData);
          await API.graphql({
            query: createApplicantForm,
            variables: {input: inputData},
            authMode: 'AMAZON_COGNITO_USER_POOLS'
          }
        )
        .then((res) => {
            console.log("Form created successfully")
          })
          .catch((err) => {
            console.log(err);
            return null;
          });
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
                        <label htmlFor="outlined-required">Full Name (Print)</label>
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
                            name="email"
                            value={formData.email || ''}
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
                            value={formData.major ? formData.major : ''}
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
                            value={formData.minor ? formData.minor : ''}
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
                        handleSubmit(e)}}     
                    >Submit</Button>
                    <Button variant="contained"
                    onClick={(e) => {
                        handleUpdate(e)}}     
                    >Update</Button>
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