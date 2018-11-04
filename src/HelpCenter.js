import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, FormLayout, TextField } from '@shopify/polaris';
import axios from 'axios';
import { apiMerchant, apiSubmitTicket } from './config';
import iconHelper from './icon_help.png';
import './style.css';

export default class HelperCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      activeThanks: false,
      activeVideo: false,
      subject: '',
      message: '',
      email: null,
      name: null,
      errorSubject: '',
      errorMessage: ''
    };
  }
  static propTypes = {
    document: PropTypes.string,
    video: PropTypes.string,
    shop: PropTypes.string,
    groupID: PropTypes.number
  }

  componentDidMount() {
    fetch(`${apiMerchant}/get-data-shop?shop_domain=${this.props.shop}`)
      .then(result => {
        return result.json();
      })
      .then(data => {
        this.setState({ email: data.email, name: data.name });
      });
  }

  handleSubmitTicket = () => {
    this.setState(({ active }) => ({
      active: !active,
      activeThanks: false,
      activeVideo: false
    }));
  };

  handleSendTicket = () => {
    const { email, name, subject, message } = this.state;
    if (message === '') this.setState({ errorMessage: 'Message is required' });
    if (subject === '') this.setState({ errorSubject: 'Subject is required' });
    let groupID = this.props.groupID === undefined ? 42000051885 : this.props.groupID;
    let bodyFormData = new FormData();
    bodyFormData.set('name', name);
    bodyFormData.set('email', email);
    bodyFormData.set('subject', subject);
    bodyFormData.set('message', message);
    bodyFormData.set('group_id', groupID);

    axios({
      method: 'POST',
      url: apiSubmitTicket,
      data: bodyFormData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    })
      .then(res => {
        if (res.data.success) {
          this.setState(({ activeThanks }) => ({
            active: false,
            activeThanks: !activeThanks,
            activeVideo: false
          }));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleOK = () => {
    this.setState(({ activeThanks }) => ({ activeThanks: !activeThanks }));
  };

  handleVideo = () => {
    this.setState(({ activeVideo }) => ({
      activeVideo: !activeVideo,
      active: false,
      activeThanks: false
    }));
  };

  render() {
    const {
      document, video
    } = this.props;
    const {
      active,
      activeThanks,
      subject,
      message,
      activeVideo,
      errorSubject,
      errorMessage
    } = this.state;
    let classMain = "label-container-child";
    let classDoc = "";
    let classTicket = "";
    let classChat = "";
    let classVideo = "";
    let hideVideo = "";
    if(video === undefined){
      classDoc    = "lb-2";
      classTicket = "lb-3";
      classChat   = "lb-4";
      classVideo  = "d-none";
      hideVideo   = "d-none";
    } else {
      classDoc    = "lb-1";
      classTicket = "lb-2";
      classChat   = "lb-3";
      classVideo  = "lb-4";
    }
    return (
      <div className="fixed-action-btn click-to-toggle">
        <a className="ak_float btn-floating btn-large">
          <img src={iconHelper} alt="Help" className="ak_img_help" />
        </a>
        <div className="label-container">
          <div className="label-text">Help Center</div>
          <i className="material-icons label-arrow">arrow_right</i>
        </div>
        <ul className="ak-ul">
          <li>
            <a className="btn-floating" href={document} target="_blank">
              <i className="material-icons">event_note</i>
            </a>
            <div className={`${classMain} ${classDoc}`}>
              <div className="label-text-child">Read Document</div>
              <i className="material-icons label-arrow-child">arrow_right</i>
            </div>
          </li>
          <li>
            <a className="btn-floating" onClick={this.handleSubmitTicket}>
              <i className="material-icons">mail_outline</i>
            </a>
            <div className={`${classMain} ${classTicket}`}>
              <div className="label-text-child">Submit Ticket</div>
              <i className="material-icons label-arrow-child">arrow_right</i>
            </div>
          </li>
          <li>
            <a
              className="goto-chat btn-floating"
              onClick={this.handleShowLiveChat}
            >
              <i className="material-icons">chat_bubble</i>
            </a>
            <div className={`${classMain} ${classChat}`}>
              <div className="label-text-child">Live Chat</div>
              <i className="material-icons label-arrow-child">arrow_right</i>
            </div>
          </li>
          <li className={hideVideo}>
            <a className="btn-floating" onClick={this.handleVideo}>
              <i className="material-icons">play_arrow</i>
            </a>
            <div className={`${classMain} ${classVideo}`}>
              <div className="label-text-child">Instruction Video</div>
              <i className="material-icons label-arrow-child">arrow_right</i>
            </div>
          </li>
        </ul>
        {/* Modal Submit Ticket */}
        <Modal
          open={active}
          onClose={this.handleSubmitTicket}
          title={`Hi ${this.state.name}, how can we help you?`}
          primaryAction={{
            content: 'Send',
            onAction: this.handleSendTicket
          }}
        >
          <Modal.Section>
            <p className="ak-help-des">Submit your question</p>
            <Form onSubmit={this.handleSubmit}>
              <FormLayout>
                <TextField
                  error={errorSubject}
                  value={subject}
                  onChange={subject =>
                    this.setState({ subject, errorSubject: '' })
                  }
                  placeholder="Add the subject of your question"
                />
                <TextField
                  error={errorMessage}
                  placeholder="Details"
                  value={message}
                  onChange={message =>
                    this.setState({ message, errorMessage: '' })
                  }
                  multiline={5}
                />
              </FormLayout>
            </Form>
          </Modal.Section>
        </Modal>
        {/* Modal Success */}
        <Modal
          open={activeThanks}
          onClose={this.handleOK}
          title="Send Success"
          primaryAction={{
            content: 'OK',
            onAction: this.handleOK
          }}
        >
          <Modal.Section>
            <p className="ak-help-des">
              Thanks {this.state.name}, we will get back to you soon to:{' '}
              {this.state.email}
            </p>
          </Modal.Section>
        </Modal>
        {/* Modal Video */}
        <Modal
          open={activeVideo}
          onClose={this.handleVideo}
          title="Instruction Video"
          primaryAction={{
            content: 'OK',
            onAction: this.handleVideo
          }}
        >
          <Modal.Section>
            <iframe
              title="Instruction Video"
              width="100%"
              height="315"
              src={video}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </Modal.Section>
        </Modal>
      </div>
    );
  }
}
