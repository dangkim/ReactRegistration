export function createCampaigns(brandName, brandFullName, businessAreas, brandLocation, compaignType) {

  const campaignsType = {
    ContentItemId: '',
    ContentItemVersionId: '',
    ContentType: 'Campaigns',
    DisplayText: brandName + ';' + businessAreas+ ';' + brandFullName + ';' + brandLocation,//brand.Brand.BrandName.Text,
    Latest: true,
    Published: false,
    ModifiedUtc: '',
    PublishedUtc: '',
    CreatedUtc: '',
    Owner: brandName,
    Author: brandName,
    Campaigns: {
      FullName: {
        Text: brandFullName,//brand.Brand.FullName.Text
      },
      Email: {
        Text: ''
      },
      BrandName: {
        Text: brandName,//brand.Brand.BrandName.Text
      },
      BusinessAreas: {
        Text: businessAreas,//brand.Brand.BusinessAreas.Text
      },
      Phone: {
        Text: ''
      },
      Password: {
        Text: ''
      },
      Location: {
        Text: brandLocation//brand.Brand.Location.Text
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
      Title: brandName + ';' + businessAreas+ ';' + brandFullName + ';' + brandLocation
    }
  }

  return campaignsType;
}

export function createCampaign(campaign,
  fromDate,
  toDate,
  job,
  selectedOptionLocation,
  selectedOptionInteresting,
  selectedOptionJobCategory,
  brandName,
  selectedInfluencers) {

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

  let shareLinkCost = 0;
  let postImageCost = 0;
  let videoCost = 0;
  let checkInCost = 0;
  let liveStreamCost = 0;
  let isShareLink = 0;
  let isPostImage = 0;
  let isVideo = 0;
  let isCheckIn = 0;
  let isLiveStream = 0;

  // Calculate Total Cost each
  if (selectedInfluencers) {
    selectedInfluencers.forEach(function (influencer, key) {
      if (influencer.shareLink) {
        shareLinkCost = shareLinkCost + Number(influencer.shareLink);
      }
      if (influencer.postImage) {
        postImageCost = postImageCost + Number(influencer.postImage);
      }
      if (influencer.video) {
        videoCost = videoCost + Number(influencer.video);
      }
      if (influencer.checkIn) {
        checkInCost = checkInCost + Number(influencer.checkIn);
      }
      if (influencer.liveStream) {
        liveStreamCost = liveStreamCost + Number(influencer.liveStream);
      }
    })
  }
  ///////////////////////

  // Check Cost of each job
  var i;
  for (i = 0; i < selectedOptionJobCategory.length; i++) {
    if (selectedOptionJobCategory[i].value == "Share Link") {
      isShareLink = true;
    }
    if (selectedOptionJobCategory[i].value == "Post Image") {
      isPostImage = true;
    }
    if (selectedOptionJobCategory[i].value == "Live Stream") {
      isLiveStream = true;
    }
    if (selectedOptionJobCategory[i].value == "Check In") {
      isCheckIn = true;
    }
    if (selectedOptionJobCategory[i].value == "Video") {
      isVideo = true;
    }
  }
  ///////////////////////////

  var campaignContentItems = [];

  if (selectedInfluencers) {
    selectedInfluencers.forEach(function (influencer, key) {
      debugger;
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
            Text: influencer.checkIn
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
    DisplayText: campaign.campaignName + ';' + brandName,
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
      JobName:{
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
      },
      Interesting: {
        Text: interestingString
      }
    },
    TitlePart: {
      Title: campaign.campaignName + ';' + brandName,
    },
    BagPart: {
      ContentItems: campaignContentItems
    },
    CheckIn: {
      Cost: {
        Text: isCheckIn ? checkInCost : 0
      }
    },
    LiveStream: {
      Cost: {
        Text: isLiveStream ? liveStreamCost : 0
      }
    },
    PostImage: {
      Cost: {
        Text: isPostImage ? postImageCost : 0
      }
    },
    ShareLink: {
      Cost: {
        Text: isShareLink ? shareLinkCost : 0
      }
    },
    Video: {
      Cost: {
        Text: isVideo ? videoCost : 0
      }
    }
  }
  debugger;
  //var myJSON = JSON.stringify(compaignType);

  return compaignType;
}