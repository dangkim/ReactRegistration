import configOrchardCore from 'configOrchardCore';
import { authHeader } from '../_helpers';

export const campaignService = {
    register
};

function register(campaignType) {
    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(campaignType)
    // };

    // return fetch(`${configOrchardCore.apiUrl}/content`, requestOptions).then(handleResponse);

    const GET_ALL_COMPAIGN = `
    {
        influencer {
            title: displayText,
            contentItemId,
            description,
            createdUtc,
            fanpage,
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
                    paths
                    urls
                }
                }
                ... on Rates {
                price,
                title: displayText,
                icon {
                    paths
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
        body: GET_ALL_COMPAIGN
    };

    return fetch(`${configOrchardCore.apiUrl}/graphql`, requestOptions).then(handleResponse);
}

function getListOfCampaign() {
    const GET_ALL_COMPAIGN = `
    {
        influencer {
            title: displayText,
            contentItemId,
            description,
            createdUtc,
            fanpage,
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
                    paths
                    urls
                }
                }
                ... on Rates {
                price,
                title: displayText,
                icon {
                    paths
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
        body: GET_ALL_COMPAIGN
    };

    return fetch(`${configOrchardCore.apiUrl}/content`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    // return response.text().then(text => {
    //     const data = text && JSON.parse(text);
    //     if (!response.ok) {
    //         if (response.status === 401) {
    //             // auto logout if 401 response returned from api
    //             logout();
    //             location.reload(true);
    //         }

    //         const error = (data && data.message) || response.statusText;
    //         return Promise.reject(error);
    //     }

    //     return data;
    // });
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