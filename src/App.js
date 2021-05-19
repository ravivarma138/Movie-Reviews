
import fire from './fire'
import './App.css';
import firebase from 'firebase'
import { BrowserRouter as Router,Redirect, Switch, Route } from 'react-router-dom';
import StyledFirebaseAuth from 'firebaseui'
import Header from './components/Header'
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";
import Dashboard from './components/Dashboard';
import Sidebar from './components/header/Sidebar';
import LogOut from './components/LogOut';
import Footer from './components/Footer';
import style, { ThemeProvider } from 'styled-components';
import {UseDarkMode} from './styles/UseDarkMode'
import IdleTimerContainer from './components/IdleTimerContainer';
import { Toggle } from './components/Toggle';
import { GlobalStyles,lightTheme, darkTheme } from './styles/GlobalStyles';
import Trending from './components/Trending/Trending';
import Movie from './components/Movies/Movie';
import TvShow from './components/TvShows/TvShow';
import Search from './components/Search/Search';
import Favourites from './components/Favourites/Favourites';




function App() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState(''); 
  const [hasAccount, setHasAccount] = useState(true);
  const uiConfig = useState({
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
  });
  const [theme, toggleTheme] = UseDarkMode();


  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  }

  const handleLogin = () => {
    clearErrors();
    fire.auth().signInWithEmailAndPassword(email, password)
      .catch(err => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const handleSignUp = () => {
    clearErrors();
    clearInputs();
    fire.auth().createUserWithEmailAndPassword(email, password)
      .catch(err => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      });
  }

  const handleLogOut = () => {
    console.log('log out dude');
    fire.auth().signOut();
  }

  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('current user is',fire.auth().currentUser.displayName);
        console.log('current user email is',fire.auth().currentUser.email);
        console.log('current user id is',fire.auth().currentUser.uid);
        localStorage.setItem('uid',fire.auth().currentUser.uid);
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    })

  }

  useEffect(() => {
    authListener();
  }, []);

  return (
    <>
      {
        user ? (
          // <Header handleLogOut={handleLogOut} />
          // <Dashboard handleLogOut={handleLogOut}/>
          <ThemeProvider theme={theme === 'light'? lightTheme:darkTheme}>
            <GlobalStyles/>
          <Router>
            <Redirect to='dashboard' />
          <Sidebar theme={theme} toggleTheme={toggleTheme}/>
          
          
          <Switch>
            <Route path='/dashboard' exact component={Dashboard} />
            <Route path='/logout' exact component={LogOut} />
            <Route path='/trending' exact component={Trending}/>
            <Route path='/movies' exact component={Movie}/>
            <Route path='/tvshows' exact component={TvShow}/>
            <Route path='/search' exact component={Search}/>
            <Route path='/favourites' exact component={Favourites}/>
            {/* <Route path='/reports/reports1' exact component={ReportsOne} />
            <Route path='/reports/reports2' exact component={ReportsTwo} />
            <Route path='/reports/reports3' exact component={ReportsThree} />
            <Route path='/team' exact component={Team} /> */}
          </Switch>
          <ScrollUpButton />
          <Footer/>
          <IdleTimerContainer/>
        </Router>
        </ThemeProvider>
        ) : (
          <>
          <Login
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            handleSignUp={handleSignUp}
            handleLogOut={handleLogOut}
            hasAccount={hasAccount}
            setHasAccount={setHasAccount}
            emailError={emailError}
            passwordError={passwordError}
            uiConfig />
            <Footer/>
            </>
        )
      }

    </>
  );
}

export default App;
