import { infConstants } from '../_constants';
import { infService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const infActions = {
    register,
    getAll,
};

function register(infType) {
    return dispatch => {
        dispatch(request(infType));

        infService.register(infType)
            .then(
                infType => { 
                    dispatch(success());
                    history.push('/registerInfluencerPage');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(influencer) { return { type: infConstants.INF_REGISTER_REQUEST, influencer } }
    function success(influencer) { return { type: infConstants.INF_REGISTER_SUCCESS, influencer } }
    function failure(error) { return { type: infConstants.INF_REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                influencers => dispatch(success(influencers)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: infConstants.INFS_GETALL_REQUEST } }
    function success(influencers) { return { type: infConstants.INFS_GETALL_SUCCESS, influencers } }
    function failure(error) { return { type: infConstants.INFS_GETALL_FAILURE, error } }
}