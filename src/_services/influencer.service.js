import configOrchardCore from 'configOrchardCore';
import { authHeader } from '../_helpers';

export const influencerService = {
    register,
    getAll,
    getAllJobCategories,
    registerJobs
};

function getAll() {
    const GET_ALL_INFS = `
    {
        influencer {
        contentItemId,
        contentItemVersionId,
        contentType,
        displayText,
        latest,
        published,
        modifiedUtc,
        publishedUtc,
        createdUtc,
        description,
        fanpage,
        owner,
        author
        photo {
        urls
        },
        bag{
          contentItems {
            ... on AgeDemorgraphic {
                  contentItemId,
                  contentType,
                  displayText,
                  latest,
                  published,
                  modifiedUtc,
                  publishedUtc,
                  createdUtc,
                  author,
                  demoGraphicsName,
                  percentage,
                  }
            ... on Networks {
                contentItemId,
                contentType,
                displayText,
                latest,
                published,
                modifiedUtc,
                publishedUtc,
                createdUtc,
                author,
                icon {
                  paths,
                  urls
                }
                }
            ... on Rates {                
                contentItemId,
                contentType,
                displayText,
                latest,
                published,
                modifiedUtc,
                publishedUtc,
                createdUtc,
                author,
                price,
                icon {
                  paths,
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

function register(InfluencerType) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(InfluencerType)
    };

    return fetch(`${configOrchardCore.apiUrl}content`, requestOptions).then(handleContentResponse);
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

function handleGraphInfResponse(response) {
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