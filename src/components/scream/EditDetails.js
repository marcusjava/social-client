import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions';

import MyButton from '../../util/MyButton';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

const styles = theme => ({
	...theme,
	button: {
		float: 'right',
	},
});

class EditDetails extends Component {
	state = {
		bio: '',
		website: '',
		location: '',
		open: false,
	};
	componentDidMount() {
		const {
			classes,
			user: { credentials },
		} = this.props;
		this.mapUserDetailsToState(credentials);
	}

	mapUserDetailsToState = credentials => {
		this.setState({
			bio: credentials.bio ? credentials.bio : '',
			website: credentials.website ? credentials.website : '',
			location: credentials.location ? credentials.location : '',
		});
	};

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleOpen = () => {
		this.setState({ open: true });
		this.mapUserDetailsToState(this.props.user.credentials);
	};

	handleSave = e => {
		e.preventDefault();
		const { bio, website, location } = this.state;
		const editedData = {
			bio,
			website,
			location,
		};
		this.props.editUserDetails(editedData);
		this.handleClose();
	};

	handleClose = () => {
		this.setState({ open: false });
		this.mapUserDetailsToState(this.props.user.credentials);
	};

	render() {
		const {
			classes,
			user: { credentials },
		} = this.props;
		return (
			<Fragment>
				<MyButton tip="Edit details" placement="top" onClick={this.handleOpen} btnClassName={classes.button}>
					<EditIcon color="primary" />
				</MyButton>

				<Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
					<DialogTitle>Edit your details</DialogTitle>
					<DialogContent>
						<form>
							<TextField
								name="bio"
								type="text"
								label="Bio"
								multiline
								rows="3"
								placeholder="A short bio about yourself"
								className={classes.textField}
								value={this.state.bio}
								onChange={this.handleChange}
								fullWidth
							/>

							<TextField
								name="website"
								type="text"
								label="Website"
								placeholder="Your website address"
								className={classes.textField}
								value={this.state.website}
								onChange={this.handleChange}
								fullWidth
							/>

							<TextField
								name="location"
								type="text"
								label="Location"
								placeholder="Your location"
								className={classes.textField}
								value={this.state.location}
								onChange={this.handleChange}
								fullWidth
							/>
							<DialogActions>
								<Button variant="contained" color="primary" onClick={this.handleSave}>
									Save
								</Button>
								<Button variant="contained" color="secondary" onClick={() => this.handleClose()}>
									Cancel
								</Button>
							</DialogActions>
						</form>
					</DialogContent>
				</Dialog>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user,
});

EditDetails.propTypes = {
	editUserDetails: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
};

export default connect(
	mapStateToProps,
	{ editUserDetails }
)(withStyles(styles)(EditDetails));
