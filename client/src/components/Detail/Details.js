import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import React, { useEffect, useState } from "react";
import "../../assets/styles/Details.scss";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../services/products/toolService";
import { resetDeail } from "../../toolkit/products/detailSlice";
import { format } from "../../utils/format";
import { Skeleton } from "@mui/material";
import { io } from "socket.io-client";
import { encryptData } from "../../utils/encrypData";
import { buyItem } from "../../services/user/userService";
import { purchasereset } from "../../toolkit/users/purchaseSlice";
import Loadding from "../Loading/loading";
import { Alert } from "../../utils/alert";

function Details() {
  const { tag } = useParams();
  const dispatch = useDispatch();
  const [detail, setDetail] = useState([]);
  const [desciption, setDescription] = useState([]);
  const tool = useSelector((state) => state.detail);
  const info = useSelector((state) => state.info);
  const purchase = useSelector((state) => state.purchase);
  const [nonce, setNonce] = useState(0);
  const [checkPay, setCheckPay] = useState(false);
  useEffect(() => {
    if (info?.isSuccess) {
      const socket = io("http://localhost:8444", {
        withCredentials: true,
        query: { id: info.info.id },
      });
      socket.on("getNonce", (data) => {
        console.log(data);
        setNonce(data.nonce);
      });
      socket.on("connect_error", (error) => {
        console.error("Socket connection failed:", error);
      });
      return () => {
        socket.disconnect();
      };
    }
  }, [info?.isSuccess, info.info.id]);

  useEffect(() => {
    dispatch(getDetail(tag));
    return () => {
      dispatch(resetDeail());
      dispatch(purchasereset());
    };
  }, [dispatch, tag]);

  useEffect(() => {
    if (tool.isSuccess) {
      setDetail(tool.detail);
      const array = JSON.parse(tool.detail.description);
      setDescription(array);
    }
  }, [tool.isSuccess, tool]);
  useEffect(() => {
    if (checkPay) {
      if (purchase?.isSuccess) {
        Alert("Thanh toán thành công", purchase?.purchase, "success");
        setCheckPay(false);
        dispatch(purchasereset());
      } else if (purchase?.error) {
        Alert("Thanh toán không thành công", purchase?.error, "error");
        setCheckPay(false);
        dispatch(purchasereset());
      }
    }
  }, [checkPay, purchase, dispatch]);

  const handleBuy = async (data) => {
    if (!info?.isSuccess) {
      return Alert(
        "Vui lòng đăng nhập",
        "Đăng nhập trước khi thanh toán",
        "warning"
      );
    }
    const encrypData = encryptData(
      data.type + "|" + tag + "|" + data.category,
      nonce
    );
    setCheckPay(true);
    try {
      await dispatch(buyItem(encrypData));
    } catch (error) {
      Alert("Lỗi", "Có lỗi xảy ra trong quá trình thanh toán", "error");
    } finally {
      setCheckPay(false);
      dispatch(purchasereset());
    }
  };

  return (
    <React.Fragment>
      <Header />
      {Object.keys(detail).length > 0 ? (
        <div className="details-wrap">
          <ul className="details-items">
            <li className="details-name">{detail?.title}</li>
            <li className="details-info">
              <pre>
                {desciption.map((item, index) => (
                  <React.Fragment key={index}>
                    <span>{item}</span>
                    <br />
                  </React.Fragment>
                ))}
              </pre>
            </li>
            <li className="details-buy">
              <button
                className="for-month"
                onClick={() =>
                  handleBuy({
                    type: "MonthlyPrice",
                    category: detail.category,
                  })
                }
              >
                Mua 30 ngày/{format(detail.monthlyPrice)}
              </button>
              {purchase.isLoading ? (
                <Loadding />
              ) : (
                <>
                  <button
                    onClick={() =>
                      handleBuy({
                        type: "LifetimePrice",
                        category: detail.category,
                      })
                    }
                  >
                    Mua vĩnh viễn/{format(detail.lifetimePrice)}
                  </button>
                </>
              )}
            </li>
            <li className="details-video">
              {detail?.link_tutorial ? (
                <iframe
                  width="100%"
                  height="536"
                  src={detail.link_tutorial}
                  title="Hướng dẫn sử dụng"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              ) : (
                <p>Không có video hướng dẫn.</p>
              )}
            </li>
          </ul>
        </div>
      ) : (
        <>
          <div className="details-wrap">
            <ul className="details-items">
              <li className="details-name">
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width={"30%"}
                  height={32}
                />
              </li>
              <li className="details-info">
                <Skeleton
                  variant="text"
                  animation="wave"
                  width={"80%"}
                  height={20}
                  count={3}
                />
              </li>
              <li className="details-discount">
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width={"50%"}
                  height={40}
                />
              </li>
              <li className="details-buy">
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width={"20%"}
                  height={40}
                />
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width={"20%"}
                  height={40}
                />
              </li>
              <li className="details-video">
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width={"100%"}
                  height={536}
                />
              </li>
            </ul>
          </div>
        </>
      )}
      <Footer />
    </React.Fragment>
  );
}
export default Details;
