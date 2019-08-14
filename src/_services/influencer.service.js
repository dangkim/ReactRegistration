import configOrchardCore from 'configOrchardCore';
import { authHeader } from '../_helpers';

export const influencerService = {
    register,
    getAll,
    getAllJobCategories,
    getCostByContentItemId,
    getCostByUserName,
    updateInfluencers,
    registerJobs,
    getInfluencersByName
};

function getAll(first, skip) {
    const GET_ALL_INFS = `
    {
        influencer(first: `+ first + `, skip: ` + skip + `){
            author
            checkIn
            contentItemId
            contentItemVersionId
            contentType
            createdUtc
            description
            displayText
            email
            fullName
            genderDemorgraphic {
              genderGraphicName
              genderPercentage
            }
            geoDemorgraphic {
              geoGraphicName
              geoPercentage
            }
            latest
            modifiedUtc
            numberOfComment
            numberOfLike
            numberOfLove
            owner
            phone
            ageDemorgraphic {
              ageGraphicsName
              agePercentage
            }
            photo {
              paths
              urls
            }
            published
            publishedUtc
          }
    }
    `;

    const token = localStorage.getItem('token');
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/graphql',
            'Authorization': token
        },
        body: GET_ALL_INFS
    };

    return fetch(`${configOrchardCore.apiUrl}graphql`, requestOptions).then(handleGraphInfResponse);

}

function getInfluencersByName(first, skip, userName) {
    const GET_ALL_INFS = `
    {
        influencer(first: `+ first + `, skip: ` + skip + `, where: {displayText_contains: "`+ userName +`"}){
            author
            checkIn
            contentItemId
            contentItemVersionId
            contentType
            createdUtc
            description
            displayText
            email
            fullName
            genderDemorgraphic {
              genderGraphicName
              genderPercentage
            }
            geoDemorgraphic {
              geoGraphicName
              geoPercentage
            }
            latest
            modifiedUtc
            numberOfComment
            numberOfLike
            numberOfLove
            owner
            phone
            ageDemorgraphic {
              ageGraphicsName
              agePercentage
            }
            photo {
              paths
              urls
            }
            published
            publishedUtc
          }
    }
    `;

    const token = localStorage.getItem('token');
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/graphql',
            'Authorization': token
        },
        body: GET_ALL_INFS
    };

    return fetch(`${configOrchardCore.apiUrl}graphql`, requestOptions).then(handleGraphInfResponse);

}

function getAllJobCategories() {
    const GET_ALL_JOBCATEGORIES = `
    {
        jobCategory{
        contentItemId,
        contentItemVersionId,
        contentType,
        displayText,
        latest,
        published,
        modifiedUtc,
        publishedUtc,
        createdUtc,
        owner,
        author,
        description
      }
    }
    `;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/graphql' },
        body: GET_ALL_JOBCATEGORIES
    };

    return fetch(`${configOrchardCore.apiUrl}/graphql`, requestOptions).then(handleGraphJobCategoryResponse);
}

function getCostByContentItemId(contentItemId) {
    const GET_COST_BY_CONTENTID = `
    {
        influencer(where: {contentItemId: ` + contentItemId + `}) {
          contentItemId
          bag {
            contentItems {
              ... on Rates {
                modifiedUtc
                price
                displayText
                contentItemId
              }
            }
          }
        }
      }
    `;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/graphql' },
        body: GET_COST_BY_CONTENTID
    };

    return fetch(`${configOrchardCore.apiUrl}/graphql`, requestOptions).then(handleGraphRatesResponse);
}

function getCostByUserName(userName) {

    const GET_COST_BY_USERNAME = `
    {
        influencer(where: {displayText_contains: "` + userName + `"}, status: PUBLISHED) {
            contentItemId
            contentType
            liveStream
            shareLink
            video
            postImage
            fullName
            displayText
            author
            checkIn
            contentItemVersionId
            createdUtc
            description
            email
            fanpage
            genderDemorgraphic {
              genderGraphicName
              genderPercentage
            }
            geoDemorgraphic {
              geoGraphicName
              geoPercentage
            }
            latest
            modifiedUtc
            numberOfComment
            numberOfLike
            numberOfLove
            owner
            phone
            photo {
              paths
              urls
            }
            published
            publishedUtc
      }
    }
    `;

    const token = localStorage.getItem('token');
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/graphql',
            'Authorization': token
        },
        body: GET_COST_BY_USERNAME
    };

    return fetch(`${configOrchardCore.apiUrl}graphql`, requestOptions).then(handleGraphRatesResponse);
}

function register(InfluencerType, token) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(InfluencerType)
    };

    return fetch(`${configOrchardCore.apiUrl}content/Post`, requestOptions).then(handleContentResponse);
}

function updateInfluencers(InfluencerType) {
    const token = localStorage.getItem('token');

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(InfluencerType)
    };

    return fetch(`${configOrchardCore.apiUrl}content/post03`, requestOptions).then(handleContentResponse);
}

function registerJobs(JobsType) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(JobsType)
    };

    return fetch(`${configOrchardCore.apiUrl}/content`, requestOptions).then(handleContentJobsResponse);
}

function handleTokenContentResponse(response) {
    return response.text().then(text => {
        const data = text;
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        debugger;
        return data;
    });
}

function handleGraphJobCategoryResponse(response) {
    return response.json().then(text => {
        const data = text.data.jobCategory;
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

function handleGraphRatesResponse(response) {
    return response.json().then(text => {

        const data = text.data;//.influencer[0].bag.contentItems;

        // var newArray = data.filter(value => Object.keys(value).length !== 0 && value.contentType == "Rates");
        var influencer = data.influencer[0];

        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return influencer;
    });
}

function handleGraphInfResponse(response) {
    if (!response.ok) {
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            logout();
            location.reload(true);
            const error = response.statusText;            
            return Promise.reject(error);
        }
    }

    return response.json().then(text => {        
        const data = text.data;
        return data;
    });
}

function handleContentResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
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

function handleContentJobsResponse(response) {
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

function logout() {    
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('token');
}