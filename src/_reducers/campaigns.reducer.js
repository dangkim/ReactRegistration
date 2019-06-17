import { campaignConstants } from '../_constants';

export function campaigns(state = {}, action) {
  switch (action.type) {
    case campaignConstants.CAM_REGISTER_REQUEST:
      return {
        loading: true
      };
    case campaignConstants.CAM_REGISTER_SUCCESS:
      return {
        campaign: action.campaign
      };
    case campaignConstants.CAM_REGISTER_FAILURE:
      return { 
        error: action.error
      };
    case campaignConstants.CAMS_GETALL_REQUEST:
      return {
        loading: true
      };
    case campaignConstants.CAMS_GETALL_SUCCESS:
      return {
        items: action.campaigns
      };
    case campaignConstants.CAMS_GETALL_FAILURE:
      return { 
        error: action.error
      };
    case campaignConstants.LOCATION_GETALL_REQUEST:
      return {
        loading: true
      };
    case campaignConstants.LOCATION_GETALL_SUCCESS:
      return {
        locations: action.locations
      };
    case campaignConstants.LOCATION_GETALL_FAILURE:
      return { 
        error: action.error
      };
    case campaignConstants.INTERESTING_GETALL_REQUEST:
      return {
        loading: true
      };
    case campaignConstants.INTERESTING_GETALL_SUCCESS:
      return {
        interestings: action.interestings
      };
    case campaignConstants.INTERESTING_GETALL_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}