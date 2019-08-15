import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ChatIcon from '@material-ui/icons/Chat';

import MyButton from '../../util/MyButton';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import ScreamDialog from './ScreamDialog';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import LikeButton from './LikeButton';

import DeleteScream from './DeleteScream';
import PropTypes from 'prop-types';
const styles = {
	card: {
		position: 'relative',
		display: 'flex',
		marginBottom: 20,
	},
	image: {
		minWidth: 200,
	},
	content: {
		padding: 25,
		objectFit: 'cover',
	},
};

const Scream = ({
	scream: { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount },
	classes,
	user: {
		authenticated,
		likes,
		credentials: { handle },
	},
	openDialog,
}) => {
	dayjs.extend(relativeTime);

	const deleteButton = authenticated && userHandle === handle ? <DeleteScream screamId={screamId} /> : null;

	return (
		<Card className={classes.card}>
			<CardMedia image={userImage} className={classes.image} title="Profile image" />
			<CardContent className={classes.content}>
				<Typography variant="h5" color="primary">
					<Link to={`/user/${handle}`}>{userHandle}</Link>
				</Typography>
				<Typography variant="body2" color="textSecondary">
					{dayjs(createdAt).fromNow()}
				</Typography>
				<Typography variant="body1">{body}</Typography>
				<LikeButton screamId={screamId} />
				<span>{likeCount} Likes</span>
				<MyButton tip="Comments">
					<ChatIcon color="primary" />
				</MyButton>
				<span>{commentCount} comments</span>
				{deleteButton}
				<ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={openDialog} />
			</CardContent>
		</Card>
	);
};

Scream.propTypes = {
	user: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	scream: PropTypes.object.isRequired,
	openDialog: PropTypes.bool,
};

const mapStateToProps = state => ({
	user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Scream));
