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
    default:
      return state
  }
}