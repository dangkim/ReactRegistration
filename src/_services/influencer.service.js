import configOrchardCore from 'configOrchardCore';
import { authHeader } from '../_helpers';

export const influencerService = {
    register,
    getAll,
};

function getAll() {
    const GET_ALL_INFS = `
    {
        influencer {
            title: displayText,
            contentItemId,
            description,
            createdUtc,
            fanpage,
          	photo {
              urls
            },
            bag{
            contentItems {
                ... on AgeDemorgraphic {
                title: displayText,
                demoGraphicsName,
                percentage
                }
                ... on Networks {
                title: displayText,
                icon {
                    urls
                }
                }
                ... on Rates {
                price,
                title: displayText,
                icon {
                    urls
                }
                }
            }
            }
        }
    }
    `;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/graphql' },
        body: GET_ALL_INFS
    };

    return fetch(`${configOrchardCore.apiUrl}/graphql`, requestOptions).then(handleGraphResponse);
}

function register(InfluencerType) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(InfluencerType)
    };

    return fetch(`${configOrchardCore.apiUrl}/content`, requestOptions).then(handleContentResponse);
}

function handleGraphResponse(response) {
    return response.json().then(text => {
        const data = text.data;
        //debugger;
        
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