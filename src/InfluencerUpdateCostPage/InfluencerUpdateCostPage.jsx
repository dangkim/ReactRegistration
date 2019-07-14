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
            rates: [],
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleSubmitJobs = this.handleSubmitJobs.bind(this);
    }

    handleChange(e) {
        const { influencers } = this.props;
        const { name, value } = e.target;

        let rates = influencers.items.influencer[0].bag.contentItems.filter(value => Object.keys(value).length !== 0 && value.contentType == "Rates");
        rates[name].price = value;

        this.setState({ rates: rates });
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
            //let obj = JSON.parse(influencers.items);
            const { userName } = this.props.location.state;
            dispatch(infActions.updateInfluencers(influencers.items.influencer[0], userName));
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
        const { submitted } = this.state;

        const rates = influencers.items ?
            influencers.items.influencer[0].bag.contentItems.filter(value => Object.keys(value).length !== 0 && value.contentType == "Rates")
            : [];

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
                                            {
                                                rates && rates.map((item, key) => {
                                                    return (
                                                        item.contentType == 'Rates' ?
                                                            <div key={key} className="form-group">
                                                                <label htmlFor={item.displayText}>{item.displayText}</label>
                                                                <div>
                                                                    <input type="number" className="form-control" id={key} name={key} value={item.price} onChange={this.handleChange} placeholder="Price..." />
                                                                    {/* <NumberFormat value={item.price} id={key} name={key} thousandSeparator={true} onChange={this.handleChange} className="form-control" suffix={'đ'}/> */}
                                                                    {submitted && !item.price &&
                                                                        <div className="help-block" style={{ color: 'red' }}>Price is required</div>
                                                                    }
                                                                </div>
                                                            </div> : ''
                                                    )
                                                })
                                            }
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