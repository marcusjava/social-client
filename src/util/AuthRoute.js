import React from 'react';
import Login from '../pages/login';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AuthRoute = ({ authenticated, component: Component, ...rest }) => {
	return (
		<Route {...rest} render={props => (authenticated === true ? <Redirect to="/" /> : <Component {...props} />)} />
	);
};

const mapStateToProps = state => ({
	authenticated: state.user.authenticated,
});

export default connect(
	mapStateToProps,
	{}
)(AuthRoute);
