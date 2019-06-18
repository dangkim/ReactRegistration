import { brandConstants } from '../_constants';
import { brandService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const brandActions = {
    register,
    getAll,
    getBrandFromBrandPage
};

function register(brandType) {
    return dispatch => {
        dispatch(request(brandType));

        brandService.register(brandType)
            .then(
                brand => { 
                    dispatch(success());
                    history.push({
                        pathname: '/registerCampaignPage',
                        state: { brand: brand }
                    })
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(brand) { return { type: brandConstants.BRAND_REGISTER_REQUEST, brand } }
    function success(brand) { return { type: brandConstants.BRAND_REGISTER_SUCCESS, brand } }
    function failure(error) { return { type: brandConstants.BRAND_REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                brands => dispatch(success(brands)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: brandConstants.BRANDS_GETALL_REQUEST } }
    function success(brands) { return { type: brandConstants.BRANDS_GETALL_SUCCESS, brands } }
    function failure(error) { return { type: brandConstants.BRANDS_GETALL_FAILURE, error } }
}

function getBrandFromBrandPage(brand) {
    return dispatch => {
        dispatch(request());
        if(brand)
        {
            dispatch(success(brand));
        }
        else{
            const error = "cannot get from brand";
            dispatch(failure(error.toString()));
            dispatch(alertActions.error(error.toString()));
        }
    };

    function request() { return { type: brandConstants.FROM_BRAND_REQUEST } }
    function success(brand) { return { type: brandConstants.FROM_BRAND_SUCCESS, brand } }
    function failure(error) { return { type: brandConstants.FROM_BRAND_FAILURE,  error} }
}