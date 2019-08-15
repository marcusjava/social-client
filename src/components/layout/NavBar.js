import React, { Component, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../redux/actions/userActions';

import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import Notifications from './Notifications';

import PostScream from '../scream/PostScream';

import MyButton from '../../util/MyButton';

class NavBar extends Component {
	render() {
		const {
			user: { authenticated },
			logout,
		} = this.props;
		return (
			<AppBar position="fixed">
				<Toolbar className="nav-container">
					{authenticated ? (
						<Fragment>
							<PostScream />
							<Link to="/">
								<MyButton tip="Home">
									<HomeIcon color="secondary" fontSize="large" />
								</MyButton>
							</Link>
							<MyButton tip="Notifications">
								<Notifications color="secondary" fontSize="large" />
							</MyButton>
						</Fragment>
					) : (
						<Fragment>
							<Button color="inherit" component={Link} to="/">
								Home
							</Button>
							<Button color="inherit" component={Link} to="/signup">
								SignUp
							</Button>
							<Button color="inherit" component={Link} to="/login">
								Login
							</Button>
						</Fragment>
					)}
				</Toolbar>
			</AppBar>
		);
	}
}

NavBar.propTypes = {
	user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	user: state.user,
});

export default connect(
	mapStateToProps,
	{ logout }
)(NavBar);
