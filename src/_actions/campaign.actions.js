import { campaignConstants } from '../_constants';
import { campaignService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const campaignActions = {
    register,
    getAll,
    getAllLocation,
    getAllInteresting
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
                campaign => dispatch(success(campaign)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: campaignConstants.CAMS_GETALL_REQUEST } }
    function success(campaign) { return { type: campaignConstants.CAMS_GETALL_SUCCESS, campaign } }
    function failure(error) { return { type: campaignConstants.CAMS_GETALL_FAILURE, error } }
}

function getAllLocation() {
    return dispatch => {
        dispatch(request());

        campaignService.getAllLocation()
            .then(
                locations => dispatch(success(locations)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: campaignConstants.LOCATION_GETALL_REQUEST } }
    function success(locations) { return { type: campaignConstants.LOCATION_GETALL_SUCCESS, locations } }
    function failure(error) { return { type: campaignConstants.LOCATION_GETALL_FAILURE, error } }
}

function getAllInteresting() {
    return dispatch => {
        dispatch(request());

        campaignService.getAllInteresting()
            .then(
                interestings => dispatch(success(interestings)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: campaignConstants.INTERESTING_GETALL_REQUEST } }
    function success(interestings) { return { type: campaignConstants.INTERESTING_GETALL_SUCCESS, interestings } }
    function failure(error) { return { type: campaignConstants.INTERESTING_GETALL_FAILURE, error } }
}