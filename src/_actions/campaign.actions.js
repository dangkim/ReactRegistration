import { campaignConstants } from '../_constants';
import { campaignService, influencerService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';
import {createCampaigns} from '../_models/CampaignsType';

export const campaignActions = {
    register,
    getAll,
    getAllLocation,
    getAllInteresting
};

function register(campaign,
                jobsLocal,
                selectedOptionLocation,
                selectedOptionInteresting,
                brand,
                checkedInfluencers) {
    return dispatch => {

        dispatch(request());

        influencerService.registerJobs(jobsLocal)
            .then(
                jobsType => {
                    const campaignsLocal = createCampaigns(campaign,
                                                    jobsType,
                                                    selectedOptionLocation,
                                                    selectedOptionInteresting,
                                                    brand,
                                                    checkedInfluencers);
                    campaignService.register(campaignsLocal)
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

                    //dispatch(success());
                    //history.push('/registerCampaignPage');
                    dispatch(alertActions.success('Registration Job Successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
        );

        // dispatch(request(campaignType));

        
    };

    function request() { return { type: campaignConstants.CAM_REGISTER_SUCCESS } }
    function success(jobs) { return { type: campaignConstants.CAM_REGISTER_SUCCESS, jobs } }
    function failure(error) { return { type: campaignConstants.CAM_REGISTER_SUCCESS, error } }

    // function request(user) { return { type: campaignConstants.CAM_REGISTER_REQUEST, user } }
    // function success(user) { return { type: campaignConstants.CAM_REGISTER_SUCCESS, user } }
    // function failure(error) { return { type: campaignConstants.CAM_REGISTER_FAILURE, error } }
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