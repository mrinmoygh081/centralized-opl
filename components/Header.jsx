import Link from "next/link";
import React, { useState } from "react";

export default function Header() {
  const [isDropOpen, setIsDropOpen] = useState(false);
  const toggleDropMenu = () => setIsDropOpen(!isDropOpen);
  return (
    <>
      <div id="kt_header" className="header align-items-stretch shadow">
        <div className="container-fluid d-flex align-items-stretch justify-content-between">
          <div
            className="d-flex align-items-center d-lg-none ms-n2 me-2"
            title="Show aside menu"
          >
            <div
              className="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px"
              id="kt_aside_mobile_toggle"
            >
              <span className="svg-icon svg-icon-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z"
                    fill="currentColor"
                  ></path>
                  <path
                    opacity="0.3"
                    d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
            </div>
          </div>
          <div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
            <div className="d-flex align-items-stretch" id="kt_header_nav">
              <div className="header-menu align-items-stretch">
                <div
                  className="menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-700 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-0 align-items-stretch"
                  id="#kt_header_menu"
                >
                  <div className="menu-item here show menu-lg-down-accordion me-lg-1">
                    <span className="menu-link py-3">
                      <span className="menu-title">Dashboard</span>
                      <span className="menu-arrow d-lg-none"></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
