import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import axios from 'axios';
import AppIcon from '../images/icon.png';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { login } from '../redux/actions/userActions';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
	...theme,
});
class Login extends Component {
	state = {
		email: '',
		password: '',
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
		const { email, password } = this.state;
		this.props.login({ email, password }, this.props.history);
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
					<img src={AppIcon} alt="Monkey Image" className={classes.image} />
					<Typography variant="h3" className={classes.pageTitle}>
						Login
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
						{errors.general && (
							<Typography variant="caption" color="error" className={classes.customError}>
								{errors.general}
							</Typography>
						)}
						<Button type="submit" variant="contained" color="primary" className={classes.button}>
							Login
							{loading && <CircularProgress size={30} className={classes.progress} />}
						</Button>
					</form>
					<small>
						Don't have account yet? <Link to="/signup">SignUp</Link>
					</small>
				</Grid>
				<Grid item sm />
			</Grid>
		);
	}
}

Login.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
	login: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	user: state.user,
	UI: state.UI,
});

export default connect(
	mapStateToProps,
	{ login }
)(withStyles(styles)(Login));
