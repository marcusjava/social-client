import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';

import { postScream, clearErrors } from '../../redux/actions/dataActions';

import MyButton from '../../util/MyButton';

import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';

const styles = theme => ({
	...theme,
	submitButton: {
		position: 'relative',
		float: 'right',
		marginTop: 10,
	},
	progressButton: {
		position: 'absolute',
	},
	closeButton: {
		position: 'absolute',
		left: '91%',
		top: '6%',
	},
});

class PostScream extends Component {
	state = {
		open: false,
		body: '',
		errors: {},
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.UI.errors) {
			this.setState({ errors: nextProps.UI.errors });
		}

		if (!nextProps.UI.errors && !nextProps.UI.loading) {
			this.setState({ body: '', open: false, errors: {} });
		}
	}

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleSave = e => {
		e.preventDefault();
		const { body } = this.state;
		const newData = {
			body,
		};
		this.props.postScream(newData);
		this.handleClose();
	};

	handleClose = () => {
		this.props.clearErrors();
		this.setState({ open: false, errors: {} });
	};
	render() {
		const {
			UI: { loading },
			classes,
		} = this.props;
		const { errors } = this.state;

		return (
			<Fragment>
				<MyButton tip="Edit details" placement="top" onClick={this.handleOpen}>
					<AddIcon color="secondary" fontSize="large" />
				</MyButton>

				<Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
					<MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
						<CloseIcon />
					</MyButton>
					<DialogContent>
						<form>
							<TextField
								name="body"
								type="text"
								label="Scream"
								multiline
								rows="3"
								placeholder="Create a Scream"
								className={classes.textField}
								value={this.state.body}
								onChange={this.handleChange}
								helperText={errors.body}
								error={errors.body ? true : false}
								fullWidth
							/>

							<Button
								variant="contained"
								color="primary"
								onClick={this.handleSave}
								className={classes.submitButton}
								disabled={loading}
							>
								{loading && <CircularProgress size={30} className={classes.progressSpinner} />}
								Save
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</Fragment>
		);
	}
}

PostScream.propTypes = {
	postScream: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	UI: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	UI: state.UI,
});

export default connect(
	mapStateToProps,
	{ postScream, clearErrors }
)(withStyles(styles)(PostScream));
