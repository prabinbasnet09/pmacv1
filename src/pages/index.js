import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect, useContext} from 'react'

import { Button } from '@mui/material'

import { ActiveUser } from './_app.js'

import Cookies from 'js-cookie'
import AppUsers from '@/components/app-users.js'

function Home({signOut}) {
  const activeUser = useContext(ActiveUser);
  const router = useRouter();
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const { group, users} = activeUser;
   
    setGroups(group);

    setUsers(users);
  }, [activeUser]);

  // handles the signout
  const handelSignOut = () => {
    //clearing local storage
    localStorage.clear();
    //clearing cookie session
    Cookies.remove(`CognitoIdentityServiceProvider.v2hlarf0c3dcm13nn2vcbti14.${activeUser.username}.refreshToken`);
    Cookies.remove(`CognitoIdentityServiceProvider.v2hlarf0c3dcm13nn2vcbti14.${activeUser.username}.accessToken`);
    Cookies.remove(`CognitoIdentityServiceProvider.v2hlarf0c3dcm13nn2vcbti14.LastAuthUser`);
    Cookies.remove(`CognitoIdentityServiceProvider.v2hlarf0c3dcm13nn2vcbti14.${activeUser.username}.idToken`);

    router.push('/');
  }

  return (
    <div>
      <Head>
        <title>PMAC</title>
        <meta name="description" content="Pre-medical Advisory committee" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div>
            {
              (activeUser && users) ? 
              <div>
                <div>
                  
                  <h1>Welcome {`${activeUser.name}`}</h1> 
                </div>
                {console.log(groups)}
              {
              (groups.filter(group => (group === "Admin" || group === "Chair Committee")).length > 0) ? 
                <AppUsers /> :
                <div>
                <div>
                  <h3>Profile Information</h3>
                  {users.filter((user) => user.username === activeUser.username).map((userProfile) =>
                    <div key={userProfile.id}>
                      <h3>Username: {userProfile.username}</h3>
                      <h3>Email: {userProfile.email}</h3>
                    </div>
                  )} 
                </div>

                {
                  (groups.filter(group => group === "Student").length > 0) ?
                  <div>
                    <Link href="/applicantInformation" >
                      <h3>Applicant Information Form</h3>
                    </Link> 
                    <Link href="/facultyEvaluation" >
                      <h3>Faculty Recommendation Form</h3>
                    </Link>  
                    <Link href="/informationRelease" >
                      <h3>Information Release Form</h3>
                    </Link>
                  </div> : 
                  (groups.filter(group => group === "Faculty").length > 0) ?
                  <div>
                    <Link href="/applicants" >
                      <Button variant="contained">
                        Applicant status
                      </Button>
                    </Link>
                  </div> : null
                }   
                </div>
              }
              </div>
              :
              <div>
                <h2>Loading...</h2>
              </div>
            }
        </div>
        <br />
        <Button variant="contained"
          onClick={() => {
            handelSignOut()
            signOut()
          }}>
            Signout
        </Button>
    </div>
  )
}

export default Home;
