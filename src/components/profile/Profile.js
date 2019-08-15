import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import EditDetails from '../scream/EditDetails';

import ProfileSkeleton from '../../util/ProfileSkeleton';

import MyButton from '../../util/MyButton';
// MUI stuff

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';

// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
//Redux
import { connect } from 'react-redux';
import { logout, uploadImage } from '../../redux/actions/userActions';
import { IconButton } from '@material-ui/core';

const styles = theme => ({ ...theme });

class Profile extends Component {
	handleImageChange = event => {
		event.preventDefault();
		const image = event.target.files[0];
		const formData = new FormData();
		formData.append('image', image, image.name);
		this.props.uploadImage(formData);
	};
	handleEditPicture = event => {
		const fileInput = document.getElementById('imageInput');
		fileInput.click();
	};
	render() {
		const {
			user: {
				credentials: { handle, createdAt, imageUrl, bio, website, location },
				loading,
				authenticated,
			},
			classes,
		} = this.props;

		let profileMarkup = !loading ? (
			authenticated ? (
				<Paper className={classes.paper}>
					<div className={classes.profile}>
						<div className="image-wrapper">
							<img src={imageUrl} alt="profile" className="profile-image" />

							<input type="file" hidden="hidden" id="imageInput" onChange={this.handleImageChange} />
							<MyButton
								onClick={this.handleEditPicture}
								tip="Edit profile picture"
								placement="top"
								btnClassName="button"
							>
								<EditIcon color="primary" />
							</MyButton>
						</div>
						<hr />
						<div className="profile-details">
							<MuiLink component={Link} to={`/user/${handle}`} color="primary" variant="h5">
								@{handle}
							</MuiLink>
							<hr />
							{bio && <Typography variant="body2">{bio}</Typography>}
							<hr />
							{location && (
								<Fragment>
									<LocationOn color="primary" />

									<span>{location}</span>
								</Fragment>
							)}
							<hr />
							{website && (
								<Fragment>
									<LinkIcon color="primary" />
									<a href={website} target="_blank" rel="noopener noreferrer">
										{' '}
										{website}
									</a>
								</Fragment>
							)}
							<hr />
							<CalendarToday color="primary" />{' '}
							<span> Joined {dayjs(createdAt).format('MMM YYYY')} </span>
						</div>
						<hr />
						<MyButton onClick={() => this.props.logout()} tip="logout" placement="top">
							<KeyboardReturn color="primary" align="right" />
						</MyButton>

						<EditDetails />
					</div>
				</Paper>
			) : (
				<Paper className={classes.paper}>
					<Typography variant="body2" align="center">
						No profile found please login again
					</Typography>
					<div className={classes.buttons}>
						<Button variant="contained" color="primary" component={Link} to="/login">
							Login
						</Button>
						<Button variant="contained" color="secondary" component={Link} to="/signup">
							SignUp
						</Button>
					</div>
				</Paper>
			)
		) : (
			<ProfileSkeleton />
		);
		return profileMarkup;
	}
}

Profile.propTypes = {
	user: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	logout: PropTypes.func.isRequired,
	uploadImage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	user: state.user,
});
export default connect(
	mapStateToProps,
	{ logout, uploadImage }
)(withStyles(styles)(Profile));
