import { createContext, useState, useEffect} from "react";
import { ThemeProvider } from "@mui/material";
import theme from "../styles/theme";

import AWS from "aws-sdk";

import { Amplify, API, Auth} from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';

import * as queries from '../graphql/queries'

import awsExports from "../aws-exports";
Amplify.configure(awsExports);

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

export const ActiveUser = createContext();

export const ActiveUserProvider = ({children, user}) => {

  const [userGroup, setUserGroup] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
      cognitoIdentityServiceProvider.adminListGroupsForUser(params,
        function (err, data) {
          if (err) {
            console.log(err, err.stack);
          } else {
            setUserGroup(data.Groups[0].GroupName);
          }
        }
    );
    
      const setLocalStorage = (key, value, ttl = 2 * 60 * 1000) => {
        const expiresAt = new Date(Date.now() + ttl);
        localStorage.setItem(key, JSON.stringify({ value, expiresAt }));
      };

      const getLocalStorage = (key) => {
        const item = JSON.parse(localStorage.getItem(key));
        if(!item) return null
        
        if(new Date() >= new Date(item.expiresAt)) {
          console.log('expired')
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

  }, []);

  const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
  const params = {
    UserPoolId: 'us-east-1_K216AnHxh',
    Username: user.username
  }

  console.log(user)

  const loggedUser = {
    id: user.attributes.sub,
    username: user.username,
    email: user.attributes.email,
    group: userGroup,
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