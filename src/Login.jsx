import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import liftingJournalLogo from '/liftingJournalLogo.jpg'
import Button from '@mui/material/Button';


export default function Login() {
  const navigate = useNavigate();

  const [isLoggedin, setIsLoggedin] = useState(false);

  const handleClick = () => {
    const callbackUrl = `${window.location.origin}`;
    const googleClientId = "618603663123-1tooekfuvds78e91aagm71jvrhfenbqo.apps.googleusercontent.com";
    const targetUrl = `https://accounts.google.com/o/oauth2/auth?redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&response_type=token&client_id=${googleClientId}&scope=openid%20email%20profile`;
    window.location.href = targetUrl;
  };
  console.log(`${window.location.origin}`)

  useEffect(() => {
    const accessTokenRegex = /access_token=([^&]+)/;
    const isMatch = window.location.href.match(accessTokenRegex);
    if (isMatch) {
      const accessToken = isMatch[1];
      Cookies.set("access_token", accessToken);
      setIsLoggedin(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedin) {
      navigate("/Main");
    }
  }, [isLoggedin, navigate]);

  return (
    <div className="card">
      <div>
      <div className="row">
          <p>Lifting Tracker</p>
          <br></br>
          <Button onClick={handleClick}>
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
}