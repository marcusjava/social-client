import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Link } from 'react-router-dom';

import { markNotificationsAsRead } from '../../redux/actions/userActions';

// MUI stuff
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';

class Notifications extends Component {
	state = {
		anchorEl: null,
	};

	handleOpen = e => {
		this.setState({ anchorEl: e.target });
	};

	handleClose = e => {
		this.setState({ anchorEl: null });
	};

	onMenuOpened = () => {
		let unreadNotificationsIds = this.props.notifications.filter(not => !not.read).map(not => not.notificationId);
		this.props.markNotificationsAsRead(unreadNotificationsIds);
	};
	render() {
		dayjs.extend(relativeTime);
		const { notifications } = this.props;
		const { anchorEl } = this.state;

		let notificationIcon;

		//verificando se há notificação
		if (notifications && notifications.length > 0) {
			notifications.filter(not => not.read === false).length > 0
				? (notificationIcon = (
						<Badge badgeContent={notifications.filter(not => not.read === false).length} color="secondary">
							<NotificationsIcon color="secondary" fontSize="large" />
						</Badge>
				  ))
				: (notificationIcon = <NotificationsIcon color="secondary" fontSize="large" />);
		} else {
			notificationIcon = <NotificationsIcon color="secondary" fontSize="large" />;
		}

		let notificationsMarkup =
			notifications && notifications.length > 0 ? (
				notifications.map(not => {
					const verb = not.type === 'like' ? 'liked' : 'commented on';
					const time = dayjs(not.createdAt).fromNow();
					const iconColor = not.read ? 'primary' : 'secondary';
					const icon =
						not.type === 'like' ? (
							<FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
						) : (
							<ChatIcon color={iconColor} style={{ marginRight: 10 }} />
						);

					return (
						<MenuItem key={not.createdAt} onClick={this.handleClose}>
							{icon}
							<Typography
								component={Link}
								color="default"
								variant="body1"
								to={`/user/${not.recipient}/scream/${not.screamId}`}
							>
								{not.sender} {verb} your scream {time}
							</Typography>
						</MenuItem>
					);
				})
			) : (
				<MenuItem onClick={this.handleClose}>You not have notifications yet</MenuItem>
			);
		return (
			<Fragment>
				<Tooltip placement="top" title="Notifications">
					<IconButton
						aria-owns={anchorEl ? 'simple-menu' : undefined}
						aria-haspopup="true"
						onClick={this.handleOpen}
					>
						{notificationIcon}
					</IconButton>
				</Tooltip>
				<Menu
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={this.handleClose}
					onEntered={this.onMenuOpened}
				>
					{notificationsMarkup}
				</Menu>
			</Fragment>
		);
	}
}

Notifications.propTypes = {
	markNotificationsAsRead: PropTypes.func.isRequired,
	notifications: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
	notifications: state.user.notifications,
});
export default connect(
	mapStateToProps,
	{ markNotificationsAsRead }
)(Notifications);
