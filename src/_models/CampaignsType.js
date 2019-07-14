export function createCampaigns(brand, compaignType) {

  const campaignsType = {
    ContentItemId: '',
    ContentItemVersionId: '',
    ContentType: 'Campaigns',
    DisplayText: brand.Brand.BrandName.Text,
    Latest: true,
    Published: false,
    ModifiedUtc: '',
    PublishedUtc: '',
    CreatedUtc: '',
    Owner: 'admin',
    Author: 'admin',
    Campaigns: {
      FullName: {
        Text: brand.Brand.FullName.Text
      },
      Email: {
        Text: brand.Brand.Email.Text
      },
      BrandName: {
        Text: brand.Brand.BrandName.Text
      },
      BusinessAreas: {
        Text: brand.Brand.BusinessAreas.Text
      },
      Phone: {
        Text: brand.Brand.Phone.Text
      },
      Password: {
        Text: brand.Brand.Password.Text
      },
      Location: {
        Text: brand.Brand.Location.Text
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
      Title: brand.TitlePart.Title
    }
  }
  debugger;
  return campaignsType;
}

export function createCampaign(campaign,
  jobs,
  selectedOptionLocation,
  selectedOptionInteresting,
  brand,
  selectedInfluencers) {

  var campaignContentItems = [];
  var contentLocationItems = [];
  var contentInterestingItems = [];
  var influencers = [];

  if (selectedOptionLocation) {
    selectedOptionLocation.map((item, key) => {
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
      campaignContentItems.push(location);
    });
  }

  if (selectedOptionInteresting) {
    selectedOptionInteresting.map((item, key) => {
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
      campaignContentItems.push(interesting);
    });
  }

  if (selectedInfluencers) {
    selectedInfluencers.forEach(function (influencer, key) {

      const contentItems = [];

      influencer.bag.contentItems.forEach(function (item, key) {

        if (item.contentType === 'AgeDemorgraphic') {
          const demorgraphic = {
            ContentItemId: item.contentItemId,
            ContentItemVersionId: '',
            ContentType: 'AgeDemorgraphic',
            DisplayText: item.displayText,
            Latest: item.latest,
            Published: item.published,
            ModifiedUtc: item.modifiedUtc,
            PublishedUtc: item.publishedUtc,
            CreatedUtc: item.createdUtc,
            Owner: 'admin',
            Author: 'admin',
            AgeDemorgraphic: {
              Percentage: {
                Text: item.percentage
              },
              DemoGraphicsName: {
                Text: item.demoGraphicsName
              }
            },
            TitlePart: {
              Title: item.displayText
            }
          }
          contentItems.push(demorgraphic);
        }

        if (item.contentType === 'Networks') {
          const networks = {
            ContentItemId: item.contentItemId,
            ContentItemVersionId: '',
            ContentType: 'Networks',
            DisplayText: item.displayText,
            Latest: item.latest,
            Published: item.published,
            ModifiedUtc: item.modifiedUtc,
            PublishedUtc: item.publishedUtc,
            CreatedUtc: item.createdUtc,
            Owner: 'admin',
            Author: 'admin',
            Networks: {
              Icon: {
                Paths: item.icon.paths,
                Urls: item.icon.urls
              }
            },
            TitlePart: {
              Title: item.displayText
            }
          }
          contentItems.push(networks);
        }

        if (item.contentType === 'Rates') {
          const rates = {
            ContentItemId: item.contentItemId,
            ContentItemVersionId: '',
            ContentType: 'Rates',
            DisplayText: item.displayText,
            Latest: item.latest,
            Published: item.published,
            ModifiedUtc: item.modifiedUtc,
            PublishedUtc: item.publishedUtc,
            CreatedUtc: item.createdUtc,
            Owner: 'admin',
            Author: 'admin',
            Rates: {
              Icon: {
                Paths: item.icon.paths,
                Urls: item.icon.urls
              },
              Price: {
                Value: item.price
              }
            },
            TitlePart: {
              Title: item.displayText
            }
          }

          contentItems.push(rates);
        }

      })

      contentItems.push(jobs);

      //influencer.bag.contentItems.push(jobs);
      //debugger;
      const influencerLocal = {
        ContentItemId: influencer.contentItemId,
        ContentItemVersionId: influencer.contentItemVersionId,
        ContentType: 'Influencer',
        DisplayText: influencer.displayText,
        Latest: true,
        Published: false,
        ModifiedUtc: influencer.modifiedUtc,
        PublishedUtc: influencer.publishedUtc,
        CreatedUtc: influencer.createdUtc,
        Owner: 'admin',
        Author: 'admin',
        Influencer: {
          Description: {
            Text: influencer.description
          },
          Photo: {
            Paths: influencer.photo.paths,
            Urls: influencer.photo.urls
          },
          Fanpage: {
            Text: influencer.fanpage
          }
        },
        BagPart: {
          ContentItems: contentItems
        },
        TitlePart: {
          Title: influencer.displayText
        }
      }

      campaignContentItems.push(influencerLocal);
    });

  }

  const compaignType = {
    ContentItemId: '',
    ContentItemVersionId: '',
    ContentType: 'Campaign',
    DisplayText: "Campaign " + brand.Brand.BrandName.Text,
    Latest: true,
    Published: false,
    ModifiedUtc: '',
    PublishedUtc: '',
    CreatedUtc: '',
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
      Title: "Campaign " + brand.Brand.BrandName.Text,
    },
    BagPart: {
      ContentItems: campaignContentItems
    }
  }

  var myJSON = JSON.stringify(compaignType);

  debugger;

  return compaignType;
}