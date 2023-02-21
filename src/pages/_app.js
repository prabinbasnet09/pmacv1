import { createContext, useState, useEffect} from "react";
import { ThemeProvider } from "@mui/material";
import theme from "../styles/theme";

import { Amplify, API} from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';

import * as queries from '../graphql/queries'
import { onUpdateUser } from '@/graphql/subscriptions.js';

import awsExports from "../aws-exports";
Amplify.configure({...awsExports, ssr: true});

export const ActiveUser = createContext();

export const ActiveUserProvider = ({children, user}) => {
  
  const [users, setUsers] = useState([]);

  useEffect(() => {
    
      const setLocalStorage = (key, value, ttl = 5 * 60 * 1000) => {
        const expiresAt = new Date(Date.now() + ttl);
        localStorage.setItem(key, JSON.stringify({ value, expiresAt }));
      };

      const getLocalStorage = (key) => {
        const item = JSON.parse(localStorage.getItem(key));
        if(!item) return null
        
        if(new Date() >= new Date(item.expiresAt)) {
          localStorage.removeItem(key);
          return null;
        }
        return item;
      };
      
      if(!getLocalStorage('userInfo')) {
        API.graphql({
          query: queries.listUsers,
          authMode: 'AMAZON_COGNITO_USER_POOLS',
        })
        .then((res) => {
          setLocalStorage('userInfo', res.data.listUsers.items);
          setUsers(res.data.listUsers.items);
        })
        .catch((err) => {
          console.log(err);
          return null;
        });
      }
      else{
        setUsers(getLocalStorage('userInfo').value);
      }

      const updateUser = API.graphql({
        query: onUpdateUser,
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      }).subscribe({
        next: (userData) => {
          API.graphql({
            query: queries.listUsers,
            authMode: 'AMAZON_COGNITO_USER_POOLS',
          })
          .then((res) => {
            setLocalStorage('userInfo', res.data.listUsers.items);
          })
          .catch((err) => {
            console.log(err);
            return null;
          });
        },
        error: (error) => {
          console.log(error);
        }
      })

      return () => {
        updateUser.unsubscribe();
      }

  }, []);



  const loggedUser = {
    id: user.attributes.sub,
    username: user.username,
    name: user.attributes.name,
    email: user.attributes.email,
    group: users.filter((userProfile) => userProfile.username === user.username).map((user) => user.groups[0]),
    users: users
  }

  return (
    <ActiveUser.Provider value={loggedUser}>
      {children}
    </ActiveUser.Provider>
  )
}

function MyApp({ Component, pageProps, user, signOut}) {
  return (
    <ThemeProvider theme={theme}>
      <ActiveUserProvider user={user}>
        <Component {...pageProps} user = {user} signOut = {signOut}/>
      </ActiveUserProvider>
    </ThemeProvider>
  );
}

export default withAuthenticator(MyApp)