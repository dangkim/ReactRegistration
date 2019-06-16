import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import img from '../../images/hand.jpg'
//import { campaignActions } from '../_actions';
import { campaignActions } from '../_actions';
import MultiSelect from "@khanacademy/react-multi-select";

class RegisterCampaignPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {            
            campaign: {
                campaignTarget:'',
                marketPlace:'',
                fromAge:'',
                toAge:'',
                gender:'',
                campaignName:'',
                fromDate:'',
                toDate:'',
                productInfo:'',
                budget:'',
                currency:''
            },            
            submitted: false,
            selected: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { campaign } = this.state;
        this.setState({
            campaign: {
                ...campaign,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { campaign } = this.state;
        const { dispatch } = this.props;
        if (campaign.campaignName && campaign.campaignDate && campaign.title && campaign.html) {
            const campaignsType = {
                ContentItemId: '',
                ContentItemVersionId: '',
                ContentType: 'Campaigns',
                DisplayText: 'MYMY',
                Latest: true,
                Published: true,
                ModifiedUtc: '',
                PublishedUtc: '',
                CreatedUtc: '',
                Owner: 'admin',
                Author: 'admin',
                Campaigns: {},
                AutoroutePart: {
                  Path: null,
                  SetHomepage: false
                },
                BagPart: {
                  ContentItems: [
                    {
                      ContentItemId: '',
                      ContentItemVersionId: null,
                      ContentType: 'Campaign',
                      DisplayText: '',
                      Latest: false,
                      Published: false,
                      ModifiedUtc: '',
                      PublishedUtc: null,
                      CreatedUtc: null,
                      Owner: null,
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
                          Text: campaign.currency
                        },
                        CampaignName: {
                          Text: campaign.CampaignName
                        },
                        MarketPlace: {
                          Text: campaign.MarketPlace
                        },
                        FromAge: {
                          Value: campaign.FromAge
                        },
                        ToAge: {
                          Value: campaign.toAge
                        },
                        Gender: {
                          Value: campaign.gender
                        }
                      },
                      TitlePart: {
                        Title: 'MYMY'
                      },
                      BagPart: {
                        ContentItems: [
                          {
                            ContentItemId: '4md6gse98zhygyx7kxkz9n584q',
                            ContentItemVersionId: null,
                            ContentType: 'Locations',
                            DisplayText: 'Vị Trí',
                            Latest: false,
                            Published: false,
                            ModifiedUtc: '2019-06-12T10:51:14.0697356Z',
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
                            ContentItemId: '409csk3f7g11fveh675vcp0v4w',
                            ContentItemVersionId: null,
                            ContentType: 'InterestingList',
                            DisplayText: 'Âm nhạc',
                            Latest: false,
                            Published: false,
                            ModifiedUtc: '2019-06-12T10:51:14.0728959Z',
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
                            ContentItemId: '43pz4czm6c8jdrkfsca6m0w4m9',
                            ContentItemVersionId: null,
                            ContentType: 'InterestingList',
                            DisplayText: 'Sức khỏe',
                            Latest: false,
                            Published: false,
                            ModifiedUtc: '2019-06-12T10:51:14.0751579Z',
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
                            ContentItemId: '4vtq5rycpythg7q27mhfe462wg',
                            ContentItemVersionId: null,
                            ContentType: 'Influencer',
                            DisplayText: 'Đỗ Ngọc Thắng',
                            Latest: false,
                            Published: false,
                            ModifiedUtc: '2019-06-12T10:51:14.0772377Z',
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
                                  ContentItemId: '4h5atfh2rs0nx37hab65fjgwcq',
                                  ContentItemVersionId: null,
                                  ContentType: 'AgeDemorgraphic',
                                  DisplayText: 'Ca Sĩ, người mẫu',
                                  Latest: false,
                                  Published: false,
                                  ModifiedUtc: '2019-06-12T10:51:14.0816118Z',
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
                                  ContentItemId: '4se39pj926ks3t4w9wq759eknt',
                                  ContentItemVersionId: null,
                                  ContentType: 'AgeDemorgraphic',
                                  DisplayText: 'Thiên về tuổi',
                                  Latest: false,
                                  Published: false,
                                  ModifiedUtc: '2019-06-12T10:51:14.0855649Z',
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
                                  ContentItemId: '4xv23m87hs3r06j9aeayha3k5p',
                                  ContentItemVersionId: null,
                                  ContentType: 'AgeDemorgraphic',
                                  DisplayText: 'Thiên về địa điểm',
                                  Latest: false,
                                  Published: false,
                                  ModifiedUtc: '2019-06-12T10:51:14.0883359Z',
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
                                  ContentItemId: '4dfm8vk1ejkndvx79y8907pkcy',
                                  ContentItemVersionId: null,
                                  ContentType: 'Networks',
                                  DisplayText: 'Facebook',
                                  Latest: false,
                                  Published: false,
                                  ModifiedUtc: '2019-06-12T10:51:14.0911578Z',
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
                                  ContentItemId: '4af25qse936fpx0302wjfx324x',
                                  ContentItemVersionId: null,
                                  ContentType: 'Rates',
                                  DisplayText: 'Share link, thông tin sản phẩm',
                                  Latest: false,
                                  Published: false,
                                  ModifiedUtc: '2019-06-12T10:51:14.0933998Z',
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
                                  ContentItemId: '4ezj6a1h4e1ea7g0z3z1az0mnh',
                                  ContentItemVersionId: null,
                                  ContentType: 'Rates',
                                  DisplayText: 'Post hình',
                                  Latest: false,
                                  Published: false,
                                  ModifiedUtc: '2019-06-12T10:51:14.0971914Z',
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
                                  ContentItemId: '413ykace9bds84x38yj21enaxw',
                                  ContentItemVersionId: null,
                                  ContentType: 'Rates',
                                  DisplayText: 'Video',
                                  Latest: false,
                                  Published: false,
                                  ModifiedUtc: '2019-06-12T10:51:14.1007212Z',
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
                                  ContentItemId: '4bg2g8mt779z6sngrxa6jbkbxp',
                                  ContentItemVersionId: null,
                                  ContentType: 'Rates',
                                  DisplayText: 'Live Stream, Check in',
                                  Latest: false,
                                  Published: false,
                                  ModifiedUtc: '2019-06-12T10:51:14.1060423Z',
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
            debugger;
            dispatch(campaignActions.register(campaignsType));
        }
    }

    componentDidMount() {
        //this.props.dispatch(campaignActions.getAll());
    }

    // handleDeletecampaign(id) {
    //     return (e) => this.props.dispatch(campaignActions.delete(id));
    // }

    render() {
        const { campaigns, loggingIn } = this.props;
        const { submitted, campaign } = this.state;
        const options = [
            {label: "One", value: 1},
            {label: "Two", value: 2},
            {label: "Three", value: 3},
          ];
          
        return (
            <section className="signup">
                    <div className="containerForm">
                        <div className="signup-content">
                            <div className="signup-form" style={{width: '100%'}}>
                                <h2 className="form-title">Campaign</h2>
                                <form onSubmit={this.handleSubmit} className="register-form" id="register-form">
                                    <div className={'form-group row' + (submitted && !campaign.campaignName ? ' has-error' : '')}>
                                        <div className='col-sm-12'>
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <input type="text" style={{paddingLeft: '15px'}} name="campaignName" id="campaignName" placeholder="Campaign Name" value={campaign.campaignName} onChange={this.handleChange}/>
                                            {
                                                submitted && !campaign.campaignName &&
                                                <div className="help-block">Campaign Name is required</div>
                                            }
                                        </div>                                        
                                    </div>
                                    <div className="form-group row">
                                        <div className={'col-sm-3' + (submitted && !campaign.fromDate ? ' has-error' : '')}>
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <input type="text" style={{paddingLeft: '15px'}} name="fromDate" id="fromDate" placeholder="From Date" value={campaign.fromDate} onChange={this.handleChange}/>
                                            {
                                                submitted && !campaign.fromDate &&
                                                <div className="help-block">Campaign Date is required</div>
                                            }
                                        </div>
                                        <div className={'col-sm-3' + (submitted && !campaign.toDate ? ' has-error' : '')}>
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <input type="text" style={{paddingLeft: '15px'}} name="toDate" id="toDate" placeholder="To Date" value={campaign.toDate} onChange={this.handleChange}/>
                                            {
                                                submitted && !campaign.toDate &&
                                                <div className="help-block">Campaign Date is required</div>
                                            }
                                        </div>
                                        <div className={'col-sm-3' + (submitted && !campaign.fromAge ? ' has-error' : '')}>
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <input type="text" style={{paddingLeft: '15px'}} name="fromAge" id="fromAge" placeholder="From Age" value={campaign.fromAge} onChange={this.handleChange}/>
                                            {
                                                submitted && !campaign.fromAge &&
                                                <div className="help-block">Age is required</div>
                                            }
                                        </div>
                                        <div className={'col-sm-3' + (submitted && !campaign.toAge ? ' has-error' : '')}>
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <input type="text" style={{paddingLeft: '15px'}} name="toAge" id="toAge" placeholder="To Age" value={campaign.toAge} onChange={this.handleChange}/>
                                            {
                                                submitted && !campaign.toAge &&
                                                <div className="help-block">Age is required</div>
                                            }
                                        </div>
                                    </div>
                                    <div className={'form-group row' + (submitted && !campaign.productInfo ? ' has-error' : '')}>
                                        <div className='col-sm-12'>
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <input type="text" style={{paddingLeft: '15px'}} name="productInfo" id="productInfo" placeholder="Product Info" value={campaign.productInfo} onChange={this.handleChange}/>
                                            {
                                                submitted && !campaign.productInfo &&
                                                <div className="help-block">Product Info is required</div>
                                            }
                                        </div>                                        
                                    </div>
                                    <div className={'form-group row' + (submitted && !campaign.campaignTarget ? ' has-error' : '')}>
                                        <div className='col-sm-12'>
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <input type="text" style={{paddingLeft: '15px'}} name="campaignTarget" id="campaignTarget" placeholder="Campaign Target" value={campaign.campaignTarget} onChange={this.handleChange}/>
                                            {
                                                submitted && !campaign.campaignTarget &&
                                                <div className="help-block">Campaign Target is required</div>
                                            }
                                        </div>                                        
                                    </div>                                    
                                    <div className='form-group row'>
                                        <div className={'col-sm-5' + (submitted && !campaign.marketPlace ? ' has-error' : '')}>
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <input type="text" style={{paddingLeft: '15px'}} name="marketPlace" id="marketPlace" placeholder="Market Place" value={campaign.marketPlace} onChange={this.handleChange}/>
                                            {
                                                submitted && !campaign.marketPlace &&
                                                <div className="help-block">Market Place is required</div>
                                            }
                                        </div>
                                        <div className={'col-sm-3' + (submitted && !campaign.gender ? ' has-error' : '')}>
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <input type="text" style={{paddingLeft: '15px'}} name="gender" id="gender" placeholder="Gender" value={campaign.gender} onChange={this.handleChange}/>
                                            {
                                                submitted && !campaign.gender &&
                                                <div className="help-block">Gender is required</div>
                                            }
                                        </div>
                                        <div className={'col-sm-4' + (submitted && !campaign.budget ? ' has-error' : '')}>
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <input type="text" style={{paddingLeft: '15px'}} name="budget" id="budget" placeholder="Budget" value={campaign.budget} onChange={this.handleChange}/>
                                            {
                                                submitted && !campaign.budget &&
                                                <div className="help-block">Budget is required</div>
                                            }
                                        </div>
                                    </div>                                    
                                    <div className="form-group form-button">
                                        <input type="submit" name="register" id="register" className="form-submit" value="Register"/>
                                        {
                                            loggingIn &&
                                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                        }
                                        <Link to="/login" className="btn btn-link">Cancel</Link>
                                    </div>
                                </form>
                            </div>
                            {/* <div className="signup-image">
                                <figure><img src={img} alt="sing up image"/></figure>
                            </div> */}
                        </div>
                    </div>
            </section>     
        );
    }
}

function mapStateToProps(state) {
    const { campaigns, authentication } = state;
    const { campaign, loggingIn } = authentication;
    return {
        campaign,
        campaigns,
        loggingIn
    };
}

const connectedRegisterCampaignPage = connect(mapStateToProps)(RegisterCampaignPage);
export { connectedRegisterCampaignPage as RegisterCampaignPage };