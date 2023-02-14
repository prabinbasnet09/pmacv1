import React from "react"
import { useState, useEffect} from 'react'
import { useContext } from "react"

import { Button, Checkbox} from '@mui/material'
import { Box } from '@mui/system'

import { ActiveUser } from './_app.js'

import { createUser } from '../graphql/mutations'
import { API, graphqlOperation, Auth } from 'aws-amplify'


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
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <div>
            {groupName &&
            <div>
                <div>
                    <h1>Information Release Form</h1>
                </div>
                <div>
                <Box
                        component="form"
                        sx={{
                        '& > :not(style)': { m: 1, width: '80ch' },
                        }}
                        noValidate
                        autoComplete="off"
                >
                    <div>
                        I understand that members of the Pre-Medical Advisory Committee have access to my transcript, test scores,
                        personal statement and faculty evaluations submitted on my behalf. I understand that the committee evaluation
                        will be based on the submitted faculty evaluations, transcript(s), test scores, a personal statement, and the
                        committee interview. I, as the applicant, have made every effort to provide the committee with the full and correct
                        address where the evaluation letter for the pre-medical committee should be mailed, understanding that this may
                        not be the general address for the school in most cases.
                        <br />
                        <br />
                        Please check the box for all that you agree to: <br />
                        <Checkbox {...label} /> I hereby authorize the Pre-Medical Advisory Committee of the University of Louisiana at Monroe
                        to release the evaluation of the undersigned to the below listed professional schools and/or programs.
                        <br />
                        <Checkbox {...label} /> I will allow the committee members to evaluate my performance based on my academic record,
                        submitted materials, and the committee interview. I authorize the committee to prepare an evaluation
                        letter for me for the purposes of applying to the professional schools and/or programs listed below. I
                        understand that their evaluation and all items considered in making this recommendation are
                        confidential and I waive my right to see such evaluation. 
                        <br />
                        <Checkbox {...label} /> I will allow my name to be released to the University if accepted to a professional school. The
                        University may use my name and the name of the professional school/ and or program for statistics and
                        recruitment endeavors. These statistics will be gathered for the Biology Program, Pre-Medical Interview
                        Committee and the University of Louisiana at Monroe.
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