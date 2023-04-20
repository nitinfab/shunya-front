import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import styled from "../user.module.css";
import passwordIcon from "../../assets/password.svg";
import cross from "../../assets/cross.svg";

import facebookIcon from "../../assets/facebookIcon.svg";
import googleIcon from "../../assets/googleIcon.svg";
import twitterIcon from "../../assets/twitterIcon.svg";
import blob7Icon from "../../assets/blob7.svg";
import Rectangle2 from "../../assets/Rectangle2.png";
import { useDispatch } from "react-redux";
import { confirmPageTitle } from "../../redux/TabSlice";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginState, setloginState] = useState("signup");
  const [loginButtonStatus, setLoginButtonStatus] = useState(false);
  const [forgotState, setForgotState] = useState(false);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const [resetState, setresetState] = useState(false);
  const [otpVerfiyState, setotpVerfiyState] = useState(false);
  const [otpVerfiyValue, setotpVerfiyValue] = useState({
    otpvalue: "",
  });
  const [resetValue, setresetValue] = useState({
    email: "",
  });
  const [newPassword, setnewPassword] = useState({
    password: "",
  });
  const [user, setUser] = useState({
    email: "",
    password: "",
    picture:
      "https://lh3.googleusercontent.com/a/AGNmyxaW25f37xeR6b4MvxwMu7aQ7cj2eFmfOH0ATXhx=s96-c",
  });
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  /////////////////////////////     Sign Up     /////////////////////////
  function handleSubmit(e, state) {
    e.preventDefault();
    function EmailValid() {
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const passwordPattern =
        /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
      if (emailPattern.test(user.email)) {
        setEmailError(false);

        function PassValid() {
          if (passwordPattern.test(user.password)) {
            setPassError(false);
            if (state === "login") loginMember(user);
            else SignUser(user);
          } else {
            console.log("Password not Correct");
            setPassError(true);
          }
        }
        PassValid();
      } else {
        console.log(" Email Not correct");
        setEmailError(true);
      }
    }
    EmailValid();
  }


  /////////////////////////////   Validation User    /////////////////////////

  const SignUser = async (userData) => {
    let res, data;
    if (userData.email && userData.password) {
      res = await fetch(`http://localhost:8000/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: userData,
        }),
      });
      data = await res.json();
      if (data.status === 422) {
        console.log("User Not Register", data);
      } else {
        console.log("Yes user Successfully Register", data.status);
        // Token
        const userObb = {
          tokenGen: data.tokenGen,
          tokenStatus: "manual",
        };
        localStorage.setItem("userToken", JSON.stringify(userObb));
        navigate(`/project/manual`);
      }
    } else {
      console.log("Enter All Details");
    }
  };
  /////////////////////////           LOGIN          ///////////////////////////
  const loginMember = async (userData) => {
    let res, data;

    if (userData.email && userData.password) {
      res = await fetch(`http://localhost:8000/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: userData,
        }),
      });

      data = await res.json();
      if (data.status === 422) {
        console.log("User Not Register", data);
      } else {
        console.log("Yes user Successfully Register", data.status);
        let userObb = {
          tokenGen: data.userDetail.token,
          tokenStatus: "manual",
          projectName: data.userDetail.projects[0].projectName,
          userName: data.userDetail.name,
        };
        localStorage.setItem("userToken", JSON.stringify(userObb));
        dispatch(
          confirmPageTitle({
            value: 0,
            name: data.userDetail.projects[0].projectName,
            url: `/home/${data.userDetail.projects[0].projectName}/0/home`,
          })
        );
        navigate(`/home/${data.userDetail.projects[0].projectName}/0/home`);
      }
    } else {
      console.log("Enter All Details");
    }
  };

  ////  Google Authenticate
  function authGoogle() {
    window.open(`http://localhost:8000/auth/google/callback`, "_self");

    let userObb = {
      tokenGen: "",
      tokenStatus: "google",
    };
    console.log("38483hdgfghdf", userObb);

    localStorage.setItem("userToken", JSON.stringify(userObb));
  }
  ////  Linkdin Authenticate
  //  function authLinkdin() {
  //   window.open(`http://localhost:8000/auth/linkedin/callback`, "_self");
  //   let userObb = {
  //     tokenGen: "",
  //     tokenStatus: "google",
  //   };
  //   // localStorage.setItem("userToken", JSON.stringify(userObb));
  // }
  //////////////////////////////////   Ussr Authentication Section ////////////

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (user.email.length <= 0) {
        setEmailError(false);
      }
      if (user.password.length <= 0) {
        setPassError(false);
      }
      if (emailRef.current && emailRef.current.contains(e.target)) {
        console.log("clicked outside email input");
        function PassValid() {
          const passwordPattern =
            /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
          if (passwordPattern.test(user.password)) {
            // setPasswordError("Password requirements: 8-20 characters, 1 number, 1 letter, 1 symbol.");
            console.log("CORRECT", user.password);
            setPassError(false);
          } else {
            console.log("UnCORRCET");
            if (user.password.length > 0) {
              setPassError(true);
            } else {
              setPassError(false);
            }
          }
        }
        PassValid();
      } else if (passRef.current && passRef.current.contains(e.target)) {
        console.log("clicked outside password input");
        function EmailValid() {
          const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
          if (emailPattern.test(user.email)) {
            console.log("CORRECT", user.email);
            setEmailError(false);
          } else {
            console.log("UnCORRCET", user.email.length);
            if (user.email.length > 0) {
              setEmailError(true);
            } else {
              setEmailError(false);
            }
          }
        }
        EmailValid();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emailRef, passRef, user]);
  return (
    <div className={styled.signcontainer}>
      <div className={styled.section1}>
        {loginState === "signup" ? (
          <div className={styled.mainHeading}>Welcome to Shunya.io</div>
        ) : (
          <div className={styled.mainHeading}>Welcome back to Shunya.io</div>
        )}
        <div className={styled.subHeading}>
          Your all in one unified project management tool
        </div>
      </div>
      <div className={styled.section2} style={{ zIndex: 2 }}>
        <form
          onSubmit={(e) => {
            if (loginState !== "signup") handleSubmit(e, "login");
            else handleSubmit(e, "signup");
          }}
          style={{ width: "50%", height: "100%" }}
        >
          <div className={styled.loginContainer_togg}>
            <div className={styled.loginContainer_sub}>
              <div className={styled.toggleButton}>
                <div
                  className={
                    loginState === "signup"
                      ? styled.toggbuttonStyle
                      : styled.toggbuttonStyle1
                  }
                  style={{ fontSize: "1.8rem", fontWeight: "40rem" }}
                  onClick={() => {
                    setloginState("signup");
                  }}
                >
                  Sign up
                </div>
                <div
                  className={
                    loginState === "signup"
                      ? styled.toggbuttonStyle1
                      : styled.toggbuttonStyle
                  }
                  style={{ fontSize: "1.8rem", fontWeight: "40rem" }}
                  onClick={() => {
                    setloginState("login");
                  }}
                >
                  Log in
                </div>
              </div>
              <div style={{ flex: 1, marginTop: "6rem", width: "100%" }}>
                <div className={styled.inputBox}>
                  <input
                    ref={emailRef}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email Id"
                    defaultValue={user.email}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    autoComplete="off"
                    required
                  ></input>
                  {emailError ? (
                    <h5
                      style={{
                        position: "absolute",
                        top: "110%",
                        color: "red",
                        fontSize: "1.2rem",
                        left: "1.5%",
                      }}
                    >
                      Enter Email incorrect
                    </h5>
                  ) : (
                    ""
                  )}
                </div>
                <div className={styled.inputBox} style={{ marginTop: "3rem" }}>
                  <input
                    ref={passRef}
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    defaultValue={user.password}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    autoComplete="off"
                  ></input>
                  <div>
                    <img src={passwordIcon} alt="password" />
                  </div>
                  {passError ? (
                    <h5
                      style={{
                        position: "absolute",
                        top: "110%",
                        color: "red",
                        fontSize: "1.2rem",
                        left: "1.5%",
                      }}
                    >
                      Password requirements: 8-20 characters, 1 number, 1
                      letter, 1 symbol
                    </h5>
                  ) : (
                    ""
                  )}
                </div>
                {loginState === "signup" ? (
                  <button
                    className={styled.inputBox}
                    style={{
                      marginTop: "3rem",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: "1.8rem",
                      fontWeight: "40rem",
                      cursor: "pointer",
                    }}
                  >
                    Sign Up
                  </button>
                ) : (
                  ""
                )}
                {loginState === "login" ? (
                  <div
                    style={{
                      marginTop: "3rem",
                      height: "3.3rem",
                      color: "#fff",
                      fontSize: "1.2rem",
                      alignSelf: "flex-start",
                    }}
                  >
                    A verification mail will be sent to you once you sign up
                  </div>
                ) : (
                  <div
                    style={{
                      marginTop: "3rem",
                      height: "3.3rem",
                      color: "#fff",
                      fontSize: "1.2rem",
                    }}
                  >
                    By signing up, I agree to the Shunya's
                    <span style={{ color: "#055FFC" }}>Privacy policy</span> &
                    <span style={{ color: "#055FFC" }}>Term's of Services</span>
                  </div>
                )}
              </div>
              {loginState === "signup" ? (
                ""
              ) : (
                <div
                  style={{
                    position: "absolute",
                    cursor: "pointer",
                    bottom: "7%",
                    left: "3%",
                    fontSize: "1.5rem",
                    zIndex: 8,
                    color: "#fff",
                  }}
                  onClick={() => {
                    setForgotState(true);
                  }}
                >
                  forgot Password?
                </div>
              )}
              {loginState === "signup" ? (
                ""
              ) : (
                <button
                  className={styled.loginButton}
                  style={{
                    position: "absolute",
                    cursor: "pointer",
                    bottom: "7%",
                    right: "3%",
                    fontSize: "1.5rem",
                    zIndex: 8,
                  }}
                  disabled={loginButtonStatus}
                >
                  Log in
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
      {loginState === "signup" || loginState === "login" ? (
        <div style={{ flex: 1, marginTop: "2rem" }}>
          <div
            style={{
              fontSize: "1.5rem",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
            }}
          >
            OR
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <div
              className={styled.socialContainer}
              onClick={() => {
                authGoogle();
              }}
            >
              <div>
                <img src={googleIcon} alt="dsfnsdkf" />
              </div>
            </div>
            <div
              className={styled.socialContainer}
              style={{ margin: "0rem 8rem" }}
              // onClick={() => {
              //   authLinkdin();
              // }}
            >
              <div>
                <img src={facebookIcon} alt="dsfnsdkf" />
              </div>
            </div>
            <div className={styled.socialContainer}>
              <div>
                <img src={twitterIcon} alt="dsfnsdkf" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {loginState ? (
        <>
          {/* <div className={styled.bolb3}>
        <svg
          width="335"
          height="332"
          viewBox="0 0 335 332"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M211.569 1.26814C244.375 6.77052 273.593 25.7921 295.613 50.1559C317.327 74.1826 329.883 104.801 333.878 136.6C337.741 167.34 331.449 198.326 317.74 226.257C304.489 253.257 282.186 273.882 257.669 291.873C232.28 310.504 205.51 330.263 173.789 331.89C141.836 333.528 112.854 316.643 85.3348 300.71C57.7468 284.737 29.5941 267.496 14.6876 239.775C-0.371275 211.771 -3.00602 178.61 2.96102 147.525C8.67616 117.751 26.6402 92.3111 47.3285 69.7307C67.2439 47.9938 91.7934 32.0322 119.27 20.579C148.805 8.26755 179.917 -4.04066 211.569 1.26814Z"
            fill="#6842FF"
          />
        </svg>
      </div> */}
          <div className={styled.bolb4}>
            <svg
              width="374"
              height="417"
              viewBox="0 0 374 417"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M222.005 4.31021C279.004 17.1307 324.447 60.5608 350.98 115.785C377.293 170.549 382.192 234.273 359.722 290.944C336.706 348.994 291.259 394.839 234.011 410.799C176.668 426.786 115.453 411.159 68.9618 372.005C23.9344 334.084 2.10822 274.941 0.150159 213.848C-1.81861 152.422 15.4596 90.8165 58.6423 50.0312C102.958 8.17597 164.047 -8.72593 222.005 4.31021Z"
                fill="#FF2C62"
              />
            </svg>
          </div>
        </>
      ) : (
        <>
          {/* <div className={styled.bolb2}>
          <svg
            width="343"
            height="300"
            viewBox="0 0 343 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.938801"
              d="M185.93 1.85273C227.703 6.85765 269.49 18.5111 297.552 50.4226C328.216 85.2929 350.023 132.209 340.908 178.091C332.056 222.647 291.483 250.857 253.117 274.088C219.259 294.591 181.052 303.827 142.005 298.533C102.178 293.133 64.311 276.496 38.6497 245.008C11.4922 211.684 -4.97981 168.767 1.35352 125.943C7.68769 83.1125 35.9416 47.1923 71.4336 23.3312C105.103 0.695588 145.863 -2.94767 185.93 1.85273Z"
              fill="#FD6F00"
            />
          </svg>
        </div> */}

          {/* <div className={styled.bolb1}>
          <svg
            width="406"
            height="407"
            viewBox="0 0 406 407"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.673835"
              d="M335.306 45.6159C422.022 126.641 431.299 262.311 350.139 348.884C271.693 432.562 140.045 421.622 56.2281 343.305C-20.779 271.352 -16.4741 150.551 55.599 73.6717C130.617 -6.34872 255.153 -29.2775 335.306 45.6159Z"
              fill="#7929FF"
            />
          </svg>
        </div> */}
        </>
      )}
      {forgotState ? (
        <div className={styled.editable1_sub}>
          <div className={styled.editable1_sub1}>
            <div
              style={{
                display: "flex",
                marginTop: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "1.8rem",
              }}
            >
              <div>Generate Otp</div>
              <div
                className={styled.crossStyle1}
                onClick={() => {
                  setForgotState(false);
                }}
              >
                <img src={cross} alt="cross" className={styled.closeIcon} />
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                async function GenerateOtp() {
                  await fetch(`http://localhost:8000/generate/otp`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      data: resetValue.email,
                    }),
                  });
                }

                GenerateOtp();

                setForgotState(false);
                setotpVerfiyState(true);
              }}
            >
              <input
                type="text"
                defaultValue={resetValue.email}
                name="email"
                onChange={(e) => {
                  setresetValue({
                    ...resetValue,
                    [e.target.name]: e.target.value,
                  });
                }}
                className={styled.editinputStyle}
                placeholder="Email ..."
                style={{ resize: "none", padding: "1rem" }}
                autoFocus
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  margin: "1.5rem 0rem",
                  height: "3.5rem",
                }}
              >
                <div></div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <button type="submit" className={styled.AddStyle}>
                    Generate Otp
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}

      {otpVerfiyState ? (
        <div className={styled.editable1_sub}>
          <div className={styled.editable1_sub1}>
            <div
              style={{
                display: "flex",
                marginTop: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "1.8rem",
              }}
            >
              <div>Verify Otp</div>
              <div
                className={styled.crossStyle1}
                onClick={() => {
                  setotpVerfiyState(false);
                }}
              >
                <img src={cross} alt="cross" className={styled.closeIcon} />
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                async function GenerateOtp() {
                  let res = await fetch(
                    `http://localhost:8000/generate/otp/verify`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        data: otpVerfiyValue.otpvalue,
                        userEmail: resetValue.email,
                      }),
                    }
                  );
                  let data = await res.json();
                  console.log("sdds32323  data.otpStatus", data.otpStatus);
                  if (data.status == 422) console.log("Otp Wrong");
                  else {
                    if (data.otpStatus) {
                      setotpVerfiyValue({ ...otpVerfiyValue, otpvalue: "" });
                    }
                  }
                }

                GenerateOtp();
                setotpVerfiyState(false);
                setresetState(true);
              }}
            >
              <input
                type="text"
                defaultValue={otpVerfiyValue.otpvalue}
                name="otpvalue"
                onChange={(e) => {
                  setotpVerfiyValue({
                    ...otpVerfiyValue,
                    [e.target.name]: e.target.value,
                  });
                }}
                className={styled.editinputStyle}
                placeholder="Otp Verification ..."
                style={{ resize: "none", padding: "1rem" }}
                autoFocus
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  margin: "1.5rem 0rem",
                  height: "3.5rem",
                }}
              >
                <div></div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <button type="submit" className={styled.AddStyle}>
                    Verify Otp
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
      {resetState ? (
        <div className={styled.editable1_sub}>
          <div className={styled.editable1_sub1}>
            <div
              style={{
                display: "flex",
                marginTop: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "1.8rem",
              }}
            >
              <div>Reset Password</div>
              <div
                className={styled.crossStyle1}
                onClick={() => {
                  setresetState(false);
                }}
              >
                <img src={cross} alt="cross" className={styled.closeIcon} />
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                async function GenerateOtp() {
                  let res = await fetch(`http://localhost:8000/resetPassword`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      userEmail: resetValue.email,
                      newPass: newPassword.password,
                    }),
                  });
                  let data = await res.json();
                  if (data.status == 422) console.log("Password not reset");
                  else {
                    console.log("Password Reset");
                    setnewPassword({ ...newPassword, password: "" });
                    setresetValue({
                      ...resetValue,
                      email: "",
                    });
                    setresetState(false);
                  }
                }

                GenerateOtp();
              }}
            >
              <input
                type="text"
                defaultValue={newPassword.password}
                name="password"
                onChange={(e) => {
                  setnewPassword({
                    ...newPassword,
                    [e.target.name]: e.target.value,
                  });
                }}
                className={styled.editinputStyle}
                placeholder="New Password ..."
                style={{ resize: "none", padding: "1rem" }}
                autoFocus
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  margin: "1.5rem 0rem",
                  height: "3.5rem",
                }}
              >
                <div></div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <button type="submit" className={styled.AddStyle}>
                    Generate Otp
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Signup;
