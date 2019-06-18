export function createCampaigns(campaign,
  jobs,
  selectedOptionLocation,
  selectedOptionInteresting,
  brand,
  checkedInfluencers) {

  var campaignsContentItems = [];
  var contentLocationItems = [];
  var contentInterestingItems = [];
  var influencers = null;

  if(selectedOptionLocation)
  {
    selectedOptionLocation.map((item, key) => 
    {         
        debugger;       
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
        contentInterestingItems.push(location);
    });

    campaignsContentItems.push(contentInterestingItems);
  }

  if(selectedOptionInteresting)
  {
    selectedOptionInteresting.map((item, key) => 
    {         
        debugger;       
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
        contentLocationItems.push(interesting);
    });

    campaignsContentItems.push(contentLocationItems);
  }

  if(checkedInfluencers)
  {
    influencers = checkedInfluencers.map((influencer, key) => 
    {   
      influencer.BagPart.ContentItems.push(jobs);
    })

    campaignsContentItems.push(influencers);
  }

  const compaignType = {
    ContentItemId: campaign.contentItemId,
    ContentItemVersionId: null,
    ContentType: 'Campaign',
    DisplayText: brand.brandName,
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
        Text: brand.fullName
      },
      Email: {
        Text: brand.email
      },
      BrandName: {
        Text: brand.brandName
      },
      BusinessAreas: {
        Text: brand.businessAreas
      },
      Phone: {
        Text: brand.phone
      },
      Password: {
        Text: brand.password
      },
      Location: {
        Text: brand.location
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
      Title: brand.brandName
    }
  }

  return campaignsType;
}