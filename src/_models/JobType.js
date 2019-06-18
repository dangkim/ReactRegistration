export function createJobs(job, selectedOptionJobCategory) {
    var contentItems = [];
    if(selectedOptionJobCategory)
    {
      selectedOptionJobCategory.map((item, key) => 
      {         
          debugger;       
          const jobCategory = {
                                ContentItemId: item.value.contentItemId,
                                ContentItemVersionId: item.value.contentItemVersionId,
                                ContentType: item.value.contentType,
                                DisplayText: item.value.description,
                                Latest: item.value.latest,
                                Published: item.value.published,
                                ModifiedUtc: item.value.modifiedUtc,
                                PublishedUtc: item.value.publishedUtc,
                                CreatedUtc: item.value.createdUtc,
                                Owner: item.value.owner,
                                Author: item.value.author,
                                JobCategory: {
                                  icon: {
                                    Paths: []
                                  },
                                  Description: {
                                    Text: item.value.description
                                  }
                                },
                                TitlePart: {
                                  Title: item.value.description
                                }
                              };
          contentItems.push(jobCategory);
      });
    }
    
    const JobsType = {
      ContentItemId: '',
      ContentItemVersionId: null,
      ContentType: 'Jobs',
      DisplayText: job.jobName,
      Latest: true,
      Published: false,
      ModifiedUtc: '',
      PublishedUtc: '',
      CreatedUtc: '',
      Owner: 'admin',
      Author: null,
      Jobs: {
        Name: {
          Text: job.jobName
        },
        HashTag: {
          Text: job.jobHashTag
        },
        Keyword: {
          Text: job.jobKeyword
        },
        Link: {
          Text: job.jobLink
        },
        Description: {
          Text: job.jobDescription
        }
      },
      TitlePart: {
        Title: job.jobName
      },
      BagPart: {
        ContentItems: contentItems
      }
    }
  
    return JobsType;
  }