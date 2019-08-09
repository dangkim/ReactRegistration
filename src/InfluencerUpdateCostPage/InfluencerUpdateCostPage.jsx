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

        //this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleSubmitJobs = this.handleSubmitJobs.bind(this);
    }

    // handleChange(values, e) {
    //     debugger;
    //     const { influencers } = this.props;
    //     const { formattedValue, value } = values;

    //     let influencer = influencers.items;
    //     if (name == 'shareLink') {
    //         influencer.shareLink = Number(value);
    //     }
    //     if (name == 'postImage') {
    //         influencer.postImage = Number(value);
    //     }
    //     if (name == 'video') {
    //         influencer.video = Number(value);
    //     }
    //     if (name == 'liveStream') {
    //         influencer.liveStream = Number(value);
    //     }
    //     if (name == 'checkIn') {
    //         influencer.checkIn = Number(value);
    //     }
    //     //const { influencer } = this.state;
    //     this.setState({ influencer: influencer });
    // }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { influencer } = this.state;
        const { dispatch } = this.props;

        if (influencer.shareLink &&
            influencer.postImage &&
            influencer.liveStream &&
            influencer.checkIn &&
            influencer.video) {
            //let obj = JSON.parse(influencer.items);
            const { userName } = this.props.location.state;
            dispatch(infActions.updateInfluencers(influencer, userName));
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
        const { submitted, influencer } = this.state;
        //const influencer = influencers.items ? influencers.items : [];
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
                                    <form id="costForm" className="col-md-10 mx-auto">
                                        <div className="form-row">
                                            <div className="col-md-2">
                                                <label htmlFor="shareLink">Share Link</label>
                                                <div>
                                                    <NumberFormat className="form-control" id="shareLink" name="shareLink" thousandSeparator={true} suffix={'đ'} value={this.props.influencers.items ? this.props.influencers.items.shareLink : ''} placeholder="Price..." onValueChange={(values) => {
                                                        const { formattedValue, value } = values;
                                                        const influencer = this.props.influencers.items;
                                                        if (influencer) {
                                                            influencer.shareLink = value;
                                                            this.setState({ influencer: influencer })
                                                        }
                                                    }} />
                                                    {submitted && !influencer.shareLink &&
                                                        <div className="help-block" style={{ color: 'red' }}>Price is required</div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <label htmlFor="postImage">Post Image</label>
                                                <div>
                                                    <NumberFormat className="form-control" id="postImage" name="postImage" thousandSeparator={true} suffix={'đ'} value={this.props.influencers.items ? this.props.influencers.items.postImage : ''} placeholder="Price..." onValueChange={(values) => {
                                                        const { formattedValue, value } = values;
                                                        const influencer = this.props.influencers.items;
                                                        if (influencer) {
                                                            influencer.postImage = value;
                                                            this.setState({ influencer: influencer })
                                                        }
                                                    }} />
                                                    {submitted && !influencer.postImage &&
                                                        <div className="help-block" style={{ color: 'red' }}>Price is required</div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <label htmlFor="video">Video</label>
                                                <div>
                                                    <NumberFormat className="form-control" id="video" name="video" thousandSeparator={true} suffix={'đ'} value={this.props.influencers.items ? this.props.influencers.items.video : ''} placeholder="Price..." onValueChange={(values) => {
                                                        const { formattedValue, value } = values;
                                                        const influencer = this.props.influencers.items;
                                                        if (influencer) {
                                                            influencer.video = value;
                                                            this.setState({ influencer: influencer })
                                                        }
                                                    }} />
                                                    {submitted && !influencer.video &&
                                                        <div className="help-block" style={{ color: 'red' }}>Price is required</div>
                                                    }
                                                </div>
                                            </div>                                            
                                            <div className="col-md-3">
                                                <label htmlFor="checkIn">Check In</label>
                                                <div>
                                                    <NumberFormat className="form-control" id="checkIn" name="checkIn" thousandSeparator={true} suffix={'đ'} value={this.props.influencers.items ? this.props.influencers.items.checkIn : ''} placeholder="Price..." onValueChange={(values) => {
                                                        const { formattedValue, value } = values;
                                                        const influencer = this.props.influencers.items;
                                                        if (influencer) {
                                                            influencer.checkIn = value;
                                                            this.setState({ influencer: influencer })
                                                        }
                                                    }} />
                                                    {submitted && !influencer.checkIn &&
                                                        <div className="help-block" style={{ color: 'red' }}>Price is required</div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <label htmlFor="liveStream">Live Stream</label>
                                                <div>
                                                    <NumberFormat className="form-control" id="liveStream" name="liveStream" thousandSeparator={true} suffix={'đ'} value={this.props.influencers.items ? this.props.influencers.items.liveStream : ''} placeholder="Price..." onValueChange={(values) => {
                                                        const { formattedValue, value } = values;
                                                        const influencer = this.props.influencers.items;
                                                        if (influencer) {
                                                            influencer.liveStream = value;
                                                            this.setState({ influencer: influencer })
                                                        }
                                                    }} />
                                                    {submitted && !influencer.liveStream &&
                                                        <div className="help-block" style={{ color: 'red' }}>Price is required</div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="divider row"></div>
                                        <div className="d-flex align-items-center">
                                            <div className="ml-auto">
                                                <button onClick={this.handleSubmit} className="btn btn-primary btn-lg">Confirm</button>
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
    const { influencers } = state;
    return {
        influencers
    };
}

const connectedInfluencerUpdateCostPage = connect(mapStateToProps)(InfluencerUpdateCostPage);
export { connectedInfluencerUpdateCostPage as InfluencerUpdateCostPage };