export function createInfluencer(influencer, userName) {
  if (influencer) {

    const influencerType = {
      ContentItemId: influencer.contentItemId,
      ContentItemVersionId: influencer.contentItemVersionId,
      ContentType: 'Influencer',
      DisplayText: influencer.displayText,
      Latest: influencer.latest,
      Published: influencer.published,
      ModifiedUtc: influencer.modifiedUtc,
      PublishedUtc: influencer.publishedUtc,
      CreatedUtc: influencer.createdUtc,
      Owner: userName,
      Author: userName,
      Influencer: {
        Description: {
          Text: influencer.description
        },
        Photo: {
          Paths: [
            influencer.photo.paths[0]
          ],
          Urls: [
            influencer.photo.urls[0]
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
        Title: userName
      },
      AgeDemorgraphic: {
        AgePercentage: {
          Text: influencer.ageDemorgraphic
        },
        AgeGraphicsName: {
          Text: influencer.ageGraphicsName
        }
      },
      GenderDemorgraphic: {
        GenderPercentage: {
          Text: influencer.genderPercentage
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

    

    var myJSON = JSON.stringify(influencerType);

    return influencerType;
  }
}