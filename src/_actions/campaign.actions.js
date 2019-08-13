import { campaignConstants } from '../_constants';
import { campaignService, influencerService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';
import { createCampaign, createCampaigns } from '../_models/CampaignsType';
import { toast } from "react-toastify";

export const campaignActions = {
    register,
    getAll,
    getAllLocation,
    getAllInteresting
};

function register(campaign,
    fromDate,
    toDate,
    job,
    selectedOptionLocation,
    selectedOptionInteresting,
    selectedOptionJobCategory,
    brandName,
    brandFullName,
    businessAreas,
    brandLocation,
    selectedInfluencers,
    checkedInfluencers) {
    return dispatch => {
        debugger;
        dispatch(request());

        const campaignLocal = createCampaign(campaign,
            fromDate,
            toDate,
            job,
            selectedOptionLocation,
            selectedOptionInteresting,
            selectedOptionJobCategory,
            brandName,
            selectedInfluencers);

        campaignService.register(campaignLocal)
            .then(campaignType => {
                const campaignsLocal = createCampaigns(brandName,
                    brandFullName,
                    businessAreas,
                    brandLocation,
                    campaignType);
                campaignService.register(campaignsLocal)
                    .then(campaignsType => {
                        dispatch(success(campaignsType));
                        history.push('/registerBrandPage');
                        //dispatch(alertActions.success('Registration Campaigns Successful'));
                        toast.success("Registration Campaigns Successful");
                    }),
                    error => {
                        dispatch(failure(error.toString()));
                        dispatch(alertActions.error(error.toString()));
                    }

                //dispatch(alertActions.success('Registration Campaign successful'));
            },
                error => {
                    dispatch(failure(error.toString()));
                    //dispatch(alertActions.error(error.toString()));
                }
            );

        //dispatch(alertActions.success('Registration Job Successful'));
    };

    function request() { return { type: campaignConstants.CAM_REGISTER_REQUEST } }
    function success(campaigns) { return { type: campaignConstants.CAM_REGISTER_SUCCESS, campaigns } }
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
        debugger;
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