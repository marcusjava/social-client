import React, { Component, Fragment } from 'react';
import MyButton from '../../util/MyButton';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { likeScream, unlikeScream } from '../../redux/actions/dataActions';

//Redux
import { connect } from 'react-redux';

class LikeButton extends Component {
	likedScream = () => {
		const {
			user: { likes },
			screamId,
		} = this.props;
		if (likes && likes.find(like => like.screamId === screamId)) return true;
		else return false;
	};

	render() {
		const {
			user: { authenticated },
			screamId,
		} = this.props;

		const likeButton = !authenticated ? (
			<Link to="/login">
				<MyButton tip="Like">
					<FavoriteBorder color="primary" />
				</MyButton>
			</Link>
		) : this.likedScream() ? (
			<MyButton tip="Undo like" onClick={() => this.props.unlikeScream(screamId)}>
				<FavoriteIcon color="primary" />
			</MyButton>
		) : (
			<MyButton tip="Like" onClick={() => this.props.likeScream(screamId)}>
				<FavoriteBorder color="primary" />
			</MyButton>
		);
		return <Fragment>{likeButton}</Fragment>;
	}
}

LikeButton.propTypes = {
	user: PropTypes.object.isRequired,
	screamId: PropTypes.string.isRequired,
	likeScream: PropTypes.func.isRequired,
	unlikeScream: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	user: state.user,
});

export default connect(
	mapStateToProps,
	{ likeScream, unlikeScream }
)(LikeButton);
