import { infConstants } from '../_constants';
import { influencerService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const infActions = {
    register,
    getAll,
    getAllJobCategories,
    registerJobs
};

function register(infType) {
    return dispatch => {
        dispatch(request(infType));

        influencerService.register(infType)
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

function registerJobs(jobsType) {
    return dispatch => {
        dispatch(request());

        influencerService.registerJobs(jobsType)
            .then(
                jobsType => { 
                    dispatch(success());
                    //history.push('/registerInfluencerPage');
                    dispatch(alertActions.success('Registration Job Successful'));
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

function getAll() {
    return dispatch => {
        dispatch(request());

        influencerService.getAll()
            .then(
                influencers => dispatch(success(influencers)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: infConstants.INFS_GETALL_REQUEST } }
    function success(influencers) { return { type: infConstants.INFS_GETALL_SUCCESS, influencers } }
    function failure(error) { return { type: infConstants.INFS_GETALL_FAILURE, error } }
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