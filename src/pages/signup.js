import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import axios from 'axios';
import AppIcon from '../images/icon.png';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { signup } from '../redux/actions/userActions';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
	...theme,
});
class SignUp extends Component {
	state = {
		email: '',
		handle: '',
		password: '',
		confirmPassword: '',
		errors: {},
	};

	handleChange = e => {
		e.preventDefault();
		this.setState({ [e.target.name]: e.target.value });
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.UI.errors) {
			this.setState({ errors: nextProps.UI.errors });
		}
	}

	handleSubmit = e => {
		e.preventDefault();
		const { email, handle, password, confirmPassword } = this.state;
		this.props.signup({ email, handle, password, confirmPassword }, this.props.history);
	};
	render() {
		const {
			classes,
			UI: { loading },
		} = this.props;
		const { errors } = this.state;
		return (
			<Grid container className={classes.form}>
				<Grid item sm />
				<Grid item sm>
					<img src={AppIcon} className={classes.image} />
					<Typography variant="h3" className={classes.pageTitle}>
						SignUp
					</Typography>
					<form noValidate onSubmit={this.handleSubmit}>
						<TextField
							id="email"
							type="email"
							name="email"
							label="Email"
							className={classes.textField}
							value={this.state.email}
							onChange={this.handleChange}
							fullWidth
							helperText={errors.email}
							error={errors.email ? true : false}
						/>
						<TextField
							id="handle"
							name="handle"
							label="Handle"
							className={classes.textField}
							value={this.state.handle}
							onChange={this.handleChange}
							fullWidth
							helperText={errors.handle}
							error={errors.handle ? true : false}
						/>
						<TextField
							id="password"
							type="password"
							name="password"
							label="Password"
							helperText={errors.password}
							error={errors.password ? true : false}
							className={classes.textField}
							value={this.state.password}
							onChange={this.handleChange}
							fullWidth
						/>
						<TextField
							id="confirmPassword"
							type="password"
							name="confirmPassword"
							label="Confirm Password"
							helperText={errors.password}
							error={errors.password ? true : false}
							className={classes.textField}
							value={this.state.confirmPassword}
							onChange={this.handleChange}
							fullWidth
						/>
						{errors.general && (
							<Typography variant="caption" color="error" className={classes.customError}>
								{errors.general}
							</Typography>
						)}
						<Button
							type="submit"
							variant="contained"
							color="primary"
							className={classes.button}
							disabled={loading}
						>
							SignUp
							{loading && <CircularProgress size={20} className={classes.progress} />}
						</Button>
					</form>
					<small>
						You have account? <Link to="/login">Login</Link>
					</small>
				</Grid>
				<Grid item sm />
			</Grid>
		);
	}
}

SignUp.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
	signup: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	user: state.user,
	UI: state.UI,
});
export default connect(
	mapStateToProps,
	{ signup }
)(withStyles(styles)(SignUp));
