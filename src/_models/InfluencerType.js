export function createInfluencer(influencer, userName) {
  if (influencer) {
    const contentItems = [];
    debugger;
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
          Owner: userName,
          Author: userName,
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
          Owner: userName,
          Author: userName,
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
          Owner: userName,
          Author: userName,
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

    //influencer.bag.contentItems.push(jobs);
    debugger;
    const influencerType = {
      ContentItemId: influencer.contentItemId,
      ContentItemVersionId: influencer.contentItemVersionId,
      ContentType: 'Influencer',
      DisplayText: influencer.displayText,
      Latest: true,
      Published: false,
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

    var myJSON = JSON.stringify(influencerType);

    return influencerType;
  }
}