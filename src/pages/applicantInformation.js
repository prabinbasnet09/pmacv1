import React from "react"
import { useState, useEffect} from 'react'
import { useContext } from "react"

import { ActiveUser } from './_app.js'

import { TextField, Button } from '@mui/material'
import { Box } from '@mui/system'

import { createApplicantForm, updateApplicantForm} from '../graphql/mutations'
import { getApplicantForm } from "@/graphql/queries.js"

import { API, graphqlOperation } from 'aws-amplify'

// export async function getServerSideProps({req}) {
//     const SSR = withSSRContext({req});
//     const user = await SSR.Auth.currentAuthenticatedUser();
//     const {data} = await SSR.API.graphql({
//         query: getApplicantForm,
//         variables: {userId: user.attributes.sub},
//         authMode: 'AMAZON_COGNITO_USER_POOLS'
//     });
//     return {
//         props: {
//             data: data.getApplicantForm
//         }
//     }
// }

function ApplicantInformation({user}) {
    const activeUser = useContext(ActiveUser);
    // const [formData, setFormData] = useState({
    //     userId: data ? data.userId : '',
    //     fullName: data ? data.fullName : '',
    //     cwid: data ? data.cwid : '',
    //     cellPhone: data ? data.cellPhone : '',
    //     email: data ? data.email : '',
    //     major: data ? data.major[0] : '',
    //     minor: data && data.minor ? data.minor[0] : '',
    // });
    const [formData, setFormData] = useState({});
   
    useEffect(() => {
        const getFormData = async () => {
            await API.graphql({
                query: getApplicantForm,
                variables: {userId: user.attributes.sub},
                authMode: 'AMAZON_COGNITO_USER_POOLS'
                })
                .then((res) => {
                    if(res.data.getApplicantForm === null) return;
                    const response = res.data.getApplicantForm;
                    setFormData({
                        userId: response.userId,
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
            localStorage.setItem('formData', JSON.stringify(formData));
        } else {
            setFormData(JSON.parse(localStorage.getItem('formData')));
        }
        console.log(user)
    }, []);

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
                userId: formData.userId,
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
                    {
                        (formData) ? 
                        <Button variant="contained"
                        onClick={(e) => {
                            handleUpdate(e)}}     
                        >Update</Button> :
                        <Button variant="contained"
                        onClick={(e) => {
                            handleSubmit(e)}}     
                        >Submit</Button>
                    }
                    <br />
                    <Button variant="contained"   
                    >Download Form</Button>
                    <br />
                </Box>
            </div>
            </div>
        </div> 
    )
}

export default ApplicantInformation