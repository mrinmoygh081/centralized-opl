import Head from "next/head";
import dynamic from "next/dynamic";
import SideBar from "@/components/SideBar";
import Header from "@/components/Header";
import React, { use, useEffect, useState } from "react";
const Select = dynamic(() => import("react-select"), {
  ssr: false,
});
import makeAnimated from "react-select/animated";
import { useSelector } from "react-redux";
import { getAPI, postAPI } from "@/utils/fetchAPIs";
import { useRouter } from "next/router";
import Image from "next/image";
import { toast } from "react-toastify";

const animatedComponents = makeAnimated();

export default function RelManagement() {
  const router = useRouter();
  const { loginToken } = useSelector((state) => state.authReducer);
  const [screenData, setScreenData] = useState(null);
  const [shiftData, setShiftData] = useState(null);
  const [partsData, setPartsData] = useState(null);
  const [productsData, setProductsData] = useState(null);
  const [imagesData, setImagesData] = useState(null);
  const [selected, setSelected] = useState({
    product: "",
    parts: "",
    image: "",
    image2: "",
    screens: "",
    shifts: "",
  });

  useEffect(() => {
    (async () => {
      let screen = await getAPI("screens", null);
      let scOptions = [];
      screen?.data.map((item) => {
        scOptions.push({ value: item.screen_ip, label: item.screen_name });
      });
      setScreenData(scOptions);

      let products = await getAPI("products", null);
      let productsOptions = [];
      products?.data.map((item) => {
        productsOptions.push({ value: item.product_id, label: item.name });
      });
      setProductsData(productsOptions);

      let shifts = await getAPI("shifts", null);
      let shiftsOptions = [];
      shifts?.data.map((item) => {
        shiftsOptions.push({ value: item.shift_id, label: item.shift_name });
      });
      setShiftData(shiftsOptions);

      let images = await getAPI("instructions", null);
      if (images?.status) {
        setImagesData(images?.data);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (selected?.product !== "" && selected?.product !== undefined) {
        let parts = await getAPI(`partsForProducts/${selected?.product}`, null);
        let partsOptions = [];
        parts?.data.map((item) => {
          partsOptions.push({
            value: item.subproduct_id,
            label: item.parts_name,
          });
        });
        setPartsData(partsOptions);
      }
    })();
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

  const addOPLHandler = async () => {
    if (
      selected?.product !== "" &&
      selected?.parts !== "" &&
      selected?.screens !== "" &&
      selected?.shifts !== "" &&
      selected?.image !== "" &&
      selected?.image2 !== ""
    ) {
      const data = await postAPI("addOPL", selected, null);
      if (data?.status) {
        toast.success("Product Line is added succesfully");
        setSelected({
          product: "",
          parts: "",
          image: "",
          image2: "",
          screens: "",
          shifts: "",
        });
        setScreenData(null);
        setShiftData(null);
        setPartsData(null);
        setProductsData(null);
        setImagesData(null);
        router.back();
      } else {
        toast.error("Product data is not added. Try Again!");
      }
    } else {
      toast.error("Please fill all the fields");
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
              <Header />
              <div
                className="content d-flex flex-column flex-column-fluid"
                id="kt_content"
              >
                <div className="post d-flex flex-column-fluid">
                  <div id="kt_content_container" className="container-xxl">
                    <div className="row g-5 g-xl-8">
                      <div className="col-12">
                        <div className="card card-xxl-stretch mb-5 mb-xxl-8">
                          <div className="card-body py-3">
                            <div className="tab-content">
                              <div className="fade show d-block">
                                <div>
                                  <div>
                                    <div className="modal-header">
                                      <h2 className="fw-bolder">Add OPL</h2>
                                    </div>
                                    {/* begin::Modal body */}
                                    <div className="modal-body my-7">
                                      <form className="form" noValidate>
                                        <div className="d-flex flex-column me-n7 pe-7">
                                          <div className="fv-row mb-7">
                                            <label className="required fw-bold fs-6 mb-2">
                                              Product Name
                                            </label>
                                            {productsData &&
                                              productsData.length > 0 && (
                                                <Select
                                                  components={
                                                    animatedComponents
                                                  }
                                                  onChange={(res) =>
                                                    setSelected({
                                                      ...selected,
                                                      product: res?.value,
                                                    })
                                                  }
                                                  options={productsData}
                                                />
                                              )}
                                          </div>

                                          {selected?.product && (
                                            <div className="fv-row mb-7">
                                              <label className="required fw-bold fs-6 mb-2">
                                                Part Name of the Product
                                              </label>

                                              <Select
                                                components={animatedComponents}
                                                onChange={(res) =>
                                                  setSelected({
                                                    ...selected,
                                                    parts: res?.value,
                                                  })
                                                }
                                                options={partsData}
                                              />
                                            </div>
                                          )}
                                          <div className="fv-row mb-7">
                                            <label className="required fw-bold fs-6 mb-2">
                                              Screens
                                            </label>

                                            {screenData &&
                                              screenData.length > 0 && (
                                                <Select
                                                  components={
                                                    animatedComponents
                                                  }
                                                  onChange={(res) =>
                                                    setSelected({
                                                      ...selected,
                                                      screens: parseInt(
                                                        res?.value
                                                      ),
                                                    })
                                                  }
                                                  options={screenData}
                                                />
                                              )}
                                          </div>

                                          <div className="fv-row mb-7">
                                            <label className="required fw-bold fs-6 mb-2">
                                              Shifts
                                            </label>

                                            {shiftData &&
                                              shiftData.length > 0 && (
                                                <Select
                                                  components={
                                                    animatedComponents
                                                  }
                                                  onChange={(res) =>
                                                    setSelected({
                                                      ...selected,
                                                      shifts: parseInt(
                                                        res?.value
                                                      ),
                                                    })
                                                  }
                                                  options={shiftData}
                                                />
                                              )}
                                          </div>

                                          <div className="fv-row mb-7">
                                            <label className="required fw-bold fs-6 mb-2">
                                              1st Instruction
                                            </label>
                                            <div className="row">
                                              {imagesData &&
                                                imagesData.length > 0 &&
                                                imagesData.map(
                                                  (item, index) => (
                                                    <div
                                                      className="col-12 col-md-3"
                                                      key={index}
                                                    >
                                                      <div
                                                        className={
                                                          selected.image ==
                                                          item?.instruction_id
                                                            ? "image_list active"
                                                            : "image_list"
                                                        }
                                                        onClick={() =>
                                                          setSelected({
                                                            ...selected,
                                                            image:
                                                              item?.instruction_id,
                                                          })
                                                        }
                                                      >
                                                        <Image
                                                          loader={({ src }) => {
                                                            return `uploads/${src}`;
                                                          }}
                                                          src={
                                                            item?.instruction_img
                                                          }
                                                          alt=""
                                                          width={200}
                                                          height={100}
                                                        />
                                                      </div>
                                                    </div>
                                                  )
                                                )}
                                            </div>
                                          </div>

                                          <div className="fv-row mb-7">
                                            <label className="required fw-bold fs-6 mb-2">
                                              2nd Instruction
                                            </label>
                                            <div className="row">
                                              {imagesData &&
                                                imagesData.length > 0 &&
                                                imagesData.map(
                                                  (item, index) => (
                                                    <div
                                                      className="col-12 col-md-3"
                                                      key={index}
                                                    >
                                                      <div
                                                        className={
                                                          selected.image2 ==
                                                          item?.instruction_id
                                                            ? "image_list active"
                                                            : "image_list"
                                                        }
                                                        onClick={() =>
                                                          setSelected({
                                                            ...selected,
                                                            image2:
                                                              item?.instruction_id,
                                                          })
                                                        }
                                                      >
                                                        <Image
                                                          loader={({ src }) => {
                                                            return `uploads/${src}`;
                                                          }}
                                                          src={
                                                            item?.instruction_img
                                                          }
                                                          alt=""
                                                          width={200}
                                                          height={100}
                                                        />
                                                      </div>
                                                    </div>
                                                  )
                                                )}
                                            </div>
                                          </div>
                                        </div>
                                        {/* end::Scroll */}

                                        {/* begin::Actions */}
                                        <div className="text-center pt-15">
                                          <button
                                            type="button"
                                            className="btn btn-light me-3"
                                            onClick={() => router.back()}
                                          >
                                            Go Back
                                          </button>
                                          <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={addOPLHandler}
                                          >
                                            <span className="indicator-label">
                                              ADD
                                            </span>
                                          </button>
                                        </div>
                                        {/* end::Actions */}
                                      </form>
                                    </div>
                                    {/* end::Modal body */}
                                  </div>
                                  {/* end::Modal content */}
                                </div>
                                {/* end::Modal dialog */}
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
        </div>
      </main>
    </>
  );
}
