import React, { useEffect } from "react";
import axiosRequest from "Backend.js";

import Error from "Error.js";
import Login from "Login.js";
import SiteWrapper from "SiteWrapper.js";

import "App.css";

const InvalidErr = <Error text="Invalid login code!" />;

export default function AdminLogin(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const onLogin = accessCode => {
    // TODO Validate login code in place
    let codeExists = accessCode !== undefined && accessCode !== "";

    if (codeExists) {
      setLoggedIn(true);

      // Try to set logged in state for admin
      axiosRequest
        .post("api/login/admin", { access_code: accessCode })
        .then(status => {
          if (status === "Logged in as admin") {
            // Log in was successful
            // Clear errors on component
            setLoggedIn(true);
            setError("");

            // Move to admin page
            this.props.history.push({
              pathname: "/admin"
            });
          } else {
            // Log in failed, show error
            setLoggedIn(false);
            setError(InvalidErr);
          }
        });
    } else {
      setLoggedIn(false);
      setError(InvalidErr);
    }
  };

  useEffect(() => {
    axiosRequest.get("api/whoami").then(credentials => {
      if (credentials !== undefined && credentials.user_type === "admin") {
        setLoggedIn(true);

        props.history.push({
          pathname: "/admin"
        });
      }
    });
  }, []);

  return SiteWrapper(
    <div className="AdminLogin">
      <Login title="Admin Login" onLogin={onLogin} error={error} />
    </div>
  );
}
