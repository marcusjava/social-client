import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import dayjs from 'dayjs';

import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
//Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

import { Link } from 'react-router-dom';

const styles = theme => ({
	...theme,
});
const StaticPropfile = ({ classes, profile: { handle, createdAt, imageUrl, bio, website, location } }) => {
	return (
		<Paper className={classes.paper}>
			<div className={classes.profile}>
				<div className="image-wrapper">
					<img src={imageUrl} alt="profile" className="profile-image" />
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
					<CalendarToday color="primary" /> <span> Joined {dayjs(createdAt).format('MMM YYYY')} </span>
				</div>
				<hr />
			</div>
		</Paper>
	);
};

StaticPropfile.propTypes = {
	classes: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

export default withStyles(styles)(StaticPropfile);
