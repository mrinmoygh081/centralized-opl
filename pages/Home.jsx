import Head from "next/head";
import Image from "next/image";
import SideBar from "@/components/SideBar";
import Header from "@/components/Header";
import { getDateTimeNow } from "@/utils/getDateTimeNow";
import React, { Fragment, useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useSelector } from "react-redux";
import { getAPI, postAPI } from "@/utils/fetchAPIs";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { CronJob } from "cron";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import Footer from "@/components/Footer";

const durationOptions = [
  { value: "", label: "Choose Duration" },
  { value: "10", label: "10 Seconds" },
  { value: "30", label: "30 Seconds" },
  { value: "60", label: "60 Seconds" },
  { value: "120", label: "120 Seconds" },
];

const timeGapOptions = [
  { value: "", label: "Choose Time" },
  { value: "1", label: "1 Minute" },
  { value: "5", label: "5 Minutes" },
  { value: "10", label: "10 Minutes" },
  { value: "30", label: "30 Minutes" },
  { value: "60", label: "60 Minutes" },
  { value: "120", label: "120 Minutes" },
];

const animatedComponents = makeAnimated();

export default function Home() {
  const router = useRouter();
  const { loginToken } = useSelector((state) => state.authReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState(null);
  const [clients, setClients] = useState(null);
  const [shifts, setShifts] = useState(null);
  const [imagesData, setImagesData] = useState(null);
  const [selected, setSelected] = useState({
    product_id: "",
    shift_id: "",
    client_id: "",
  });
  const [oplData, setOplData] = useState(null);
  const [dateTimeNow, setDateTimeNow] = useState();
  const [screenOptions, setScreenOptions] = useState(null);
  const [isPopup, setIsPopup] = useState({
    isPop: false,
    itemNo: null,
  });
  const [customerFeedback, setCustomerFeedback] = useState([
    {
      img: "",
      screens: [],
    },
  ]);
  const [custTime, setCustTime] = useState({
    duration: "",
    time: "",
  });

  useEffect(() => {
    (async () => {
      if (
        selected?.product_id !== "" &&
        selected?.shift_id !== "" &&
        selected?.client_id !== ""
      ) {
        let res = await postAPI("dashboard", selected);
        if (res?.status) {
          setOplData(res?.data);
        } else {
          setOplData({
            product_id: "",
            shift_id: "",
            client_id: "",
          });
        }
      }
    })();
  }, [selected]);

  const getImagesData = async () => {
    setIsLoading(true);
    const data = await getAPI("instructions", null);
    if (data?.status) {
      setImagesData(data?.data);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      toast.error(`Something went wrong. ${data?.message}`);
    }
  };

  useEffect(() => {
    let dateTime = getDateTimeNow();
    setDateTimeNow(dateTime);

    (async () => {
      await getImagesData();
      let screen = await getAPI("screens", null);
      let scOptions = [{ value: "", label: "Choose Screens" }];
      screen?.data.map((item) => {
        scOptions.push({ value: item.screen_ip, label: item.screen_name });
      });
      setScreenOptions(scOptions);
    })();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    const data = await postAPI("productByClient", {
      client_id: selected?.client_id,
    });
    if (data?.status) {
      setProducts(data?.data);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      toast.error("Something went wrong", data?.message);
    }
  };
  const getShifts = async () => {
    setIsLoading(true);
    const data = await getAPI("shifts", null);
    if (data?.status) {
      setShifts(data?.data);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      toast.error("Something went wrong", data?.message);
    }
  };
  const getClients = async () => {
    setIsLoading(true);
    const data = await getAPI("clients", null);
    if (data?.status) {
      setClients(data?.data);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      toast.error("Something went wrong", data?.message);
    }
  };

  useEffect(() => {
    getShifts();
    getClients();
    if (selected?.client_id !== "") {
      getData();
    }
  }, [selected]);

  useEffect(() => {
    (async function () {
      let token = { loginToken };
      let isAuth = await postAPI("isAuth", token, null);
      if (!isAuth?.status) {
        router.push("/login");
      }
    })();
  }, [loginToken, router]);

  const OPLHandler = async () => {
    if (oplData) {
      let oplSendFile = oplData.map((item, index) => {
        return {
          current_shift: item?.shift_id,
          current_screen: item?.screen_ip,
          current_img: item?.opl,
          current_product: item?.product_id,
        };
      });

      // add data to current table
      await oplSendFile.map(async (item, index) => {
        const data = await postAPI("current", item, null);
        if (data?.status) {
          // toast.success(`Image ${index + 1} updated succesfully`);
          // call opl
          await callOPL();
        } else {
          toast.error(`Product is not added. ${data?.message}`);
        }
      });
    } else {
      toast.error("Please send OPL First!");
    }
  };

  const sendHandler = async () => {
    await OPLHandler();
  };

  const callOPL = async () => {
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    // await oplSendFile.map(async (item, index) => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/oplCon`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.status) {
          toast.success(`OPL has been sent`);
        } else {
          toast.error(`OPL cannot be sent`);
        }
      })
      .catch((error) => console.log("error", error));
    // });
  };

  // Customer Feedback
  const addNew = async () => {
    setCustomerFeedback([
      ...customerFeedback,
      {
        img: "",
        screens: null,
      },
    ]);
  };

  const handleSelectImg = async (it) => {
    let cusFeeds = [...customerFeedback];
    let item = cusFeeds[isPopup.itemNo];
    cusFeeds[isPopup.itemNo] = { ...item, img: it?.instruction_img };
    setCustomerFeedback(cusFeeds);
    setIsPopup({
      isPop: false,
      itemNo: null,
    });
  };

  const closeOne = async (index) => {
    const rows = [...customerFeedback];
    rows.splice(index, 1);
    setCustomerFeedback(rows);
  };

  const handleScreens = (e, index) => {
    const rows = [...customerFeedback];
    let item = rows[index];
    rows[index] = { ...item, screens: e.value };
    setCustomerFeedback(rows);
  };

  const sendFeedback = async () => {
    let oplSendFile = customerFeedback.map((item, index) => {
      return {
        current_shift: 0,
        current_screen: item?.screens,
        current_img: item?.img,
        current_product: 0,
      };
    });

    // add data to current table
    let isDataToDB = false;
    await Promise.all(
      oplSendFile.map(async (item) => {
        const data = await postAPI("current_feed", item, null);
        if (data?.status) {
          // toast.success(`Image ${index + 1} updated succesfully`);
          // call opl
          isDataToDB = true;
        } else {
          isDataToDB = false;
          toast.error(`Product is not updated. ${data?.message}`);
        }
      })
    );

    const oplNum = await getAPI("oplGetLength", null);
    if (isDataToDB) {
      for (let i = 0; i < oplNum?.data; i++) {
        await callOPL();
      }
    }
  };

  // Cronjobs
  const [cron, setCron] = useState(null);
  const cronStartFeed = () => {
    let dursn = parseInt(custTime?.duration) * 1000;
    setCron(
      new CronJob(
        `*/${parseInt(custTime?.time)} * * * *`,
        async function () {
          await sendFeedback();
          setTimeout(async () => {
            await OPLHandler();
          }, dursn);
        },
        null,
        true,
        "America/Los_Angeles"
      )
    );
  };

  const sendFeedHandler = async () => {
    if (custTime.time !== "") {
      if (custTime.duration !== "") {
        if (
          customerFeedback[0]?.img !== "" &&
          customerFeedback[0].screens > 0
        ) {
          await OPLHandler();
          await cronStartFeed();
        } else {
          toast.error(
            "Please select the image and screens for customer feedback!"
          );
        }
      } else {
        toast.error("Please select the duration!");
      }
    } else {
      toast.error("Please select the Time Gap!");
    }
  };

  const stopCronJob = async () => {
    if (cron) {
      cron.stop();
      toast.info("Process has been stopped!");
    } else {
      toast.error("Please send the process first!");
    }
  };

  return (
    <>
      <Head>
        <title>Centralized OPL</title>
        <meta name="description" content="Generated by Centralized OPL" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="d-flex flex-column flex-root">
          <div className="page d-flex flex-row flex-column-fluid">
            <SideBar />
            <div className="wrapper d-flex flex-column flex-row-fluid">
              <Header title={"Dashboard"} />
              <div
                className="content d-flex flex-column flex-column-fluid"
                id="kt_content"
              >
                <div className="post d-flex flex-column-fluid">
                  <div id="kt_content_container" className="container-xxl">
                    <div className="row g-5 g-xl-8">
                      <div className="col-12">
                        <div className="screen_header">
                          <div className="screen_header_top">
                            <h2>
                              Welcome <span>Admin</span>
                              <br />
                              <p className="dateTime">
                                <span>{dateTimeNow}</span>
                              </p>
                            </h2>
                            <div className="choose">
                              <label htmlFor="client">
                                <b>Choose Client</b>
                              </label>
                              <select
                                id="client"
                                onChange={(e) =>
                                  setSelected({
                                    ...selected,
                                    client_id: e.target.value,
                                  })
                                }
                              >
                                <option value={""}>Choose client</option>
                                {clients &&
                                  clients.map((item, index) => (
                                    <option key={index} value={item?.client_id}>
                                      {item?.name}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      {selected?.client_id !== "" && (
                        <>
                          <div className="col-12">
                            <div className="screen_header">
                              <div className="screen_header_top">
                                <div className="choose">
                                  <label htmlFor="shifts">Choose Shift</label>
                                  <select
                                    id="shifts"
                                    onChange={(e) =>
                                      setSelected({
                                        ...selected,
                                        shift_id: e.target.value,
                                      })
                                    }
                                  >
                                    <option>Choose shift</option>
                                    {shifts &&
                                      shifts.map((item, index) => (
                                        <option
                                          key={index}
                                          value={item?.shift_id}
                                        >
                                          {item?.shift_name}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                                <div className="choose">
                                  <label htmlFor="products">
                                    Choose Product
                                  </label>
                                  <select
                                    id="products"
                                    onChange={(e) =>
                                      setSelected({
                                        ...selected,
                                        product_id: e.target.value,
                                      })
                                    }
                                  >
                                    <option>Choose product</option>
                                    {products &&
                                      products.map((item, index) => (
                                        <option
                                          key={index}
                                          value={item?.product_id}
                                        >
                                          {item?.product_name}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                          {oplData && oplData.length > 0 && (
                            <div className="col-12">
                              <div className="card card-xxl-stretch mb-5 mb-xxl-8">
                                <div className="card-header border-0 pt-5">
                                  <h3 className="card-title align-items-start flex-column">
                                    <span className="card-label fw-bold fs-3 mb-1">
                                      Products
                                    </span>
                                    <span className="text-muted mt-1 fw-semibold fs-7">
                                      Total {oplData && oplData.length} Parts of
                                      the Product
                                    </span>
                                  </h3>
                                </div>
                                <div className="card-body py-3">
                                  <div className="tab-content">
                                    <div className="table-responsive">
                                      <table className="table table-striped table-bordered table_height">
                                        <thead>
                                          <tr className="border-0">
                                            <th>Product | Shift</th>
                                            <th>Parts Of the Product</th>
                                            <th className=" min-w-150px">
                                              Instruction
                                            </th>
                                            {/* <th className=" min-w-150px">
                                          2nd Instruction
                                        </th> */}
                                            <th>Screen Names</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {oplData &&
                                            oplData.map((item, i) => (
                                              <tr key={i}>
                                                <td>
                                                  {item?.product} |{" "}
                                                  {item?.shift}
                                                </td>
                                                <td className="fw-semibold">
                                                  {item?.parts}
                                                </td>
                                                <td>
                                                  <Image
                                                    loader={({ src }) => {
                                                      return `uploads/${src}`;
                                                    }}
                                                    src={item.opl}
                                                    alt=""
                                                    width={180}
                                                    height={90}
                                                    loading="lazy"
                                                  />
                                                </td>
                                                <td>
                                                  {item?.screen} <br />
                                                  Screen ID:{" "}
                                                  <b>{item?.screen_id}</b>
                                                </td>
                                              </tr>
                                            ))}
                                        </tbody>
                                      </table>
                                      <div className="text-center py-3">
                                        <button
                                          className="btn fw-bold btn-primary mx-3"
                                          onClick={() => sendHandler()}
                                        >
                                          Send
                                        </button>

                                        {/* <button
                                          className="btn fw-bold btn-primary mx-3"
                                          onClick={() => stopOPL()}
                                        >
                                          Stop
                                        </button> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      )}

                      <div className="col-12 customer_feedback">
                        <div className="card card-xxl-stretch mb-5 mb-xxl-8">
                          <div className="card-header border-0 pt-5 justify-content-between">
                            <h3 className="card-title align-items-start flex-column">
                              <span className="card-label fw-bold fs-3 mb-1">
                                Customer Feedback
                              </span>
                            </h3>
                            <div>
                              <label htmlFor="duration">Duration</label>
                              <Select
                                closeMenuOnSelect={true}
                                components={animatedComponents}
                                defaultValue={[durationOptions[0]]}
                                isMulti={false}
                                options={durationOptions}
                                onChange={(e) =>
                                  setCustTime({
                                    ...custTime,
                                    duration: e.value,
                                  })
                                }
                              />
                            </div>
                            <div>
                              <label htmlFor="time-gap">Time Gap</label>
                              <Select
                                closeMenuOnSelect={true}
                                components={animatedComponents}
                                defaultValue={[timeGapOptions[0]]}
                                isMulti={false}
                                options={timeGapOptions}
                                onChange={(e) =>
                                  setCustTime({ ...custTime, time: e.value })
                                }
                              />
                            </div>
                          </div>

                          <div className="card-body py-3">
                            <div className="tab-content">
                              <div className="table-responsive">
                                <table className="table table-striped table-bordered table_height">
                                  <thead>
                                    <tr className="border-0">
                                      <th className="min-w-500px">
                                        Instruction
                                      </th>
                                      <th>Screens</th>
                                      <th>Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody style={{ maxHeight: "100%" }}>
                                    {customerFeedback &&
                                      customerFeedback.map((item, index) => (
                                        <tr key={index}>
                                          <td className="min-w-500px table_center">
                                            {/* <input
                                              type="file"
                                              className="form-control pb-2"
                                              id="feedbackImg"
                                              accept=".jpg, .png, .jpeg"
                                              onChange={(e) =>
                                                handleImages(e, index)
                                              }
                                              multiple={false}
                                            /> */}
                                            <button
                                              className="btn fw-bold btn-primary"
                                              onClick={() =>
                                                setIsPopup({
                                                  isPop: true,
                                                  itemNo: index,
                                                })
                                              }
                                            >
                                              Choose Image File
                                            </button>
                                            {item && item.img != "" && (
                                              <div className="previewDiv shadow">
                                                <div className="previewImg">
                                                  <Image
                                                    loader={({ src }) =>
                                                      `/uploads/${src}`
                                                    }
                                                    src={item.img}
                                                    alt="preview image"
                                                    layout="fill"
                                                    objectFit="contain"
                                                  />
                                                </div>
                                              </div>
                                            )}
                                          </td>

                                          <td className="">
                                            {screenOptions && (
                                              <Select
                                                closeMenuOnSelect={true}
                                                components={animatedComponents}
                                                defaultValue={[
                                                  screenOptions[0],
                                                ]}
                                                isMulti={false}
                                                options={screenOptions}
                                                onChange={(e) =>
                                                  handleScreens(e, index)
                                                }
                                              />
                                            )}
                                          </td>
                                          <td className="table_center">
                                            {customerFeedback &&
                                              customerFeedback.length > 1 && (
                                                <>
                                                  <button
                                                    onClick={() =>
                                                      closeOne(index)
                                                    }
                                                    className="btn fw-bold btn-danger"
                                                  >
                                                    <FontAwesomeIcon
                                                      icon={faClose}
                                                    />
                                                  </button>
                                                </>
                                              )}
                                          </td>
                                        </tr>
                                      ))}
                                  </tbody>
                                </table>
                                <div className="d-flex align-items-center justify-content-between py-3">
                                  <button
                                    onClick={addNew}
                                    className="btn fw-bold btn-info"
                                  >
                                    ADD NEW
                                  </button>
                                  <div>
                                    <button
                                      className="btn fw-bold btn-primary mx-3"
                                      onClick={() => stopCronJob()}
                                    >
                                      Stop
                                    </button>
                                    <button
                                      onClick={sendFeedHandler}
                                      className="btn fw-bold btn-primary"
                                    >
                                      Send
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </div>
        <div className={isPopup.isPop ? "popup active" : "popup"}>
          <div className="card card-xxl-stretch mb-5 mb-xxl-8">
            <div className="card-header border-0 pt-5">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold fs-3 mb-1">
                  Instructions
                </span>
                <span className="text-muted mt-1 fw-semibold fs-7">
                  {imagesData && `Total ${imagesData.length} Instructions`}
                </span>
              </h3>
              <button
                className="btn fw-bold btn-danger"
                onClick={() =>
                  setIsPopup({
                    isPop: false,
                    itemNo: null,
                  })
                }
              >
                Close
              </button>
            </div>
            <div className="row">
              {imagesData &&
                imagesData.length > 0 &&
                imagesData.map((item, index) => (
                  <div className="col-12 col-md-3" key={index}>
                    <div
                      className={
                        selected.image == item?.instruction_id
                          ? "image_list active"
                          : "image_list"
                      }
                      onClick={() => handleSelectImg(item)}
                    >
                      <Image
                        loader={({ src }) => {
                          return `uploads/${src}`;
                        }}
                        src={item?.instruction_img}
                        alt=""
                        width={300}
                        height={150}
                      />
                    </div>
                  </div>
                ))}
              {/* <div className="col-12">
                <button
                  className="btn fw-bold btn-primary"
                  onClick={handleSelectImg}
                >
                  Select
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
