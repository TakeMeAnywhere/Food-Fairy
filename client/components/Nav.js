import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { connect } from 'react-redux';

export default class Nav extends React.Component {
  constructor(props){
    super(props);
  }


  render() {

    if(!this.props.authenticated){
      return (
        <nav className="container-fluid">
          <div className="row text-center navbar">
            <Link to="/"><div className="col-md-2 col-sm-2 navpad">Home</div></Link>
            <Link to="/advanced"><div className="col-md-2 col-sm-2 navpad line">Search</div></Link>
            <div className="col-md-4 col-sm-4"><img className="center-block logo" src="imgs/logo2.png" /></div>
            <Link to="/signin"><div className="col-md-2 col-sm-2 navpad line">Signin</div></Link>
            <Link to="/signup"><div className="col-md-2 col-sm-2 navpad">Signup</div></Link>
          </div>
        </nav>
      )
    }else{
      return (
        <nav className="container-fluid">
          <div className="row text-center navbar">
            <Link to="/"><div className="col-md-2 col-sm-2 navpad">Home</div></Link>
            <Link to="/advanced"><div className="col-md-2 col-sm-2 navpad line">Search</div></Link>
            <div className="col-md-4 col-sm-4"><img className="center-block logo" src="imgs/logo2.png" /></div>
            <Link to="/saved"><div className="col-md-2 col-sm-2 navpad line">Saved</div></Link>
            <Link to="/signout"><div className="col-md-2 col-sm-2 navpad">Signout</div></Link>
          </div>
        </nav>
      )
    }

  }
};


function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps)(Nav);
