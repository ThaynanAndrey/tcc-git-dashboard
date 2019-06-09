import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { login, isAuthenticated } from '../../store/actions/authAction';
import { ToastContainer, toast } from 'react-toastify';

const cardStyles = {
    textAlign: "center",
    width: "38vw",
    margin: "0 auto",
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
};

const buttonStyle = {
    width: "65%"
};

/**
 * Component with the function of presenting Login Screen.
 * 
 * @author Thaynan Nunes
 */
class Login extends Component {
  constructor(props) {
    super(props);
    
    this.login = this.login.bind(this);
  }

  /**
   * Login user.
   */
  async login() {
    await this.props.login();

    if(isAuthenticated()) {
        this.props.history.push('/');
    } else {
        toast.error("Error ao tentar logar! Tente Novamente", {
            position: "top-right",
            autoClose: 4500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    }
  }

  render() {
    return (
        <div style={cardStyles}>
            <ToastContainer />
            
            <div className="card blue-grey darken-2">
                <div className="card-content white-text">
                    <span className="card-title">
                        <h4>
                            Git Dashboard
                        </h4>    
                    </span>
                    <h6>
                        Autentique-se com sua conta do GitHub para poder
                        ter acesso aos seus Repositórios e Pull Requests.
                    </h6>
                </div>
                <div className="card-action">
                    <button className="waves-effect waves-light btn blue lighten-1"
                        style={buttonStyle}
                        onClick={() => this.login()}>
                        <FontAwesomeIcon icon={['fab', 'github']} />
                        &nbsp;
                        Login com GitHub
                    </button>
                </div>
            </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    error: state.auth.errorLogin
});

const mapDispatchToProps = (dispatch) => ({
    login: () => dispatch(login())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);