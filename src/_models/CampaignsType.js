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
  brand,
  selectedInfluencers) {

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
            Text: null
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
      },
      HashTag: {
        Text: 'New Style Of Campaign'
      },
      Keyword: {
        Text: 'New Style Of Campaign'
      },
      Link: {
        Text: 'New Style Of Campaign'
      },
      Description: {
        Text: 'New Style Of Campaign'
      },
      Interesting: {
        Text: 'Music'
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
        Text: '1000000'
      }
    },
    LiveStream: {
      Cost: {
        Text: '20000000'
      }
    },
    PostImage: {
      Cost: {
        Text: null
      }
    },
    ShareLink: {
      Cost: {
        Text: null
      }
    },
    Video: {
      Cost: {
        Text: null
      }
    }
  }

  var myJSON = JSON.stringify(compaignType);

  debugger;

  return compaignType;
}