import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Scream from '../components/scream/Scream';
import StaticProfile from '../components/profile/StaticProfile';

import ScreamSkeleton from '../util/ScreamSkeleton';

import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';

import { getUserData } from '../redux/actions/dataActions';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios';

import { connect } from 'react-redux';

const styles = theme => ({
	...theme,
});

class User extends Component {
	state = {
		profile: null,
		screamIdParam: null,
	};
	componentDidMount() {
		const handle = this.props.match.params.handle;
		const screamId = this.props.match.params.screamId;
		if (screamId) this.setState({ screamIdParam: screamId });
		this.props.getUserData(handle);
		axios
			.get(`/user/${handle}`)
			.then(res => {
				this.setState({ profile: res.data.user });
			})
			.catch(errors => console.log(errors));
	}
	render() {
		const {
			data: { screams, loading },
			classes,
		} = this.props;
		const { profile, screamIdParam } = this.state;

		const screamsMarkup = loading ? (
			<ScreamSkeleton />
		) : screams === null ? (
			<p>No screams yet</p>
		) : !screamIdParam ? (
			screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
		) : (
			screams.map(scream => {
				if (scream.screamId !== screamIdParam) {
					return <Scream key={scream.screamId} scream={scream} />;
				} else {
					return <Scream key={scream.screamId} scream={scream} openDialog />;
				}
			})
		);
		return (
			<Grid container spacing={16}>
				<Grid item xs={12} sm={8}>
					{screamsMarkup}
				</Grid>
				<Grid item xs={12} sm={4}>
					{profile && <StaticProfile profile={profile} />}
				</Grid>
			</Grid>
		);
	}
}

User.propTypes = {
	data: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	data: state.data,
});

export default connect(
	mapStateToProps,
	{ getUserData }
)(withStyles(styles)(User));
