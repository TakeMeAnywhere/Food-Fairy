import React from 'react';
import axios from 'axios';
import * as actions from '../../actions/index';
import { reduxForm } from 'redux-form';

export default class SigninPage extends React.Component {

  handleFormSubmit({ username, password }) {
    console.log(username, password);
    this.props.signinUser({username, password})
  }

  renderError() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>{this.props.errorMessage}</strong>
        </div>
      )
    }
  }

    //handleSubmit, username, password => given to us from redux form
  render(){

    const { handleSubmit, fields: { username, password }} = this.props;

    return(
      <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
        <fieldset className="form-group">
          <label>Username: </label>
          <input {...username} className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password: </label>
          <input {...password} type="password" className="form-control" />
        </fieldset>
        {this.renderError()}
        <button action="submit" className="btn btn-primary">Sign In</button>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

//Redux from helper
  //Acts as the connect helper from react-redux
export default reduxForm({
  form: 'signin',
  fields: ['username', 'password']
}, mapStateToProps, actions)(SigninPage);

