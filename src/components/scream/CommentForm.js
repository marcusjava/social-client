import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// MUI Stuff
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// Redux stuff
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';

const styles = theme => ({
	...theme,
});

class CommentForm extends Component {
	state = {
		body: '',
		errors: {},
	};

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.UI.errors) {
			this.setState({ errors: this.props.UI.errors });
		}

		if (!nextProps.UI.errors && !nextProps.UI.loading) {
			this.setState({ body: '' });
		}
	}

	onSubmit = e => {
		const { screamId } = this.props;
		e.preventDefault();
		this.props.submitComment(screamId, { body: this.state.body });
	};

	render() {
		const {
			classes,
			authenticated,
			UI: { loading },
		} = this.props;
		const { errors } = this.state;

		const commentFormMarkup = authenticated ? (
			<Grid item sm={12} style={{ textAlign: 'center' }}>
				<form onSubmit={this.onSubmit}>
					<TextField
						name="body"
						label="Comment on scream"
						type="text"
						onChange={this.handleChange}
						error={errors.comment ? true : false}
						helperText={errors.comment}
						value={this.state.body}
						className={classes.TextField}
					/>
					<Button type="submit" variamt="contained" color="primary" className={classes.button}>
						Submit
					</Button>
					<hr className={classes.visibleSeparator} />
				</form>
			</Grid>
		) : null;

		return commentFormMarkup;
	}
}

CommentForm.propTypes = {
	classes: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
	authenticated: PropTypes.bool.isRequired,
	submitComment: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	UI: state.UI,
	authenticated: state.user.authenticated,
});

export default connect(
	mapStateToProps,
	{ submitComment }
)(withStyles(styles)(CommentForm));
