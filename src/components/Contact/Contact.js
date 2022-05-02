import React, { Component } from "react";
import { db } from "../../firebase";
import { withRouter } from "react-router";

const initData = {
  pre_heading: "Contact",
  heading: "Get In Touch",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
};

class Contact extends Component {
  state = {
    initData: {},
    name: "",
    email: "",
    subject: "",
    message: "",
  };
  handleName = (e) => {
    this.setState({ name: e.target.value });
  };
  handleEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  handleSubject = (e) => {
    this.setState({ subject: e.target.value });
  };
  handleMessage = (e) => {
    this.setState({ message: e.target.value });
  };
  handleSubmit = () => {
    db.collection("contact").add({
      name: this.state.name,
      email: this.state.email,
      subject: this.state.subject,
      message: this.state.message,
    });
    alert("Your message has been sent. We will get back to you soon!");
  };
  componentDidMount() {
    this.setState({
      initData: initData,
    });
  }
  render() {
    return (
      <section className="author-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-7">
              {/* Intro */}
              <div className="intro text-center">
                <span>{this.state.initData.pre_heading}</span>
                <h3 className="mt-3 mb-0">{this.state.initData.heading}</h3>
                {/* <p>{this.state.initData.content}</p> */}
              </div>
              {/* Item Form */}
              <form id="contact-form" className="item-form card no-hover">
                <div className="row">
                  <div className="col-12">
                    <div className="form-group mt-3">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleName}
                        placeholder="Name"
                        required="required"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group mt-3">
                      <input
                        type="email"
                        className="form-control"
                        value={this.state.email}
                        onChange={this.handleEmail}
                        name="email"
                        placeholder="Email"
                        required="required"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group mt-3">
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.subject}
                        onChange={this.handleSubject}
                        name="subject"
                        placeholder="Subject"
                        required="required"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group mt-3">
                      <textarea
                        className="form-control"
                        name="message"
                        placeholder="Message"
                        value={this.state.message}
                        onChange={this.handleMessage}
                        cols={30}
                        rows={3}
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      onClick={() => {
                        this.handleSubmit();
                        this.props.history.push("/");
                      }}
                      className="btn w-100 mt-3 mt-sm-4"
                      type="submit"
                    >
                      <i className="icon-paper-plane mr-2" />
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Contact);
