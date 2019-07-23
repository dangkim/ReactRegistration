import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import img from '../assets/images/hand.jpg'
//import { campaignActions } from '../_actions';
import { campaignActions, infActions, brandActions } from '../_actions';
//import Select from 'react-select';
import { createJobs } from '../_models/JobType';
//import {configContent} from 'configContent';
var NumberFormat = require('react-number-format');
import { history } from '../_helpers';
import { LeftMenuPage } from '../LeftMenuPage';
import { TopHeaderPage } from '../TopHeaderPage';

class InfluencerUpdateCostPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            shareLink: '',
            postImage: '',
            video: '',
            liveStream: '',
            checkIn: '',
            submitted: false,
            influencer: props.influencers.items
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleSubmitJobs = this.handleSubmitJobs.bind(this);
    }

    handleChange(e) {
        debugger;
        const { influencers } = this.props;
        const { name, value } = e.target;

        let influencer = influencers.items;
        if (name == 'shareLink') {
            influencer.shareLink = value
        }
        if (name == 'postImage') {
            influencer.postImage = value
        }
        if (name == 'video') {
            influencer.video = value
        }
        if (name == 'liveStream') {
            influencer.liveStream = value
        }
        if (name == 'checkIn') {
            influencer.checkIn = value
        }
        //const { influencer } = this.state;
        this.setState({ influencer: influencer });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { rates } = this.state;
        const { dispatch, influencers } = this.props;
        var isValid = true;

        isValid = rates.reduce((result, current, i) => {
            if (current.price === '') {
                return false;
            }

            return true;

        }, [])

        if (isValid) {
            debugger;
            //let obj = JSON.parse(influencer.items);
            const { userName } = this.props.location.state;
            dispatch(infActions.updateInfluencers(influencer.items.influencer[0], userName));
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;

        if (this.props.location.state) {
            const { userName } = this.props.location.state;
            dispatch(infActions.getCostByUserName(userName));
        }
    }

    render() {
        const { influencers } = this.props;
        const userName = this.props.location.state;
        const { submitted, shareLink, video, checkIn, liveStream, postImage } = this.state;
        const influencer = influencers.items ? influencers.items : [];
        debugger;
        // const rates = influencer.items ?
        //     influencer.items.influencer[0].bag.contentItems.filter(value => Object.keys(value).length !== 0 && value.contentType == "Rates")
        //     : [];

        return (
            <div>
                <TopHeaderPage />
                <div className="app-main">
                    <LeftMenuPage userName={userName} />
                    <div className="app-main__outer">
                        <div className="app-main__inner">
                            <div className="app-page-title">
                                <div className="page-title-wrapper">
                                    <div className="page-title-heading">
                                        <div className="page-title-icon">
                                            <i className="lnr-picture text-danger">
                                            </i>
                                        </div>
                                        <div>Update your value
                                    <div className="page-title-subheading">Modification is very easy to do using KolViet Framework.
                                    </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="main-card mb-3 card">
                                <div className="card-body">
                                    <form id="costForm" className="col-md-10 mx-auto" onSubmit={this.handleSubmit}>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label htmlFor="shareLink">Share Link</label>
                                                <div>
                                                    <input type="number" className="form-control" id="shareLink" name="shareLink" value={influencer.shareLink} onChange={this.handleChange} placeholder="Price..." />
                                                    {/* <NumberFormat value={item.price} id={key} name={key} thousandSeparator={true} onChange={this.handleChange} className="form-control" suffix={'đ'}/> */}
                                                    {submitted && !influencer.shareLink &&
                                                        <div className="help-block" style={{ color: 'red' }}>Price is required</div>
                                                    }
                                                </div>
                                                <label htmlFor="video">Video</label>
                                                <div>
                                                    <input type="number" className="form-control" id="video" name="video" value={video} onChange={this.handleChange} placeholder="Price..." />
                                                    {/* <NumberFormat value={item.price} id={key} name={key} thousandSeparator={true} onChange={this.handleChange} className="form-control" suffix={'đ'}/> */}
                                                    {submitted && !influencer.video &&
                                                        <div className="help-block" style={{ color: 'red' }}>Price is required</div>
                                                    }
                                                </div>
                                                <label htmlFor="postImage">Post Image</label>
                                                <div>
                                                    <input type="number" className="form-control" id="postImage" name="postImage" value={postImage} onChange={this.handleChange} placeholder="Price..." />
                                                    {/* <NumberFormat value={item.price} id={key} name={key} thousandSeparator={true} onChange={this.handleChange} className="form-control" suffix={'đ'}/> */}
                                                    {submitted && !influencer.postImage &&
                                                        <div className="help-block" style={{ color: 'red' }}>Price is required</div>
                                                    }
                                                </div>
                                                <label htmlFor="checkIn">Check In</label>
                                                <div>
                                                    <input type="number" className="form-control" id="checkIn" name="checkIn" value={checkIn} onChange={this.handleChange} placeholder="Price..." />
                                                    {/* <NumberFormat value={item.price} id={key} name={key} thousandSeparator={true} onChange={this.handleChange} className="form-control" suffix={'đ'}/> */}
                                                    {submitted && !influencer.checkIn &&
                                                        <div className="help-block" style={{ color: 'red' }}>Price is required</div>
                                                    }
                                                </div>
                                                <label htmlFor="liveStream">Live Stream</label>
                                                <div>
                                                    <input type="number" className="form-control" id="liveStream" name="liveStream" value={liveStream} onChange={this.handleChange} placeholder="Price..." />
                                                    {/* <NumberFormat value={item.price} id={key} name={key} thousandSeparator={true} onChange={this.handleChange} className="form-control" suffix={'đ'}/> */}
                                                    {submitted && !influencer.liveStream &&
                                                        <div className="help-block" style={{ color: 'red' }}>Price is required</div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="divider row"></div>
                                        <div className="d-flex align-items-center">
                                            <div className="ml-auto">
                                                <button type="submit" className="btn btn-primary btn-lg">Confirm</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    //debugger;
    const { influencers } = state;
    return {
        influencers
    };
}

const connectedInfluencerUpdateCostPage = connect(mapStateToProps)(InfluencerUpdateCostPage);
export { connectedInfluencerUpdateCostPage as InfluencerUpdateCostPage };