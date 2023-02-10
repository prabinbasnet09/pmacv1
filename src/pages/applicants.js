import React from "react";
import { useState, useEffect, useContext } from "react";
import { ActiveUser } from './_app.js'

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
                users.map((user) => {
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