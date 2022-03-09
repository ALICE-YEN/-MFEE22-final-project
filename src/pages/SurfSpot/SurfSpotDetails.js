import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/config';
import { Row, Col } from 'react-bootstrap';
import 'animate.css';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-tw';

// react-icons
import { FaLocationArrow } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import './surfSpotDetails.scss';

function SurfSpotDetails(props) {
  const { showSurfSpotDetails, setshowSurfSpotDetails, spotId } = props;
  const [data, setData] = useState([]);
  const [info, setInfo] = useState([]);
  const surfSpotDetailsRef = useRef();
  const closeshowSurfSpotDetails = (e) => {
    if (surfSpotDetailsRef.current === e.target) {
      setshowSurfSpotDetails(false);
    }
  };

  useEffect(() => {
    let getSurfspot = async () => {
      // http://localhost:3002/api/
      let response = await axios.get(`${API_URL}/surfspot/content`);
      // console.log('response', response.data);
      let findspotContent = response.data.filter((v) => {
        return v.id === spotId;
      });
      console.log(findspotContent);

      if (!findspotContent) {
        setData(response.data);
      } else {
        setData(findspotContent);
      }

      // console.log(response.data);
    };
    getSurfspot();
  }, [spotId]);

  useEffect(() => {
    let getInfo = async () => {
      let response = await axios.get(`${API_URL}/surfspot/wave-info`);
      let findSpotInfo = response.data.filter((v) => {
        return v.id === spotId;
      });
      console.log(findSpotInfo);
      if (!findSpotInfo) {
        setInfo(response.data);
      } else {
        setInfo(findSpotInfo);
      }
    };
    getInfo();
  }, [spotId]);

  dayjs.locale('zh-tw');
  const now = dayjs(new Date()).format('YYYY/MM/DD 星期dd HH:mm');
  return (
    <>
      {showSurfSpotDetails ? (
        <div
          className="container-fluid animate__animated animate__fadeIn animate__faster taiwanMapBgBlack"
          onClick={closeshowSurfSpotDetails}
          ref={surfSpotDetailsRef}
        >
          <div className="container d-flex justify-content-center">
            <div className="spotDetailWrap" style={{ width: '80%' }}>
              <div className="spotDetailWrapBlack">
                <div
                  className="d-flex justify-content-end spotDetailCross"
                  onClick={() => {
                    setshowSurfSpotDetails((prev) => !prev);
                  }}
                >
                  <ImCross className="cross" />
                </div>
                <div className="row gx-0">
                  {data.map((surfspot, i) => {
                    return (
                      <div
                        key={surfspot.id}
                        className="col-md-6 col-sm-12 col-8 ms-5 pt-5"
                      >
                        <p className="text-primary mb-2">
                          {surfspot.city} {surfspot.country}
                        </p>
                        <h1 className="fw-bold">{surfspot.name}</h1>
                        <p className="my-4">{surfspot.description}</p>
                        <Row className="spotType">
                          <Col className="border-end">
                            <Row className="d-flex justify-content-center text-dark fw-bold mb-2">
                              類型
                            </Row>
                            <Row className="d-flex justify-content-center">
                              {surfspot.type}
                            </Row>
                          </Col>
                          <Col className="border-end">
                            <Row className="d-flex justify-content-center text-dark fw-bold mb-2">
                              海床
                            </Row>
                            <Row className="d-flex justify-content-center">
                              {surfspot.seafloor}
                            </Row>
                          </Col>
                          <Col>
                            <Row className="d-flex justify-content-center text-dark fw-bold mb-2">
                              適合程度
                            </Row>
                            <Row className="d-flex justify-content-center">
                              {surfspot.level}
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    );
                  })}
                  {info.map((information, i) => {
                    return (
                      <div
                        key={information.id}
                        className="col-md-5 col-sm-12 py-5"
                      >
                        <div className="mx-4 mb-2 fw-bold d-flex justify-content-start black">
                          {now}
                        </div>
                        <div className="spotInfo p-4 mx-4">
                          <Row className="mb-3">
                            <Col className="text-center text-dark fw-bold">
                              風級
                            </Col>
                            <Col className="text-center text-dark fw-bold">
                              風向
                            </Col>
                            <Col className="text-center text-dark fw-bold">
                              風速
                            </Col>
                          </Row>
                          <Row className="mb-4 pb-3 border-bottom">
                            <Col className="align-items-center text-center">
                              {information.windScale}
                            </Col>
                            <Col className="text-center">
                              <FaLocationArrow
                                size={20}
                                color="#17a8a2"
                                className={`mb-2 ${information.windDirection}`}
                              />
                            </Col>
                            <Col className="text-center">
                              {information.windSpeed}m/s
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col className="text-center text-dark fw-bold">
                              氣溫
                            </Col>
                            <Col className="text-center text-dark fw-bold">
                              海溫
                            </Col>
                            <Col className="text-center text-dark fw-bold">
                              UV
                            </Col>
                          </Row>
                          <Row className="mb-4 pb-3 border-bottom">
                            <Col className="text-center">
                              {information.temperature}°C
                            </Col>
                            <Col className="text-center">
                              {information.seaTemperature}°C
                            </Col>
                            <Col className="text-center">{information.uv}</Col>
                          </Row>
                          <Row className="mb-3">
                            <Col className="text-center text-dark fw-bold">
                              乾潮
                            </Col>
                            <Col className="text-center text-dark fw-bold">
                              滿潮
                            </Col>
                            <Col className="text-center text-dark fw-bold">
                              日落
                            </Col>
                          </Row>
                          <Row className="mb-2">
                            <Col className="text-center detailPadding">
                              {information.dryTime1}
                              <br />
                              {information.dryTime2}
                            </Col>
                            <Col className="text-center detailPadding">
                              {information.fullTime1}
                              <br />
                              {information.fullTime2}
                            </Col>
                            <Col className="text-center mt-2 detailPadding">
                              {information.sunsetTime}
                            </Col>
                          </Row>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default SurfSpotDetails;
