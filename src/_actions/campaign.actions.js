import { campaignConstants } from '../_constants';
import { campaignService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const campaignActions = {
    register
};

function register(campaignType) {
    return dispatch => {
        dispatch(request(campaignType));

        campaignService.register(campaignType)
            .then(
                campaignType => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: campaignConstants.CAM_REGISTER_REQUEST, user } }
    function success(user) { return { type: campaignConstants.CAM_REGISTER_SUCCESS, user } }
    function failure(error) { return { type: campaignConstants.CAM_REGISTER_FAILURE, error } }
}