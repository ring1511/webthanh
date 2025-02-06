import "../../assets/styles/Main.scss";
import imgtool from "../../assets/imgs/tool.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faFan,
  faSnowflake,
  faSpider,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getTool } from "../../services/products/toolService";
import { useDispatch, useSelector } from "react-redux";
import { formatNumber, format } from "../../utils/format";

function Main() {
  const dispatch = useDispatch();
  const [tools, setTools] = useState([]);
  const [Vps, setVps] = useState([]);
  const [captcha, setCaptcha] = useState([]);
  const AllProduct = useSelector((state) => state.product);
  console.log(AllProduct);
  useEffect(() => {
    dispatch(getTool());
  }, [dispatch]);

  useEffect(() => {
    if (AllProduct.products?.length > 0) {
      const filteredTools = AllProduct.products.filter(
        (product) => product.category === "TOOL"
      );
      const filteredVPS = AllProduct.products.filter(
        (product) => product.category === "VPS"
      );
      const filteredCaptcha = AllProduct.products.filter(
        (product) => product.category === "CAP"
      );
      setTools(filteredTools);
      setVps(filteredVPS);
      setCaptcha(filteredCaptcha);
    }
  }, [AllProduct.products]);

  return (
    <main>
      <div className="main-wrap">
        <div className="main-tool">
          <div className="title-main-tool">
            <p>
              <FontAwesomeIcon icon={faFan} size="xl" spin fixedWidth />
              TOOL
              <FontAwesomeIcon icon={faFan} size="xl" spin fixedWidth />
            </p>
          </div>
          {tools.length > 0 ? (
            <div className="main-list-item">
              {tools.map((item, index) => (
                <div className="list-item" key={index}>
                  <img src={imgtool} alt="anh" />
                  <article className="item-info">
                    <h3 className="item-name">{item.title}</h3>
                    <p className="item-info">
                      Giá: {format(item.monthlyPrice)}/Tháng
                    </p>
                    <p className="item-info">
                      Giá: {format(item.lifetimePrice)}/Vĩnh viễn
                    </p>
                    <span className="">Lượt mua: {formatNumber(1)}</span>
                  </article>
                  <Link to={`/san-pham/${item.serial}`} className="item-view">
                    <span>
                      <FontAwesomeIcon icon={faCartShopping} /> Chi tiết
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="main-list-item">
              <div className="list-item">
                <img src={imgtool} alt="anh" />
                <article className="item-info">
                  <h3 className="item-name">----------------------------</h3>
                  <p className="item-info">----------------------------</p>
                  <p className="item-info">----------------------------</p>
                  <span className="">----------------------------</span>
                </article>
                <Link to={"/"} className="item-view" role="button">
                  <span>------------</span>
                </Link>
              </div>
              <div className="list-item">
                <img src={imgtool} alt="anh" />
                <article className="item-info">
                  <h3 className="item-name">----------------------------</h3>
                  <p className="item-info">----------------------------</p>
                  <p className="item-info">----------------------------</p>
                  <span className="">----------------------------</span>
                </article>
                <Link to={"/"} className="item-view" role="button">
                  <span>------------</span>
                </Link>
              </div>
              <div className="list-item">
                <img src={imgtool} alt="anh" />
                <article className="item-info">
                  <h3 className="item-name">----------------------------</h3>
                  <p className="item-info">----------------------------</p>
                  <p className="item-info">----------------------------</p>
                  <span className="">----------------------------</span>
                </article>
                <Link to={"/"} className="item-view" role="button">
                  <span>------------</span>
                </Link>
              </div>
              <div className="list-item">
                <img src={imgtool} alt="anh" />
                <article className="item-info">
                  <h3 className="item-name">----------------------------</h3>
                  <p className="item-info">----------------------------</p>
                  <p className="item-info">----------------------------</p>
                  <span className="">----------------------------</span>
                </article>
                <Link to={"/"} className="item-view" role="button">
                  <span>------------</span>
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="main-captcha">
          <div className="title-main-capthca">
            <p>
              <FontAwesomeIcon icon={faSnowflake} size="xl" fixedWidth />
              Dịch Vụ CAPTCHA
              <FontAwesomeIcon icon={faSnowflake} size="xl" fixedWidth />
            </p>
          </div>
          {Vps.length > 0 ? (
            <div className="main-list-item">
              {Vps.map((item, index) => (
                <div className="list-item" key={index}>
                  <img src={imgtool} alt="anh" />
                  <article className="item-info">
                    <h3 className="item-name">{item.title}</h3>
                    <p className="item-info">
                      Giá: {format(item.monthlyPrice)}/Tháng
                    </p>
                    <p className="item-info">
                      Giá: {format(item.lifetimePrice)}/Vĩnh viễn
                    </p>
                    <span className="">Lượt mua: {formatNumber(1)}</span>
                  </article>
                  <Link to={`/san-pham/${item.serial}`} className="item-view">
                    <span>
                      <FontAwesomeIcon icon={faCartShopping} /> Chi tiết
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="main-list-item">
              <div className="list-item">
                <img src={imgtool} alt="anh" />
                <article className="item-info">
                  <h3 className="item-name">----------------------------</h3>
                  <p className="item-info">----------------------------</p>
                  <p className="item-info">----------------------------</p>
                  <span className="">----------------------------</span>
                </article>
                <Link to={"/"} className="item-view" role="button">
                  <span>------------</span>
                </Link>
              </div>
              <div className="list-item">
                <img src={imgtool} alt="anh" />
                <article className="item-info">
                  <h3 className="item-name">----------------------------</h3>
                  <p className="item-info">----------------------------</p>
                  <p className="item-info">----------------------------</p>
                  <span className="">----------------------------</span>
                </article>
                <Link to={"/"} className="item-view" role="button">
                  <span>------------</span>
                </Link>
              </div>
              <div className="list-item">
                <img src={imgtool} alt="anh" />
                <article className="item-info">
                  <h3 className="item-name">----------------------------</h3>
                  <p className="item-info">----------------------------</p>
                  <p className="item-info">----------------------------</p>
                  <span className="">----------------------------</span>
                </article>
                <Link to={"/"} className="item-view" role="button">
                  <span>------------</span>
                </Link>
              </div>
              <div className="list-item">
                <img src={imgtool} alt="anh" />
                <article className="item-info">
                  <h3 className="item-name">----------------------------</h3>
                  <p className="item-info">----------------------------</p>
                  <p className="item-info">----------------------------</p>
                  <span className="">----------------------------</span>
                </article>
                <Link to={"/"} className="item-view" role="button">
                  <span>------------</span>
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="main-vps">
          <div className="title-main-vps">
            <p>
              <FontAwesomeIcon
                icon={faSpider}
                size="xl"
                fixedWidth
                rotation={90}
              />
              Danh Mục VPS
              <FontAwesomeIcon
                icon={faSpider}
                size="xl"
                fixedWidth
                rotation={270}
              />
            </p>
          </div>
          {captcha.length > 0 ? (
            <div className="main-list-item">
              {captcha.map((item, index) => (
                <div className="list-item" key={index}>
                  <img src={imgtool} alt="anh" />
                  <article className="item-info">
                    <h3 className="item-name">{item.title}</h3>
                    <p className="item-info">
                      Giá: {format(item.monthlyPrice)}/Tháng
                    </p>
                    <p className="item-info">
                      Giá: {format(item.lifetimePrice)}/Vĩnh viễn
                    </p>
                    <span className="">Lượt mua: {formatNumber(1)}</span>
                  </article>
                  <Link to={`/san-pham/${item.serial}`} className="item-view">
                    <span>
                      <FontAwesomeIcon icon={faCartShopping} /> Chi tiết
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="main-list-item">
              <div className="list-item">
                <img src={imgtool} alt="anh" />
                <article className="item-info">
                  <h3 className="item-name">----------------------------</h3>
                  <p className="item-info">----------------------------</p>
                  <p className="item-info">----------------------------</p>
                  <span className="">----------------------------</span>
                </article>
                <Link to={"/"} className="item-view" role="button">
                  <span>------------</span>
                </Link>
              </div>
              <div className="list-item">
                <img src={imgtool} alt="anh" />
                <article className="item-info">
                  <h3 className="item-name">----------------------------</h3>
                  <p className="item-info">----------------------------</p>
                  <p className="item-info">----------------------------</p>
                  <span className="">----------------------------</span>
                </article>
                <Link to={"/"} className="item-view" role="button">
                  <span>------------</span>
                </Link>
              </div>
              <div className="list-item">
                <img src={imgtool} alt="anh" />
                <article className="item-info">
                  <h3 className="item-name">----------------------------</h3>
                  <p className="item-info">----------------------------</p>
                  <p className="item-info">----------------------------</p>
                  <span className="">----------------------------</span>
                </article>
                <Link to={"/"} className="item-view" role="button">
                  <span>------------</span>
                </Link>
              </div>
              <div className="list-item">
                <img src={imgtool} alt="anh" />
                <article className="item-info">
                  <h3 className="item-name">----------------------------</h3>
                  <p className="item-info">----------------------------</p>
                  <p className="item-info">----------------------------</p>
                  <span className="">----------------------------</span>
                </article>
                <Link to={"/"} className="item-view" role="button">
                  <span>------------</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
export default Main;
