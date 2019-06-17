// campaignTarget:'',
//                 marketPlace:'',
//                 fromAge:'',
//                 toAge:'',
//                 gender:'',
//                 campaignName:'',
//                 fromDate:'',
//                 toDate:'',
//                 productInfo:'',
//                 budget:'',
//                 currency:'',

// job: {
//   jobName:'',
//   jobHashTag:'',
//   jobKeyword:'',
//   jobDescription:'',
//   jobLink:''
// },
export function createCampaigns(campaign,
                                job,
                                selectedOptionLocation,
                                selectedOptionInteresting,
                                selectedOptionJobCategory,
                                brand,
                                checkedInfluencers) {

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
        {
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
              Text: 'Tăng sự chú ý của giới trẻ tới sản phẩm'
            },
            FromDate: {
              Value: '2019-06-17T00:00:00Z'
            },
            ToDate: {
              Value: '2019-06-19T00:00:00Z'
            },
            ProductInfo: {
              Text: 'Nón thời gian Nam và Nữ'
            },
            Budget: {
              Value: 8000000
            },
            Currency: {
              Text: 'VND'
            },
            CampaignName: {
              Text: 'Vượt chướng ngại'
            },
            MarketPlace: {
              Text: 'Toàn Quốc'
            },
            FromAge: {
              Value: 19
            },
            ToAge: {
              Value: 25
            },
            Gender: {
              Value: 2
            }
          },
          TitlePart: {
            Title: 'MYMY'
          },
          BagPart: {
            ContentItems: [
              {
                ContentItemId: '4awx82m7136nz0phm86j4yba5m',
                ContentItemVersionId: null,
                ContentType: 'Locations',
                DisplayText: 'Vị Trí',
                Latest: false,
                Published: false,
                ModifiedUtc: '2019-06-17T04:17:47.8690652Z',
                PublishedUtc: null,
                CreatedUtc: null,
                Owner: null,
                Author: 'admin',
                Locations: {
                  Location: {
                    Text: 'Toàn Quốc'
                  }
                },
                TitlePart: {
                  Title: 'Vị Trí'
                }
              },
              {
                ContentItemId: '4w42ejxkq24yb3129ja7td2m5d',
                ContentItemVersionId: null,
                ContentType: 'InterestingList',
                DisplayText: 'Âm nhạc',
                Latest: false,
                Published: false,
                ModifiedUtc: '2019-06-17T04:17:47.8722386Z',
                PublishedUtc: null,
                CreatedUtc: null,
                Owner: null,
                Author: 'admin',
                InterestingList: {
                  Interesting: {
                    Text: 'Âm nhạc'
                  }
                },
                TitlePart: {
                  Title: 'Âm nhạc'
                }
              },
              {
                ContentItemId: '4zpcmpd1sewj9tnc80cqm860ct',
                ContentItemVersionId: null,
                ContentType: 'InterestingList',
                DisplayText: 'Sức khỏe',
                Latest: false,
                Published: false,
                ModifiedUtc: '2019-06-17T04:17:47.8749169Z',
                PublishedUtc: null,
                CreatedUtc: null,
                Owner: null,
                Author: 'admin',
                InterestingList: {
                  Interesting: {
                    Text: 'Sức khỏe'
                  }
                },
                TitlePart: {
                  Title: 'Sức khỏe'
                }
              },
              {
                ContentItemId: '42jss4t2fdffay84vf64qvt85p',
                ContentItemVersionId: null,
                ContentType: 'Influencer',
                DisplayText: 'Đỗ Ngọc Thắng',
                Latest: false,
                Published: false,
                ModifiedUtc: '2019-06-17T04:17:47.8785698Z',
                PublishedUtc: null,
                CreatedUtc: null,
                Owner: null,
                Author: 'admin',
                Influencer: {
                  Description: {
                    Text: 'Ca Sĩ, người mẫu'
                  },
                  Photo: {
                    Paths: [
                      'Photos/DoNgocThang.jpg'
                    ]
                  },
                  Fanpage: {
                    Text: 'https://www.facebook.com/DoNgocThangSingers'
                  }
                },
                BagPart: {
                  ContentItems: [
                    {
                      ContentItemId: '4865mesnc6m6m5194ymmzm1ecm',
                      ContentItemVersionId: null,
                      ContentType: 'AgeDemorgraphic',
                      DisplayText: 'Ca Sĩ, người mẫu',
                      Latest: false,
                      Published: false,
                      ModifiedUtc: '2019-06-17T04:17:47.8848314Z',
                      PublishedUtc: null,
                      CreatedUtc: null,
                      Owner: null,
                      Author: 'admin',
                      AgeDemorgraphic: {
                        Percentage: {
                          Text: '70%'
                        },
                        DemoGraphicsName: {
                          Text: 'Nam - Nữ'
                        }
                      },
                      TitlePart: {
                        Title: 'Ca Sĩ, người mẫu'
                      }
                    },
                    {
                      ContentItemId: '4a9z1jegxcgef2na6kga6hxecx',
                      ContentItemVersionId: null,
                      ContentType: 'AgeDemorgraphic',
                      DisplayText: 'Thiên về tuổi',
                      Latest: false,
                      Published: false,
                      ModifiedUtc: '2019-06-17T04:17:47.8882335Z',
                      PublishedUtc: null,
                      CreatedUtc: null,
                      Owner: null,
                      Author: 'admin',
                      AgeDemorgraphic: {
                        Percentage: {
                          Text: '75%'
                        },
                        DemoGraphicsName: {
                          Text: 'Tuổi 19-25'
                        }
                      },
                      TitlePart: {
                        Title: 'Thiên về tuổi'
                      }
                    },
                    {
                      ContentItemId: '4z3ac9bws0vq7xb2hc0tw94mww',
                      ContentItemVersionId: null,
                      ContentType: 'AgeDemorgraphic',
                      DisplayText: 'Thiên về địa điểm',
                      Latest: false,
                      Published: false,
                      ModifiedUtc: '2019-06-17T04:17:47.8922107Z',
                      PublishedUtc: null,
                      CreatedUtc: null,
                      Owner: null,
                      Author: 'admin',
                      AgeDemorgraphic: {
                        Percentage: {
                          Text: '75%'
                        },
                        DemoGraphicsName: {
                          Text: 'Sài Gòn'
                        }
                      },
                      TitlePart: {
                        Title: 'Thiên về địa điểm'
                      }
                    },
                    {
                      ContentItemId: '4src8xya7efzq4fk15q86tgdmq',
                      ContentItemVersionId: null,
                      ContentType: 'Networks',
                      DisplayText: 'Facebook',
                      Latest: false,
                      Published: false,
                      ModifiedUtc: '2019-06-17T04:17:47.8975043Z',
                      PublishedUtc: null,
                      CreatedUtc: null,
                      Owner: null,
                      Author: 'admin',
                      Networks: {
                        Icon: {
                          Paths: [
                            'Icon/icons8-facebook-48.png'
                          ]
                        }
                      },
                      TitlePart: {
                        Title: 'Facebook'
                      }
                    },
                    {
                      ContentItemId: '45n98g10033q429svxf5kjgx52',
                      ContentItemVersionId: null,
                      ContentType: 'Rates',
                      DisplayText: 'Share link, thông tin sản phẩm',
                      Latest: false,
                      Published: false,
                      ModifiedUtc: '2019-06-17T04:17:47.9007848Z',
                      PublishedUtc: null,
                      CreatedUtc: null,
                      Owner: null,
                      Author: 'admin',
                      Rates: {
                        Icon: {
                          Paths: [
                            'Icon/icons8-share-64.png'
                          ]
                        },
                        Price: {
                          Value: 2500000
                        }
                      },
                      TitlePart: {
                        Title: 'Share link, thông tin sản phẩm'
                      }
                    },
                    {
                      ContentItemId: '43nfqvjkp6wgp56px8c7pec549',
                      ContentItemVersionId: null,
                      ContentType: 'Rates',
                      DisplayText: 'Post hình',
                      Latest: false,
                      Published: false,
                      ModifiedUtc: '2019-06-17T04:17:47.9048923Z',
                      PublishedUtc: null,
                      CreatedUtc: null,
                      Owner: null,
                      Author: 'admin',
                      Rates: {
                        Icon: {
                          Paths: [
                            'Icon/icons8-image-48.png'
                          ]
                        },
                        Price: {
                          Value: 3000000
                        }
                      },
                      TitlePart: {
                        Title: 'Post hình'
                      }
                    },
                    {
                      ContentItemId: '40n6v715ag72zsda5pwvt62b57',
                      ContentItemVersionId: null,
                      ContentType: 'Rates',
                      DisplayText: 'Video',
                      Latest: false,
                      Published: false,
                      ModifiedUtc: '2019-06-17T04:17:47.909099Z',
                      PublishedUtc: null,
                      CreatedUtc: null,
                      Owner: null,
                      Author: 'admin',
                      Rates: {
                        Icon: {
                          Paths: [
                            'Icon/icons8-youtube-squared-48.png'
                          ]
                        },
                        Price: {
                          Value: 4000000
                        }
                      },
                      TitlePart: {
                        Title: 'Video'
                      }
                    },
                    {
                      ContentItemId: '43a5mf6j119391ex4s6pdyma4e',
                      ContentItemVersionId: null,
                      ContentType: 'Rates',
                      DisplayText: 'Live Stream, Check in',
                      Latest: false,
                      Published: false,
                      ModifiedUtc: '2019-06-17T04:17:47.913582Z',
                      PublishedUtc: null,
                      CreatedUtc: null,
                      Owner: null,
                      Author: 'admin',
                      Rates: {
                        Icon: {
                          Paths: [
                            'Icon/icons8-day-camera-480.png'
                          ]
                        },
                        Price: {
                          Value: 4500000
                        }
                      },
                      TitlePart: {
                        Title: 'Live Stream, Check in'
                      }
                    },
                    {
                      ContentItemId: '4f44jbebtqgqt2zs3e7njqxtmc',
                      ContentItemVersionId: null,
                      ContentType: 'Jobs',
                      DisplayText: 'Share Link MYMY',
                      Latest: false,
                      Published: false,
                      ModifiedUtc: '2019-06-17T04:17:47.9170799Z',
                      PublishedUtc: null,
                      CreatedUtc: null,
                      Owner: null,
                      Author: 'admin',
                      Jobs: {
                        Name: {
                          Text: 'Share Link MYMY'
                        },
                        HashTag: {
                          Text: '#dynamic #sport'
                        },
                        Keyword: {
                          Text: 'khỏe, năng động'
                        },
                        Link: {
                          Text: null
                        },
                        Description: {
                          Text: 'Không chỉ truyền tải thông tin của sản phẩm mà còn gửi gắm điệp của thương hiệu thương hiệu'
                        }
                      },
                      TitlePart: {
                        Title: 'Share Link MYMY'
                      },
                      BagPart: {
                        ContentItems: [
                          {
                            ContentItemId: '48sqykrky9bxm2x6v6fd68gknj',
                            ContentItemVersionId: null,
                            ContentType: 'JobCategory',
                            DisplayText: 'Share Link MYMY',
                            Latest: false,
                            Published: false,
                            ModifiedUtc: '2019-06-17T04:17:47.9233765Z',
                            PublishedUtc: null,
                            CreatedUtc: null,
                            Owner: null,
                            Author: 'admin',
                            JobCategory: {
                              icon: {
                                Paths: []
                              },
                              Description: {
                                Text: 'Share Link MYMY'
                              }
                            },
                            TitlePart: {
                              Title: 'Share Link MYMY'
                            }
                          }
                        ]
                      }
                    }
                  ]
                },
                TitlePart: {
                  Title: 'Đỗ Ngọc Thắng'
                }
              }
            ]
          }
        }
      ]
    },
    TitlePart: {
      Title: 'MYMY'
    }
  }

  return campaignType;
}