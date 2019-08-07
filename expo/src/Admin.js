import React, { Component } from "react";
import axiosRequest from "./Backend.js";

import "./Admin.css";
import "./App.css";
import { sortByTableNumber } from "./helpers.js";

import ProjectModule from "./admin/AdminProject.js";
import WinnerModule from "./admin/AdminWinner.js";
import SponsorModule from "./admin/AdminSponsor.js";

import SiteWrapper from "./SiteWrapper.js";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSquare } from "../node_modules/@fortawesome/fontawesome-free-regular";
import { faCaretDown, faCaretUp, faCheckSquare, faUpload } from "../node_modules/@fortawesome/fontawesome-free-solid";
library.add(faUpload);
library.add(faCaretDown);
library.add(faCaretUp);
library.add(faCheckSquare);
library.add(faSquare);

/* Admin page content (see PRD) */

/* Final class containing admin page */
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      loggedInAs: "",
      projects: [],
      challenges: "",
    };
    // LF6K3G6RR3Q4VX4S
    axiosRequest.get("api/whoami")
      .then((credentials) => {
        if (credentials != undefined && credentials.user_type == "admin") {
          this.setState({
            loggedIn: true,
            loggedInAs: "admin",
          });
        } else {
          this.props.history.push({
            pathname: "/adminlogin",
          });
        }
      })
      .catch((error) => {

      });
  }

  componentWillMount() {
    this.loadProjects();
    this.loadChallenges();
  }

  loadProjects = () => {
    axiosRequest.get("api/projects_and_winners")
      .then((projectData) => {
        // Check first project element and see if table numbers consist of both alpha and numeric portions
        const tableNumbersAreOnlyNumeric = projectData.projects.length > 0 &&
          /^[0-9]+$/.test(projectData.projects[0].table_number);
        this.setState({
          projects: sortByTableNumber(projectData.projects, !tableNumbersAreOnlyNumeric),
        });
      });
  }

  loadChallenges = () => {
    axiosRequest.get("api/challenges")
      .then((challengeData) => {
        this.setState({
          challenges: challengeData,
        });
      });
  }

  logout() {
    // Redirect back to admin login page and end session
    axiosRequest.post("api/logout")
      .then(() => {
        this.props.history.push("/adminlogin");
      });
  }

  render() {
    if (this.state.loggedIn) {
      return (
        SiteWrapper(
          <div className="row">
            <div className="col">
              <WinnerModule projects={this.state.projects} loadProjects={this.loadProjects} logout={this.logout.bind(this)} />
              <SponsorModule />
            </div>
            <div className="col">
              <ProjectModule projects={this.state.projects} loadProjects={this.loadProjects} loadChallenges={this.loadChallenges} challenges={this.state.challenges} />
            </div>
          </div>,
        )
      );
    } else {
      return SiteWrapper();
    }
  }
}

export default Admin;
