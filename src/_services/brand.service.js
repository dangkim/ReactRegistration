import configOrchardCore from 'configOrchardCore';
import { authHeader } from '../_helpers';

export const brandService = {
    register,
    getAll,
};

function getAll() {
    const GET_ALL_BRAND = `
    {
        {
            brand {
                title: displayText,
                contentItemId,
                brandName,
                businessAreas,
                fullName,
                email,
                location,
                phone,
                createdUtc,
            }
          }
    }
    `;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/graphql' },
        body: GET_ALL_BRAND
    };

    return fetch(`${configOrchardCore.apiUrl}/graphql`, requestOptions).then(handleGraphResponse);
}

function register(InfluencerType) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(InfluencerType)
    };
    debugger;
    return fetch(`${configOrchardCore.apiUrl}/content`, requestOptions).then(handleContentResponse);
}

function handleGraphResponse(response) {
    return response.json().then(text => {
        const data = text.data;
        debugger;
        
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function handleContentResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });    
}