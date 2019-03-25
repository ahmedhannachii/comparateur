import React from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { SIGNUP_USER } from '../../queries';
import Error from '../Error';

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
};

class Signup extends React.Component {
    state = { ...initialState };

    clearState = () => {
        this.setState({ ...initialState });
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };


    handleSubmit = (event, signup) => {
        event.preventDefault();
        signup().then(async ({ data }) => {

            console.log(data);
            localStorage.setItem('token', data.signup.token);
            await this.props.refetch();
            this.clearState();
            this.props.history.push('/');
        });
    };

    validateForm = () => {
        const { firstName, lastName, email, password, passwordConfirmation } = this.state;
        const isInvalid = !firstName || !lastName || !email || !password || password !== passwordConfirmation;
        return isInvalid;
    };

    render() {
        const { firstName, lastName, email, password, passwordConfirmation } = this.state;
        return (
            <div className="App">
                <h2 className="App">Signup</h2>
                <Mutation mutation={SIGNUP_USER} variables={{ firstName, lastName, email, password }}>
                    {
                        (signup, { data, loading, error }) => {
                            return (
                                <form className="form" onSubmit={event => this.handleSubmit(event, signup)}>

                                    <input type="text" name="firstName"
                                        placeholder="Firstname" onChange={this.handleChange} value={firstName} /> <br />

                                    <input type="text" name="lastName"
                                        placeholder="Lastname" onChange={this.handleChange} value={lastName} /> <br />

                                    <input type="email" name="email"
                                        placeholder="Email Address" onChange={this.handleChange} value={email} /> <br />

                                    <input type="password" name="password"
                                        placeholder="Password" onChange={this.handleChange} value={password} /> <br />

                                    <input type="password" name="passwordConfirmation"
                                        placeholder="Confirm Password" onChange={this.handleChange} value={passwordConfirmation} />  <br />

                                    <button type="submit" disabled={loading || this.validateForm()} className="button-primary">Submit</button>
                                    {error && <Error error={error} />}

                                </form>
                            )
                        }}
                </Mutation>
            </div>
        )
    }
}

export default withRouter(Signup);