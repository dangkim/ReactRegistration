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
    case infConstants.INFS_FROMBRAND_REQUEST:
      return { 
        loading: true
      };
    case infConstants.INFS_FROMBRAND_SUCCESS:
      return { 
        brand: action.brand
      };
    case infConstants.INFS_FROMBRAND_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}