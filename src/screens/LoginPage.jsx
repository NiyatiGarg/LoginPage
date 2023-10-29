import { useState, useEffect } from 'react';
import styled from "styled-components";

import InputComponent from "../components/InputComponent";
import { DATA_SET } from "../constants/DataSets";

import AimedLabs from "../assets/aimedlabs.svg";

const Container = styled.div`
    display: flex;
    flex: 1;
    height: 100vh;
    width: 100%;
    padding-top: 30px;
    justify-content: center;
    align-items: center;
    background-color: black;
    flex-direction: column;
    overflow: hidden;
`

const CenteredBox = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 250px;
    max-width: 500px;
    width: 70%;
`

const Heading = styled.h1`
    color: white;
`

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    height: 100;
    width: 90%;
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    align-items: center;
`

const Label = styled.label`
    width: 100%;
    font-size: 12px;
    margin-top: 10px;
`

const CheckboxContainer = styled.span`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    font-size: 12px;
`

const Submit = styled.button`
    color: white;
    background-color: black;
    border: none;
    border-radius: 5px;
    padding: 10px;
    width: 100%;
    margin-top: 10px; 

    &:hover {
        background-color: #444;
    }
`

const Footer = styled.span`
    color: white;
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 20vh;
`;

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // Retrieve saved credentials from cookies or local storage on page load
        const shouldRestoreCredentials = localStorage.getItem('rememberMe');
        console.log('shouldRestoreCredentials', shouldRestoreCredentials)
        if (shouldRestoreCredentials) {
            const savedUsername = localStorage.getItem('username');
            const savedPassword = localStorage.getItem('password');

            if (savedUsername) setUsername(savedUsername);
            if (savedPassword) setPassword(savedPassword);
        }
    }, []);

    const validateInputs = (email) => {
        // Regular expression for basic email validation
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        return emailRegex.test(email);
    }


    const submit = (username, password) => {
        // We can implement proper authentication at this place
        if (DATA_SET[username] === password) {
            // TODO redirect to app here
            alert('Login Successfull');
        } else {
            alert('Login failed');
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const { username, password, rememberMe } = Object.fromEntries((new FormData(e.target)).entries());
        const isValid = validateInputs(username);

        if (!isValid) {
            alert('Username Invalid');
            return;
        }

        if (rememberMe === 'on') {
            // If "Remember Me" checkbox is checked, save the credentials in local storage.
            // We should encrypt them for enhanced security
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            localStorage.setItem('rememberMe', true);
        }

        submit(username, password);
    }

    return (
        <Container>
            <CenteredBox>
                <Heading>Login</Heading>
                <FormContainer onSubmit={onSubmit}>
                    <Label>Username</Label>
                    <InputComponent
                        type="text"
                        name="username"
                        placeholder="admin@admin.com"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <Label>Password</Label>
                    <InputComponent
                        type="password"
                        name="password"
                        placeholder="1234@admin"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <CheckboxContainer>
                        <InputComponent
                            type="checkbox"
                            name="rememberMe"
                        />Remember me
                    </CheckboxContainer>
                    <Submit type="submit">Submit</Submit>
                </FormContainer>
            </CenteredBox>
            <Footer>Made with ♥ by <img src={AimedLabs} alt="SVG Image" width="100" /></Footer>
        </Container>
    );
}

export default LoginPage;