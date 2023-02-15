import React from "react";
import { useState, useEffect, useContext } from "react";
import { ActiveUser } from './_app.js'

// import { API, withSSRContext } from 'aws-amplify'
// import { listUsers } from "@/graphql/queries.js"

export default function Applicants() {
    const activeUser = useContext(ActiveUser);
    const [users, setUsers] = useState(null);

    useEffect(() => {
        setUsers(activeUser.users);
    }, [activeUser]);

    return (
        <div>
            <h1>Applicants List</h1>
            {users &&
                users.filter((user) => !user.email.endsWith('@ulm.edu')).map((user) => {
                    return (
                        <div key={user.id}>
                            <h3>Username: {user.username}</h3>
                            <h3>Email: {user.email}</h3>
                        </div>
                    )
                })
            }
        </div>
    )
}

// export async function getServerSideProps({req}) {
//     const SSR = withSSRContext({req});
//     const {data} = await SSR.API.graphql({
//       query: listUsers,
//       authMode: 'AMAZON_COGNITO_USER_POOLS',
//     });
//     return {
//       props: {
//         userList: data.listUsers.items
//       }
//     }
//   }