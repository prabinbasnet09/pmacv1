import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect, useContext} from 'react'

import { Button } from '@mui/material'

import { ActiveUser } from './_app.js'


function Home({signOut}) {
  const activeUser = useContext(ActiveUser);
  const router = useRouter();
  const [groupName, setGroupName] = useState('');
  const [users, setUsers] = useState(null);
 
  useEffect(() => {
    const { group, users} = activeUser;
    setGroupName(group);
    setUsers(users);
  }, [activeUser]);

  // handles the signout
  const handelSignOut = () => {
    localStorage.clear();
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
                  
                  <h1>Welcome {`${activeUser.username}`}</h1> 
                </div>

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
                  (groupName === "Student") ?
                  <div>
                    <Link href="/forms" >
                      <h3>Form 1</h3>
                    </Link> 
                    <Link href="/forms" >
                      <h3>Form 2</h3>
                    </Link>  
                    <Link href="/forms" >
                      <h3>Form 3</h3>
                    </Link>
                  </div> : 
                  (groupName === "Faculty") ?
                  <div>
                    <Link href="/applicants" >
                      <Button variant="contained">
                        Applicant status
                      </Button>
                    </Link>
                  </div> : null
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
