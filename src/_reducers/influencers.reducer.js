import { infConstants } from '../_constants';

export function influencers(state = {}, action) {
  switch (action.type) {
    case infConstants.INF_REGISTER_REQUEST:
      return {
        loading: true
      };
    case infConstants.INF_REGISTER_SUCCESS:
      return {
        influencer: action.influencer
      };
    case infConstants.INF_REGISTER_FAILURE:
      return {
        error: action.error
      };
    case infConstants.INF_UPDATE_REQUEST:
      return {
        loading: true
      };
    case infConstants.INF_UPDATE_SUCCESS:
      return {
        items: action.influencer
      };
    case infConstants.INF_UPDATE_FAILURE:
      return {
        error: action.error
      };
    case infConstants.INFS_GETALL_REQUEST:
      return {
        loading: true
      };
    case infConstants.INFS_GETALL_SUCCESS:
      return {
        items: action.influencers
      };
    case infConstants.INFS_GETALL_FAILURE:
      return {
        error: action.error
      };
    case infConstants.INFS_GETBYNAME_REQUEST:
      return {
        loading: true
      };
    case infConstants.INFS_GETBYNAME_SUCCESS:
      return {
        items: action.influencers
      };
    case infConstants.INFS_GETBYNAME_FAILURE:
      return {
        error: action.error
      };
    case infConstants.JOB_REGISTER_REQUEST:
      return {
        loading: true
      };
    case infConstants.JOB_REGISTER_SUCCESS:
      return {
        jobs: action.jobs
      };
    case infConstants.JOB_REGISTER_FAILURE:
      return {
        error: action.error
      };
    case infConstants.INFS_GETCOST_FAILURE:
      return {
        error: action.error
      };
    case infConstants.INFS_GETCOST_SUCCESS:
      return {
        items: action.influencer
      };
    case infConstants.INFS_GETCOST_REQUEST:
      return {
        loading: true
      };
    default:
      return state
  }
}