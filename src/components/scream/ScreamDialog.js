import React, { Component, Fragment } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';

//Material
import Dialog from '@material-ui/core/Dialog';

import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

//Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

//Redux
import { connect } from 'react-redux';
import { getScream, clearErrors } from '../../redux/actions/dataActions';

const styles = theme => ({
	...theme,
	profileImage: {
		maxWidth: 200,
		height: 200,
		borderRadius: '50%',
		objectFit: 'cover',
		marginLeft: '25px',
	},
	dialogContent: {
		padding: 20,
	},
	closeButton: {
		position: 'absolute',
		left: '90%',
	},
	expandButton: {
		position: 'absolute',
		left: '90%',
	},
});
class ScreamDialog extends Component {
	state = {
		open: false,
		oldPath: '',
		newPath: '',
	};

	componentDidMount() {
		if (this.props.openDialog) this.handleOpen();
	}

	handleClose = () => {
		window.history.pushState(null, null, this.state.oldPath);
		this.setState({ open: false });
		this.props.clearErrors();
	};

	handleOpen = () => {
		let oldPath = window.location.pathname;

		const { userHandle, screamId } = this.props;

		const newPath = `/user/${userHandle}/scream/${screamId}`;

		if (oldPath === newPath) oldPath = `/user/${userHandle}`;
		window.history.pushState(null, null, newPath);
		this.setState({ open: true, oldPath, newPath });
		this.props.getScream(this.props.screamId);
	};

	render() {
		const {
			classes,
			scream: { screamId, handle, userHandle, createdAt, body, likeCount, commentCount, comments, userImage },
			UI: { loading },
		} = this.props;

		const dialogMarkup = loading ? (
			<div className={classes.spinnerDiv}>
				<CircularProgress size={200} thickness={2} />
			</div>
		) : (
			<Grid container spacing={16}>
				<Grid item sm={4}>
					<img src={userImage} alt="userImage" className={classes.profileImage} />
				</Grid>
				<Grid item sm={8}>
					<Typography component={Link} color="primary" variant="h5" to={`/users/${userHandle}`}>
						@{userHandle}
					</Typography>
					<hr className={classes.invisibleSeparator} />
					<Typography variant="body2" color="textSecondary">
						{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
					</Typography>
					<hr className={classes.invisibleSeparator} />
					<Typography variant="body1" color="textSecondary">
						{body}
					</Typography>
					<LikeButton screamId={screamId} />
					<span>{likeCount} Likes</span>
					<MyButton tip="Comments">
						<ChatIcon color="primary" />
					</MyButton>
					<span>{commentCount} comments</span>
					<hr className={classes.visibleSeparator} />
					<CommentForm screamId={screamId} />
					{comments && <Comments comments={comments} />}
				</Grid>
			</Grid>
		);
		return (
			<Fragment>
				<MyButton tip="Expand scream" onClick={this.handleOpen} tipClassName={classes.expandButton}>
					<UnfoldMore color="primary" />
				</MyButton>
				<Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="md">
					<MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
						<CloseIcon />
					</MyButton>
					<DialogContent className={classes.dialogContent}>{dialogMarkup}</DialogContent>
				</Dialog>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	scream: state.data.scream,
	UI: state.UI,
});

ScreamDialog.propTypes = {
	clearErrors: PropTypes.func.isRequired,
	getScream: PropTypes.func.isRequired,
	UI: PropTypes.object.isRequired,
	scream: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
};

export default connect(
	mapStateToProps,
	{ getScream, clearErrors }
)(withStyles(styles)(ScreamDialog));
