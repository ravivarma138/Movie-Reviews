import React from 'react'
import Header from './Header';
import firebase from 'firebase';
import fire from '../fire';
import firebaseui from 'firebaseui'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Footer from './Footer';
const Login = (props) => {

    var imageName = require('../images/movieimg.png');

    const mystyle = {
        color: "white",
        backgroundColor: "DodgerBlue",
        padding: "10px",
        textAlign: "center",
        //lineHeight: "100px"

    };

    const imgStyle = {
        display: "block",
        margin: "0 auto",
        marginRight:"auto",
        marginLeft:"auto",
        height: '250px',
        width:'250px',
    }

    const centerPara = {
        textAlign: "center",
        lineHeight: "100px"
    }

    const uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        ],
    };

    const { email, setEmail, password, setPassword, handleLogin, handleSignUp, handleLogOut, hasAccount, setHasAccount, emailError, passwordError } = props;
    return (
        <section className="login">
            <div className="loginContainer">
                {/* <h1 style={mystyle}>Movie Reviews</h1><br /><br /> */}
                <img style={imgStyle} src={imageName.default} />
                <label>E-mail</label>
                <input
                    type="text"
                    autoFocus
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <p className="errorMsg">{emailError}</p>
                <label>password</label>
                <input
                    type="password"
                    autoFocus
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p className="errorMsg">{passwordError}</p>
                <div className="btnContainer">
                    {hasAccount ? (
                        <>
                            <button onClick={handleLogin}>Sign In</button>
                            <p>Don't have an account? <span onClick={() => setHasAccount(!hasAccount)}>Sign Up</span> </p>
                        </>
                    ) : (
                        <>
                            <button onClick={handleSignUp}>Sign Up</button>
                            <p>Have an account ? <span onClick={() => setHasAccount(!hasAccount)}>Sign In</span> </p>
                        </>
                    )}
                    <br/>
                    <div style={centerPara}>
                        <label>OR <br/><br/>Sign In With</label>
                    </div>
                </div>
                <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                />
            </div>
        </section>
    )
}

export default Login;
