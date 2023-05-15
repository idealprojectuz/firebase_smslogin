import { authentification } from "./firebase-config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import "./app.css";
import React from "react";
function App() {
  const countryCode = "+998";
  const [phoneNumber, setPhoneNumber] = React.useState(countryCode)
  const [expandForm, setExpandForm] = React.useState(false)
  const [Otp, setOtp] = React.useState('')

  const phonechange = (e) => {
    setPhoneNumber(e.target.value)
  }

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    }, authentification);
  }
  const requestOTP = (e) => {
    e.preventDefault();
    if (phoneNumber.length >= 13) {
      setExpandForm(true);
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(authentification, phoneNumber, appVerifier)
        .then(confirmationResult => {
          window.confirmationResult = confirmationResult
          console.log(confirmationResult)
        })
        .catch(error => console.log(error))
    }
  }
  const verifyOTP = (e) => {
    let otps = e.target.value
    setOtp(otps)
    if (Otp.length === 6) {
      let confirmationResult = window.confirmationResult
      confirmationResult.confirm(Otp).then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(user)
        console.log(result)
        // ...
      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
      });
    }
  }
  return (
    <div className="formcontainer">
      <form onSubmit={requestOTP}>
        <input type="tel" onInput={phonechange} defaultValue={phoneNumber} />
        {expandForm ? <> <input type="number" defaultValue={Otp} onChange={verifyOTP} placeholder="tasdiqlash kodini kiriting" />
        </> : ''}
        <div id="recaptcha-container">

        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
