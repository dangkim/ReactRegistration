import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import city2 from '../assets/images/dropdown-header/city2.jpg';
import city3 from '../assets/images/dropdown-header/city3.jpg';
import city5 from '../assets/images/dropdown-header/city5.jpg';
import abstract2 from '../assets/images/dropdown-header/abstract2.jpg';
import abstract3 from '../assets/images/dropdown-header/abstract3.jpg';
import abstract4 from '../assets/images/dropdown-header/abstract4.jpg';
import avatar1 from '../assets/images/avatars/1.jpg';
import avatar2 from '../assets/images/avatars/2.jpg';
import avatar3 from '../assets/images/avatars/3.jpg';
import avatar4 from '../assets/images/avatars/4.jpg';
import avatar5 from '../assets/images/avatars/5.jpg';
import avatar6 from '../assets/images/avatars/6.jpg';
import avatar7 from '../assets/images/avatars/7.jpg';
import avatar8 from '../assets/images/avatars/8.jpg';
import avatar9 from '../assets/images/avatars/9.jpg';
import avatar10 from '../assets/images/avatars/10.jpg';
import avatar11 from '../assets/images/avatars/11.jpg';
import avatar12 from '../assets/images/avatars/12.jpg';
import new_logo from '../assets/images/new_logo.png'
//import { campaignActions } from '../_actions';
import { campaignActions, infActions, brandActions } from '../_actions';
//import Select from 'react-select';
import { createJobs } from '../_models/JobType';
//import {configContent} from 'configContent';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-bootstrap4';
import { history } from '../_helpers';
import cx from 'classnames';

class SearchBox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeSearch: false,
            searchValue: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { searchValue } = this.state;
        this.setState({
            [name]: value
        });
    }

    render() {
        const { searchValue, activeSearch } = this.state;
        return (
            <Fragment>
                <div className={cx("search-wrapper", {
                    'active': activeSearch
                })}>
                    <div className="input-holder">
                        <input type="text" className="search-input" id="searchValue" name="searchValue" value={searchValue} onChange={this.handleChange} />
                        <button onClick={() => {
                            if (activeSearch === false) {
                                this.setState({ activeSearch: !activeSearch })
                            }
                            else {
                                this.props.handlerFromParent(searchValue)
                                this.setState({ activeSearch: !activeSearch })
                            }
                        }}
                            className="search-icon"><span /></button>
                    </div>
                    <button onClick={() => this.setState({ activeSearch: !activeSearch, searchValue: '' })} className="close" />
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    //debugger;
    const { campaigns, influencers, locations, interestings, jobCategories, jobs, brands } = state;
    //const { brand } = influencers;
    return {
        //loggingIn,
        brands,
        jobs,
        jobCategories,
        interestings,
        locations,
        campaigns,
        influencers
    };
}

const connectedSearchBox = connect(mapStateToProps)(SearchBox);
export { connectedSearchBox as SearchBox };