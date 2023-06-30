import { postAPI } from "@/utils/fetchAPIs";
import React, { useEffect, useState } from "react";
// import bg from "assets/media/illustrations/sketchy-1/14-dark.png";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { loginFun } from "../redux/actions";
import { useRouter } from "next/router";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const loginSubmit = async () => {
    if (loginData.username === "" || loginData.username === null) {
      toast.error("Please provide a valid username to login");
      return;
    }
    if (loginData.password === "" || loginData.password === null) {
      toast.error("Please provide a valid password to login");
      return;
    }
    setIsLoading(true);
    let res = await postAPI("auth", loginData, null);
    if (res?.status) {
      dispatch(loginFun(res));
      toast.success("Your login was successfully");
      router.push("/");
    } else {
      toast.error("Please provide correct username and password");
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="d-flex flex-column flex-root" style={{ height: "100vh" }}>
        <div
          className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed"
          style={{
            backgroundImage:
              "url(assets/media/illustrations/sketchy-1/14-dark.png)",
          }}
        >
          <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
            <div className="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
              <form className="form w-100">
                <div className="text-center mb-10">
                  <h1 className="text-dark mb-3">Sign In to OPL System</h1>
                </div>
                <div className="fv-row mb-10">
                  <label className="form-label fs-6 fw-bolder text-dark">
                    Username
                  </label>

                  <input
                    className="form-control form-control-lg form-control-solid"
                    type="username"
                    name="username"
                    autoComplete="off"
                    value={loginData.username}
                    onChange={(e) =>
                      setLoginData({ ...loginData, username: e.target.value })
                    }
                  />
                </div>
                <div className="fv-row mb-10">
                  <div className="d-flex flex-stack mb-2">
                    <label className="form-label fw-bolder text-dark fs-6 mb-0">
                      Password
                    </label>
                  </div>
                  <input
                    className="form-control form-control-lg form-control-solid"
                    type="password"
                    name="password"
                    autoComplete="off"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                  />
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-lg btn-primary w-100 mb-5"
                    onClick={loginSubmit}
                  >
                    {!isLoading ? (
                      <span className="indicator-label">Continue</span>
                    ) : (
                      <span className="indicator-label">Please wait...</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
