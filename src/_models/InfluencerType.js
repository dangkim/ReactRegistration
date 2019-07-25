export function createInfluencer(influencer, userName) {
  if (influencer) {

    const influencerType = {
      ContentItemId: '',
      ContentItemVersionId: '',
      ContentType: 'Influencer',
      DisplayText: influencer.displayText,
      Latest: true,
      Published: true,
      ModifiedUtc: '',
      PublishedUtc: '',
      CreatedUtc: '',
      Owner: influencer.userName,
      Author: influencer.userName,
      Influencer: {
        Description: {
          Text: influencer.description
        },
        Photo: {
          Paths: [
            influencer.photo.paths
          ],
          Urls: [
            influencer.urls.urls
          ]
        },
        Fanpage: {
          Text: influencer.fanpage
        },
        Email: {
          Text: influencer.email
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
          Text: ''
        },
        NumberOfLove: {
          Text: ''
        },
        NumberOfComment: {
          Text: ''
        }
      },
      TitlePart: {
        Title: influencer.userName
      },
      AgeDemorgraphic: {
        AgePercentage: {
          Text: ''
        },
        AgeGraphicsName: {
          Text: 'Từ 19 tới 30'
        }
      },
      GenderDemorgraphic: {
        GenderPercentage: {
          Text: '90%'
        },
        GenderGraphicName: {
          Text: ''
        }
      },
      GeoDemorgraphic: {
        GeoPercentage: {
          Text: '90%'
        },
        GeoGraphicName: {
          Text: 'HCM'
        }
      }
    }

    

    var myJSON = JSON.stringify(influencerType);

    return influencerType;
  }
}