export function createCampaigns(campaign,
  jobs,
  selectedOptionLocation,
  selectedOptionInteresting,
  brand,
  selectedInfluencers) {

  var campaignsContentItems = [];
  var contentLocationItems = [];
  var contentInterestingItems = [];
  var influencers = null;

  if(selectedOptionLocation)
  {
    selectedOptionLocation.map((item, key) => 
    {           
        const location = {
          ContentItemId: item.contentItemId,
          ContentItemVersionId: item.contentItemVersionId,
          ContentType: 'Locations',
          DisplayText: item.location,
          Latest: item.latest,
          Published: item.published,
          ModifiedUtc: item.modifiedUtc,
          PublishedUtc: item.publishedUtc,
          CreatedUtc: item.createdUtc,
          Owner: item.owner,
          Author: item.author,
          Locations: {
            Location: {
              Text: item.location
            }
          },
          TitlePart: {
            Title: item.location
          }
        };
        contentLocationItems.push(location);
    });

    campaignsContentItems.push(contentLocationItems);
  }

  if(selectedOptionInteresting)
  {
    selectedOptionInteresting.map((item, key) => 
    {          
        const interesting = {
          ContentItemId: item.contentItemId,
          ContentItemVersionId: item.contentItemVersionId,
          ContentType: 'InterestingList',
          DisplayText: item.interesting,
          Latest: item.latest,
          Published: item.published,
          ModifiedUtc: item.modifiedUtc,
          PublishedUtc: item.publishedUtc,
          CreatedUtc: item.createdUtc,
          Owner: item.owner,
          Author: item.author,
          InterestingList: {
            Interesting: {
              Text: item.interesting
            }
          },
          TitlePart: {
            Title: item.interesting
          }
        };
        contentInterestingItems.push(interesting);
    });

    campaignsContentItems.push(contentInterestingItems);
  }

  if(selectedInfluencers)
  {
    selectedInfluencers.forEach(function(influencer, key) {
      debugger;
      influencer.bag.contentItems.push(jobs);
      //console.log(key + ' = ' + value);
    });
    // influencers = selectedInfluencers.map((influencer, key) => 
    // {   
    //   influencer.BagPart.ContentItems.push(jobs);
    // })

    campaignsContentItems.push(influencers);
  }

  const compaignType = {
    ContentItemId: campaign.contentItemId,
    ContentItemVersionId: null,
    ContentType: 'Campaign',
    DisplayText: brand.BrandName,
    Latest: false,
    Published: false,
    ModifiedUtc: campaign.modifiedUtc,
    PublishedUtc: campaign.publishedUtc,
    CreatedUtc: campaign.createdUtc,
    Owner: 'admin',
    Author: 'admin',
    Campaign: {
      CampaignTarget: {
        Text: campaign.campaignTarget
      },
      FromDate: {
        Value: campaign.fromDate
      },
      ToDate: {
        Value: campaign.toDate
      },
      ProductInfo: {
        Text: campaign.productInfo
      },
      Budget: {
        Value: campaign.budget
      },
      Currency: {
        Text: 'VND'
      },
      CampaignName: {
        Text: campaign.campaignName
      },
      MarketPlace: {
        Text: 'Toàn Quốc'
      },
      FromAge: {
        Value: campaign.fromAge
      },
      ToAge: {
        Value: campaign.toAge
      },
      Gender: {
        Value: campaign.gender
      }
    },
    TitlePart: {
      Title: "Campaign" + brand.brandName,
    },
    BagPart: {
      ContentItems: campaignsContentItems
    }
  }

  const campaignsType = {
    ContentItemId: '',
    ContentItemVersionId: '',
    ContentType: 'Campaigns',
    DisplayText: brand.brandName,
    Latest: true,
    Published: false,
    ModifiedUtc: '',
    PublishedUtc: '',
    CreatedUtc: '',
    Owner: 'admin',
    Author: 'admin',
    Campaigns: {
      FullName: {
        Text: brand.FullName
      },
      Email: {
        Text: brand.Email
      },
      BrandName: {
        Text: brand.BrandName
      },
      BusinessAreas: {
        Text: brand.BusinessAreas
      },
      Phone: {
        Text: brand.Phone
      },
      Password: {
        Text: brand.Password
      },
      Location: {
        Text: brand.Location
      }
    },
    AutoroutePart: {
      Path: null,
      SetHomepage: false
    },
    BagPart: {
      ContentItems: [
        compaignType
      ]
    },
    TitlePart: {
      Title: brand.BrandName
    }
  }

  return campaignsType;
}