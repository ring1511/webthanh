import LayoutPc from "../../components/Layout/LayoutPC";
import React, { useEffect, useRef, useState } from "react";
import "../../assets/styles/Panel.scss";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { Changekey, getHistory } from "../../services/user/userService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faDownload,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import Swal from "sweetalert2";
import { formatDate, formatStatus } from "../../utils/format";
import { useNavigate } from "react-router-dom";

function Panel() {
  const naviagor = useNavigate();
  const { history } = useSelector((state) => state.history);
  const [dataHistory, setDataHistory] = useState([]);
  const [dataVPS, setDataDataVPS] = useState([]);
  const dispatch = useDispatch();
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const handleCopy = () => {};
  const token = Cookies.get("token");

  const [isKeyChanged, setIsKeyChanged] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  useEffect(() => {
    if (isKeyChanged) {
      if (messageType === "success") {
        Swal.fire("Thành công", message, "success");
      } else if (messageType === "error") {
        Swal.fire("Có lỗi xảy ra", message, "error");
      }
      setTimeout(() => {
        naviagor(0);
      }, 1000);
      setIsKeyChanged(false);
      setMessage("");
      setMessageType("");
    }
  }, [isKeyChanged, messageType, message]);
  useEffect(() => {
    if (history.data) {
      const tools = history.data.filter((tool) => tool.category === "TOOL");
      const vps = history.data.filter((VPS) => VPS.category === "VPS");
      setDataHistory(tools);
      setDataDataVPS(vps);
    }
  }, [history.data]);
  useEffect(() => {
    if (token) {
      dispatch(getHistory());
    }
  }, [token, dispatch]);

  const handleChange = (data) => {
    Swal.fire({
      title: "Đổi License",
      text: `Bạn còn ${data.user_change} lượt đổi trong ngày`,
      input: "text",
      inputValue: data.user_key_value,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Hãy nhập một cái gì đó hoặc không...";
        }
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await Changekey({
          id: data.history_id,
          key: result.value,
        });
        if (response.error) {
          setMessage(response.message);
          setMessageType("error");
        } else {
          setMessage(response.message);
          setMessageType("success");
        }
        setIsKeyChanged(true);
      }
    });
  };
  const handleExtend = (data) => {
    Swal.fire({
      title: "Bạn Có Muốn Gia Hạn Thêm?",
      icon: "question",
      iconHtml: "?",
      text: "*Lưu ý gia hạn mặc định là 1 tháng",
      confirmButtonText: "Ok",
      cancelButtonText: "Cancel",
      showCancelButton: true,
      showCloseButton: true,
    });
  };
  return (
    <div>
      <LayoutPc>
        <div className="control-wrap">
          <div className="menu-control-wrap">
            <div className="token-api">
              <div className="title-control">
                <span className="title-api">API Captcha NRO</span>
              </div>
              <div className="control-text" id="control-text">
                <span>
                  HSD:&nbsp;
                  <span style={{ color: "red" }}></span>
                  &nbsp;| số máy kết nối: &nbsp;
                  <span style={{ color: "red" }}></span> &nbsp; | Trạng thái:
                  &nbsp;
                  <span style={{ color: "red" }}>Dùng theo tháng</span> &nbsp;
                </span>
              </div>
              <div>
                <input
                  id="input_hiden"
                  type="text"
                  value={`http://icaptcha.online/SolveCaptcha/${"aiambiet"}`}
                  ref={inputRef1}
                  disabled
                />
                <button onClick={() => handleCopy(inputRef1)}>Copy API</button>
              </div>

              <div className="control-text">
                <span>
                  HSD:&nbsp;<span style={{ color: "red" }}>Không giới hạn</span>{" "}
                  &nbsp;| số lượt còn lại: &nbsp;
                  <span style={{ color: "red" }}></span>
                  &nbsp; | Trạng thái: &nbsp;
                  <span style={{ color: "red" }}>Dùng theo lượt</span> &nbsp;
                </span>
              </div>
              <div>
                <input
                  id="input_hiden"
                  type="text"
                  value={`http://icaptcha.online/SolveCaptcha/${"aiambiet"}`}
                  disabled
                  ref={inputRef2}
                />
                <button onClick={() => handleCopy(inputRef2)}>Copy API</button>
              </div>
            </div>
            <div className="token-api">
              <div className="title-control">
                <span className="title-api">Lịch sử giao dịch</span>
              </div>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tên</th>
                      <th>Trạng thái</th>
                      <th>HSD còn</th>
                      <th>Tải xuống</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataHistory.length > 0 ? (
                      dataHistory?.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{formatStatus(item.user_key_status)}</td>
                            <td>{formatDate(item.expired_at)}</td>
                            <td>
                              <button>
                                <FontAwesomeIcon icon={faDownload} /> Tải xuống
                              </button>
                            </td>
                            <td>
                              <button onClick={() => handleChange(item)}>
                                <FontAwesomeIcon icon={faArrowsRotate} /> Đổi
                                key
                              </button>
                              <button onClick={() => handleExtend(item)}>
                                <FontAwesomeIcon icon={faPlus} /> Gia hạn
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="6">
                          <div style={{ marginTop: ".4rem" }}>
                            <svg
                              width="64"
                              height="41"
                              viewBox="0 0 64 41"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g
                                transform="translate(0 1)"
                                fill="none"
                                fillRule="evenodd"
                              >
                                <ellipse
                                  fill="#f5f5f5"
                                  cx="32"
                                  cy="33"
                                  rx="32"
                                  ry="7"
                                ></ellipse>
                                <g fillRule="nonzero" stroke="#d9d9d9">
                                  <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
                                  <path
                                    d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                                    fill="#fafafa"
                                  ></path>
                                </g>
                              </g>
                            </svg>
                            <p>Không có dữ liệu</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="token-api">
              <div className="title-control">
                <span className="title-api">VPS</span>
              </div>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tên</th>
                      <th>IP</th>
                      <th>Password</th>
                      <th>Trạng thái</th>
                      <th>HSD còn</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataVPS.length > 0 ? (
                      dataVPS?.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.vps_ip || "Vui lòng đợi"}</td>
                            <td>{item.password || "Vui lòng đợi"}</td>
                            <td>{formatStatus(item.user_key_status)}</td>
                            <td>{formatDate(item.expired_at)}</td>
                            <td>
                              <button onClick={() => handleExtend(item)}>
                                <FontAwesomeIcon icon={faPlus} /> Gia hạn
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="6">
                          <div style={{ marginTop: ".4rem" }}>
                            <svg
                              width="64"
                              height="41"
                              viewBox="0 0 64 41"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g
                                transform="translate(0 1)"
                                fill="none"
                                fillRule="evenodd"
                              >
                                <ellipse
                                  fill="#f5f5f5"
                                  cx="32"
                                  cy="33"
                                  rx="32"
                                  ry="7"
                                ></ellipse>
                                <g fillRule="nonzero" stroke="#d9d9d9">
                                  <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
                                  <path
                                    d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                                    fill="#fafafa"
                                  ></path>
                                </g>
                              </g>
                            </svg>
                            <p>Không có dữ liệu</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </LayoutPc>
    </div>
  );
}

export default Panel;
