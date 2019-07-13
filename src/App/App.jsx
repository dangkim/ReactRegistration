import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { RegisterBrandPage } from '../RegisterBrandPage';
import { RegisterCampaignPage } from '../RegisterCampaignPage';
import { DashBoardPage } from '../DashBoardPage';
import { RegisterInfluencerPage } from '../RegisterInfluencerPage';
import { messaging } from "../init-fcm";
import { compose, lifecycle, withHandlers, withState } from "recompose";

import css from './app.css';

const renderNotification = (notification, i) => <li key={i}>{notification}</li>;

const registerPushListener = pushNotification =>
  navigator.serviceWorker.addEventListener("message", ({ data }) =>
    pushNotification(
      data.data
        ? data.data.message
        : data["firebase-messaging-msg-data"].data.message
    )
  );

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="app-container app-theme-white body-tabs-shadow">
                <div className="app-container">
                    <div>
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <Route path="/registerBrandPage" component={RegisterBrandPage} />
                                <Route path="/registerCampaignPage" component={RegisterCampaignPage} />
                                <Route path="/dashboardPage" component={DashBoardPage} />
                                <Route path="/registerInfluencerPage" component={RegisterInfluencerPage} />
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export default compose(
    withState("token", "setToken", ""),
    withState("notifications", "setNotifications", []),
    withHandlers({
      pushNotification: ({
        setNotifications,
        notifications
      }) => newNotification =>
        setNotifications(notifications.concat(newNotification))
    }),
    lifecycle({
      async componentDidMount() {
        const { pushNotification, setToken } = this.props;
  
        messaging
          .requestPermission()
          .then(async function() {
            const token = await messaging.getToken();
            setToken(token);
          })
          .catch(function(err) {
            console.log("Unable to get permission to notify.", err);
          });
  
        registerPushListener(pushNotification);
      }
    })
  )(App);
  
export { connectedApp as App }; 