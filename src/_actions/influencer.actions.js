import { infConstants } from '../_constants';
import { influencerService, userService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';
import { createInfluencer } from '../_models/InfluencerType';
import { toast } from "react-toastify";

export const infActions = {
    register,
    getAll,
    getAllJobCategories,
    getCostByUserName,
    registerJobs,
    updateInfluencers,
    getInfluencersByName
};

function register(infType, userType) {
    return dispatch => {
        dispatch(request(infType));

        userService.register(userType)
            .then(user => {
                userService.getToken(userType.UserName, userType.Password)
                    .then(token => {
                        influencerService.register(infType, token)
                            .then(influencer => {
                                history.push({
                                    pathname: '/dashBoardPage',
                                    state: { userName: userType.UserName }
                                })
                                //dispatch(alertActions.success('Registration successful'));
                                toast.success("Welcome" + influencer.fullName);
                            },
                                error => {
                                    dispatch(failure(error.toString()));
                                    dispatch(alertActions.error(error.toString()));
                                }
                            );
                    },
                        error => {
                            dispatch(failure(error.toString()));
                            dispatch(alertActions.error(error.toString()));
                        }
                    )

                //dispatch(alertActions.success('Registration User Successful'));
            },
                error => {
                    dispatch(failure(error.toString()));
                    //dispatch(alertActions.error(error.toString()));
                    toast.warn(userType.UserName + " is existed please use other emails");
                }
            );
    };

    function request(influencer) { return { type: infConstants.INF_REGISTER_REQUEST, influencer } }
    function success(influencer) { return { type: infConstants.INF_REGISTER_SUCCESS, influencer } }
    function failure(error) { return { type: infConstants.INF_REGISTER_FAILURE, error } }
}

function registerJobs(jobsType) {
    return dispatch => {
        dispatch(request());

        influencerService.registerJobs(jobsType)
            .then(
                jobsType => {
                    dispatch(success());
                    //history.push('/registerInfluencerPage');
                    //dispatch(alertActions.success('Registration Job Successful'));
                    toast.success("Welcome");
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: infConstants.JOB_REGISTER_REQUEST } }
    function success(jobs) { return { type: infConstants.JOB_REGISTER_SUCCESS, jobs } }
    function failure(error) { return { type: infConstants.JOB_REGISTER_FAILURE, error } }
}

function getAll(first, skip) {
    return dispatch => {
        dispatch(request());

        influencerService.getAll(first, skip)
            .then(
                influencers => dispatch(success(influencers)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    toast.error("Please login again");
                    history.push('/Login');
                }
            );
    };

    function request() { return { type: infConstants.INFS_GETALL_REQUEST } }
    function success(influencers) { return { type: infConstants.INFS_GETALL_SUCCESS, influencers } }
    function failure(error) { return { type: infConstants.INFS_GETALL_FAILURE, error } }
}

function getInfluencersByName(first, skip, userName) {
    return dispatch => {
        dispatch(request());

        influencerService.getInfluencersByName(first, skip, userName)
            .then(
                influencers => dispatch(success(influencers)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    toast.error("Please login again");
                    history.push('/Login');
                }
            );
    };

    function request() { return { type: infConstants.INFS_GETBYNAME_REQUEST } }
    function success(influencers) { return { type: infConstants.INFS_GETBYNAME_SUCCESS, influencers } }
    function failure(error) { return { type: infConstants.INFS_GETBYNAME_FAILURE, error } }
}

function getAllJobCategories() {
    return dispatch => {
        dispatch(request());

        influencerService.getAllJobCategories()
            .then(
                categories => dispatch(success(categories)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: infConstants.JOBCATEGORY_GETALL_REQUEST } }
    function success(jobCategories) { return { type: infConstants.JOBCATEGORY_GETALL_SUCCESS, jobCategories } }
    function failure(error) { return { type: infConstants.JOBCATEGORY_GETALL_FAILURE, error } }
}

function getCostByUserName(userName) {
    return dispatch => {
        dispatch(request());

        influencerService.getCostByUserName(userName)
            .then(
                influencer => {                    
                    dispatch(success(influencer))
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: infConstants.INFS_GETCOST_REQUEST } }
    function success(influencer) { return { type: infConstants.INFS_GETCOST_SUCCESS, influencer } }
    function failure(error) { return { type: infConstants.INFS_GETCOST_FAILURE, error } }
}

function updateInfluencers(infType, userName) {
    return dispatch => {
        dispatch(request(infType));

        const influencerType = createInfluencer(infType, userName);

        influencerService.updateInfluencers(influencerType)
            .then(
                infType => {
                    debugger;
                    dispatch(success(infType));
                    //history.push('/dashBoard');
                    //dispatch(alertActions.success('Registration Influencer successful'));
                    toast.success("Update successful");
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(influencer) { return { type: infConstants.INF_UPDATE_REQUEST, influencer } }
    function success(influencer) { return { type: infConstants.INF_UPDATE_SUCCESS, influencer } }
    function failure(error) { return { type: infConstants.INF_UPDATE_FAILURE, error } }
}