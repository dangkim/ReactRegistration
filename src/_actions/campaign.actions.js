import { campaignConstants } from '../_constants';
import { campaignService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const campaignActions = {
    register,
    getAll
};

function register(campaignType) {
    return dispatch => {
        dispatch(request(campaignType));

        campaignService.register(campaignType)
            .then(
                campaignType => { 
                    dispatch(success());
                    history.push('/registerCampaignPage');
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

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                campaigns => dispatch(success(campaigns)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: campaignConstants.CAMS_GETALL_REQUEST } }
    function success(campaigns) { return { type: campaignConstants.CAMS_GETALL_SUCCESS, campaigns } }
    function failure(error) { return { type: campaignConstants.CAMS_GETALL_FAILURE, error } }
}