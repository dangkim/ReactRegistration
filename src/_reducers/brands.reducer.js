import { brandConstants } from '../_constants';

export function brands(state = {}, action) {
  switch (action.type) {
    case brandConstants.BRAND_REGISTER_REQUEST:
      return {
        registering: true
      };
    case brandConstants.BRAND_REGISTER_SUCCESS:
      return {
        brand: action.brand
      };
    case brandConstants.BRAND_REGISTER_FAILURE:
      return { 
        error: action.error
      };
    case brandConstants.BRANDS_GETALL_REQUEST:
      return {
        loading: true
      };
    case brandConstants.BRANDS_GETALL_SUCCESS:
      return {
        items: action.brands
      };
    case brandConstants.BRANDS_GETALL_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}