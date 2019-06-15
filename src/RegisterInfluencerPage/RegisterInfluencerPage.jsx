import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import img from '../../images/signup-image.jpg'
import { userActions } from '../_actions';

class RegisterInfluencerPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                userName: '',
                email: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.firstName && user.lastName && user.userName && user.email && user.password) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { influencers  } = this.props;
        const { user, submitted } = this.state;
        return (            
            <section className="signup">
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Sign up</h2>
                            <form onSubmit={this.handleSubmit} className="register-form" id="register-form">
                                <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                                    <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" name="firstName" id="firstname" placeholder="Your First Name" value={user.firstName} onChange={this.handleChange}/>
                                    {
                                        submitted && !user.firstName &&
                                        <div className="help-block">First Name is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                                    <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" name="lastName" id="lastname" placeholder="Your Last Name" value={user.lastName} onChange={this.handleChange}/>
                                    {
                                        submitted && !user.lastName &&
                                        <div className="help-block">Last Name is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !user.userName ? ' has-error' : '')}>
                                    <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" name="userName" id="username" placeholder="Your User Name" value={user.userName} onChange={this.handleChange}/>
                                    {
                                        submitted && !user.userName &&
                                        <div className="help-block">User Name is required</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                                    <input type="email" name="email" id="email" placeholder="Your Email" value={user.email} onChange={this.handleChange}/>
                                    {
                                        submitted && !user.email &&
                                        <div className="help-block">Email is required</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pass"><i className="zmdi zmdi-lock"></i></label>
                                    <input type="password" id="password" placeholder="Password" name="password" value={user.password} onChange={this.handleChange}/>
                                    {
                                        submitted && !user.password &&
                                        <div className="help-block">Password is required</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                                    <label htmlFor="agree-term" className="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" className="term-service">Terms of service</a></label>
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit" name="signup" id="signup" className="form-submit" value="Register"/>
                                    {
                                        registering && 
                                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                    }
                                    <Link to="/login" className="btn btn-link">Cancel</Link>
                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure><img src={img} alt="sing up image"/></figure>
                            <a href="#" className="signup-image-link">I am already member</a>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {
    const { influencers } = state.influencers;
    return {
        influencers
    };
}

const connectedRegisterInfluencerPage = connect(mapStateToProps)(RegisterInfluencerPage);
export { connectedRegisterInfluencerPage as RegisterInfluencerPage };