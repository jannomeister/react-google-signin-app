import React from "react";
import axios from "axios";
import { GoogleLogin, GoogleLogout } from "react-google-login";

import "./App.css";

// please specify your google client id
const GOOGLE_CLIENT_ID = "";

function App() {
  const [user, setUser] = React.useState(null);

  const onLoginSuccess = async (response) => {
    console.log("success: ", { code: response.code });

    try {
      const result = await axios.post(
        "http://localhost:3000/api/user/login/google",
        {
          code: response.code,
        }
      );

      setUser(result.data);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const onLoginFailed = (response) => console.log("failed: ", response);

  const onLogout = () => {
    console.log("logout");
  };

  return (
    <div className="App">
      <div style={{ margin: "5rem 0" }}>
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Login with Google"
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailed}
          offline={true}
          responseType="code"
        />

        {user ? <div>{JSON.stringify(user)}</div> : null}
      </div>

      <div>
        <GoogleLogout
          clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={onLogout}
        />
      </div>
    </div>
  );
}

export default App;
