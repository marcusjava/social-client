import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';
import withStyles from '@material-ui/core/styles/withStyles';

import CircularProgress from '@material-ui/core/CircularProgress';

import ScreamSkeleton from '../util/ScreamSkeleton';

import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';

const styles = theme => ({
	...theme,
});

class Home extends Component {
	componentDidMount() {
		const { getScreams } = this.props;
		getScreams();
	}
	render() {
		const {
			data: { screams, loading },
			classes,
		} = this.props;
		let recentScreamsMarkup = !loading ? (
			screams.map(scream => <Scream scream={scream} key={scream.screamId} />)
		) : (
			<ScreamSkeleton />
		);
		return (
			<Grid container spacing={16}>
				<Grid item xs={12} sm={8}>
					{recentScreamsMarkup}
				</Grid>
				<Grid item xs={12} sm={4}>
					<Profile />
				</Grid>
			</Grid>
		);
	}
}

const mapStateToProps = state => ({
	data: state.data,
});

Home.propTypes = {
	getScreams: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
};

export default connect(
	mapStateToProps,
	{ getScreams }
)(withStyles(styles)(Home));
