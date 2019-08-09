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
  fromDate,
  toDate,
  job,
  selectedOptionLocation,
  selectedOptionInteresting,
  brand,
  selectedInfluencers) {

  debugger;

  let locationString = '';
  var i;
  for (i = 0; i < selectedOptionLocation.length; i++) {
    locationString += selectedOptionLocation[i].value + ',';
  }

  let interestingString = '';
  var i;
  for (i = 0; i < selectedOptionInteresting.length; i++) {
    interestingString += selectedOptionInteresting[i].value + ',';
  }

  var campaignContentItems = [];

  if (selectedInfluencers) {
    selectedInfluencers.forEach(function (influencer, key) {
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
          },
          Email: {
            Text: ''
          },
          FullName: {
            Text: influencer.fullName
          },
          ShareLink: {
            Text: influencer.shareLink
          },
          PostImage: {
            Text: influencer.postImage
          },
          LiveStream: {
            Text: influencer.liveStream
          },
          CheckIn: {
            Text: influencer.sheckIn
          },
          Video: {
            Text: influencer.video
          },
          Phone: {
            Text: influencer.phone
          },
          NumberOfLike: {
            Text: influencer.numberOfLike
          },
          NumberOfLove: {
            Text: influencer.numberOfLove
          },
          NumberOfComment: {
            Text: influencer.numberOfComment
          }
        },
        TitlePart: {
          Title: influencer.displayText
        },
        AgeDemorgraphic: {
          AgePercentage: {
            Text: influencer.agePercentage
          },
          AgeGraphicsName: {
            Text: influencer.ageGraphicsName
          }
        },
        GenderDemorgraphic: {
          GenderPercentage: {
            Text: influencer.genderDemorgraphic
          },
          GenderGraphicName: {
            Text: influencer.genderGraphicName
          }
        },
        GeoDemorgraphic: {
          GeoPercentage: {
            Text: influencer.geoPercentage
          },
          GeoGraphicName: {
            Text: influencer.geoGraphicName
          }
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
        Value: fromDate
      },
      ToDate: {
        Value: toDate
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
        Text: locationString
      },
      FromAge: {
        Value: campaign.fromAge
      },
      ToAge: {
        Value: campaign.toAge
      },
      Gender: {
        Value: campaign.gender
      },
      HashTag: {
        Text: job.hashTag
      },
      Keyword: {
        Text: job.keyword
      },
      Link: {
        Text: job.jobLink
      },
      Description: {
        Text: job.description
      },
      Interesting: {
        Text: interestingString
      }
    },
    TitlePart: {
      Title: "Campaign " + brand.Brand.BrandName.Text,
    },
    BagPart: {
      ContentItems: campaignContentItems
    },
    CheckIn: {
      Cost: {
        Text: ''
      }
    },
    LiveStream: {
      Cost: {
        Text: ''
      }
    },
    PostImage: {
      Cost: {
        Text: ''
      }
    },
    ShareLink: {
      Cost: {
        Text: ''
      }
    },
    Video: {
      Cost: {
        Text: ''
      }
    }
  }

  var myJSON = JSON.stringify(compaignType);

  debugger;

  return compaignType;
}