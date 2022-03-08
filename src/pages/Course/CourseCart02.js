import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Container, Row, Col } from 'react-bootstrap';

import { API_URL } from '../../utils/config';

import Swal from 'sweetalert2';

import { useAuth } from '../../context/auth';

import CreditCard from './components/CreditCard';
import './components/CreditCard.css';
import './CourseCart.scss';

function CourseCart02(props) {
  const { step, setStep } = props;
  const { auth, setAuth } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sex, setSex] = useState('');
  const sexOptions = ['男', '女'];
  const [note, setNote] = useState('');
  const [phone, setPhone] = useState('');
  const [payMethod, setPayMethod] = useState({
    choosePay: '',
  });

  // 表單返回保留付款狀態
  useEffect(() => {
    const Method = localStorage.getItem('payMethod');
    // console.log(payMethod, Method);
    if (payMethod.choosePay !== Method) {
      setPayMethod({ choosePay: JSON.parse(Method) });
    }
  }, []);

  // 取得會員名稱給表單資料

  useEffect(() => {
    if (auth !== null) {
      setName(auth.member_name);
      setEmail(auth.member_email);
      setPhone(auth.member_phone);
      setSex(auth.member_gender);
    }
  });

  // 送出資料存進資料庫
  async function handleSubmit(e) {
    e.preventDefault();

    if (!payMethod.choosePay) {
      Swal.fire('請選擇付款方式');
      setStep({ ...step, step1: '', step2: true });
    } else {
      let info = [
        {
          name: name,
          // pid: pid,
          email: email,
          sex: sex,
          note: note,
          // bdDay: bdDay,
          phone: phone,
        },
      ];

      let courseOrder = [
        {
          course: JSON.parse(localStorage.getItem('course')),
          courseTime: JSON.parse(localStorage.getItem('courseTime')),
          courseSpot: JSON.parse(localStorage.getItem('courseSpot')),
          courseDate: JSON.parse(localStorage.getItem('courseDate')),
          coursePrice: localStorage.getItem('coursePrice'),
          amount: localStorage.getItem('amount'),
          peopleNum: localStorage.getItem('peopleNum'),
          payMethod: JSON.parse(localStorage.getItem('payMethod')),
        },
        ...info,
      ];
      console.log(courseOrder);

      //把課程資料撈出跟個人資料一起存進資料庫
      try {
        let response = await axios.post(
          `${API_URL}/course/courseOrder`,
          courseOrder
        );
        console.log('有沒有送訂單', response.data);
      } catch (e) {
        console.error('error', e.response.data);
      }

      //報名完清除暫存
      // window.alert('你已報名完成');
      localStorage.removeItem('course');
      localStorage.removeItem('courseSpot');
      localStorage.removeItem('courseDate');
      localStorage.removeItem('courseTime');
      localStorage.removeItem('coursePrice');
      localStorage.removeItem('amount');
      localStorage.removeItem('count');
      localStorage.removeItem('payMethod');
      setStep({ ...step, step2: '', step3: true });
    }
  }
  return (
    <>
      {/* 明細電腦版樣式*/}
      <div className="courseDetail">
        <p className="h3">衝浪課程</p>
        <table className="table table-borderless border-bottom border-1 border-dark">
          <thead className="bg-light text-center">
            <tr>
              <th scope="col">名稱</th>
              <th scope="col">時段</th>
              <th scope="col">地點</th>
              <th scope="col">單價</th>
              <th scope="col">人數</th>
              <th scope="col">小計</th>
              <th scope="col">預約日期</th>
            </tr>
          </thead>

          <tbody className="text-center">
            <tr>
              <td>{JSON.parse(localStorage.getItem('course'))}</td>
              <td>{JSON.parse(localStorage.getItem('courseTime'))}</td>
              <td>{JSON.parse(localStorage.getItem('courseSpot'))}</td>
              <td>
                {Number(localStorage.getItem('coursePrice')).toLocaleString()}
              </td>
              <td>{localStorage.getItem('peopleNum')}</td>
              <td>
                {' '}
                {Number(localStorage.getItem('amount')).toLocaleString()}
              </td>
              <td>{JSON.parse(localStorage.getItem('courseDate'))}</td>
            </tr>
          </tbody>
        </table>

        {/* <總計  */}

        <div className="d-flex flex-column">
          <p className="align-self-end">
            金額計算: NT{' '}
            {Number(localStorage.getItem('amount')).toLocaleString()}
          </p>
          <p className="h3 align-self-end ">
            訂單總金額: NT{' '}
            {Number(localStorage.getItem('amount')).toLocaleString()}
          </p>
        </div>

        {/* 付款方式 */}
        <div className="row d-flex mb-5">
          <div className="col-sm-12 col-md-2 ">
            <p className=" h3 me-3 align-self-center">付款方式</p>
          </div>

          {/* 信用卡/匯款/現金按鈕 */}
          <div className="col-sm-12 col-md-10 ">
            <nav aria-label="..." className=" align-self-center">
              <ul className="pagination pagination-sm">
                <li className="payItem" aria-current="page">
                  <a
                    id="creditCard"
                    className={
                      payMethod.choosePay === '信用卡'
                        ? 'pay-link-on'
                        : 'pay-link-off'
                    }
                    href="#/"
                    onClick={() => {
                      setPayMethod({ choosePay: '信用卡' });
                      localStorage.setItem(
                        'payMethod',
                        JSON.stringify('信用卡')
                      );
                    }}
                  >
                    信用卡
                  </a>
                </li>
                <li className="payItem">
                  <a
                    id="transfor"
                    className={
                      payMethod.choosePay === '匯款'
                        ? 'pay-link-on'
                        : 'pay-link-off'
                    }
                    href="#/"
                    onClick={() => {
                      setPayMethod({ choosePay: '匯款' });
                      localStorage.setItem('payMethod', JSON.stringify('匯款'));
                    }}
                  >
                    匯款
                  </a>
                </li>
                <li className="payItem">
                  <a
                    id="cash"
                    className={
                      payMethod.choosePay === '現金'
                        ? 'pay-link-on'
                        : 'pay-link-off'
                    }
                    href="#/"
                    onClick={() => {
                      setPayMethod({ choosePay: '現金' });
                      localStorage.setItem('payMethod', JSON.stringify('現金'));
                    }}
                  >
                    現金
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* 顯示信用卡資訊內容 */}
          {JSON.parse(localStorage.getItem('payMethod')) === '信用卡' ? (
            <div
              className="col-sm-12 col-md-10 border border-1 border-dark p-3 rounded 
            "
            >
              <CreditCard />
            </div>
          ) : (
            ''
          )}

          {/* 顯示匯款(轉帳)資訊內容 */}
          {JSON.parse(localStorage.getItem('payMethod')) === '匯款' ? (
            <div className="col-sm-12 col-md-10 border border-1 border-dark p-3 rounded">
              <p className="h3 text-primary">請在備註欄備註您的匯款帳號後5碼</p>
              <Container>
                <Row>
                  <p className="">銀行:國泰世華銀行-中壢分行</p>
                  <p className="">銀行代碼:013</p>
                  <p className="">帳號:0081-553-785026</p>
                  <p className="">戶名:王大浪</p>
                </Row>
              </Container>
            </div>
          ) : (
            ''
          )}

          {/* 顯示現金資訊內容 */}
          {JSON.parse(localStorage.getItem('payMethod')) === '現金' ? (
            <div className="col-sm-12 col-md-10 border border-1 border-dark p-3 rounded">
              <p className="h3 text-primary">您選擇當日現金付款</p>
              <Container>
                <Row>
                  <p className="">可收振興五倍券</p>
                  <p className="">振興消費．千元Fun送衝浪好禮</p>
                </Row>
              </Container>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>

      {/* 明細手機版樣式 */}
      <div className="mobile col-9 m-auto">
        <p className="h3">衝浪課程</p>
        <div className="row border  text-center">
          <p>課程名稱:{JSON.parse(localStorage.getItem('course'))}</p>
          <p>預約日期:{JSON.parse(localStorage.getItem('courseDate'))}</p>
          <p>上課地點:{JSON.parse(localStorage.getItem('courseSpot'))}</p>
          <p>上課時段:{JSON.parse(localStorage.getItem('courseTime'))}</p>
          <p>人數:{JSON.parse(localStorage.getItem('peopleNum'))}</p>
          <p>單價:NT{JSON.parse(localStorage.getItem('coursePrice'))}</p>
        </div>

        {/* <總計  */}
        <div className="d-flex flex-column border-bottom">
          <p className="align-self-end">
            金額計算: NT{localStorage.getItem('amount')}{' '}
          </p>
          <p className="h3 align-self-end">
            訂單總金額: NT{localStorage.getItem('amount')}{' '}
          </p>
        </div>

        {/* 付款方式 */}
        <div className="row  d-flex justify-content-center border-1 border-dark mb-5">
          <p className=" h3">付款方式</p>

          <nav aria-label="...">
            <ul className="pagination pagination-sm">
              <li className="payItem " aria-current="page">
                <a
                  className={
                    payMethod.choosePay === '信用卡'
                      ? 'pay-link-on'
                      : 'pay-link-off'
                  }
                  href="#/"
                  onClick={() => {
                    setPayMethod({ choosePay: '信用卡' });
                    localStorage.setItem('payMethod', JSON.stringify('信用卡'));
                  }}
                >
                  信用卡
                </a>
              </li>
              <li className="payItem">
                <a
                  className={
                    payMethod.choosePay === '匯款'
                      ? 'pay-link-on'
                      : 'pay-link-off'
                  }
                  href="#/"
                  onClick={() => {
                    setPayMethod({ choosePay: '匯款' });
                    localStorage.setItem('payMethod', JSON.stringify('匯款'));
                  }}
                >
                  匯款
                </a>
              </li>
              <li className="payItem">
                <a
                  className={
                    payMethod.choosePay === '現金'
                      ? 'pay-link-on'
                      : 'pay-link-off'
                  }
                  href="#/"
                  onClick={() => {
                    setPayMethod({ choosePay: '現金' });
                    localStorage.setItem('payMethod', JSON.stringify('現金'));
                  }}
                >
                  現金
                </a>
              </li>
            </ul>
          </nav>

          {/* 顯示信用卡資訊內容 */}
          {JSON.parse(localStorage.getItem('payMethod')) === '信用卡' ? (
            <div
              className="border border-1 border-dark p-3 rounded 
            "
            >
              <CreditCard />
            </div>
          ) : (
            ''
          )}

          {/* 顯示匯款(轉帳)資訊內容 */}
          {JSON.parse(localStorage.getItem('payMethod')) === '匯款' ? (
            <div className=" border border-1 border-dark p-3 rounded">
              <p className=" text-primary">請在備註欄備註您的匯款帳號後5碼</p>
              <Container>
                <Row>
                  <p className="">銀行:國泰世華銀行-中壢分行</p>
                  <p className="">銀行代碼:013</p>
                  <p className="">帳號:0081-553-785026</p>
                  <p className="">戶名:王大浪</p>
                </Row>
              </Container>
            </div>
          ) : (
            ''
          )}

          {/* 顯示現金資訊內容 */}
          {JSON.parse(localStorage.getItem('payMethod')) === '現金' ? (
            <div className=" border border-1 border-dark p-3 rounded">
              <p className=" text-primary">您選擇當日現金付款</p>
              <Container>
                <Row>
                  <p className="">可收振興五倍券</p>
                  <p className="">振興消費．千元Fun送衝浪好禮</p>
                </Row>
              </Container>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>

      {/* 個人資訊表單 */}
      <div className="col-10 m-auto">
        <div className="p-3 infoForm shadow-lg">
          <h1 className="text-center text-secondary">請填寫課程報名資訊</h1>
          <form className="col-8 m-auto" onSubmit={handleSubmit}>
            <div className="py-2 mt-3">
              <label>* 姓名</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="姓名"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </div>

            <label className="p-2 ">* 性別:</label>
            <div className="align-items-center d-flex">
              {sexOptions.map((v, i) => {
                return (
                  <div key={i}>
                    <div className="form-check form-check-inline ">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="1"
                        id="1"
                        value={v}
                        checked={v === sex}
                        onChange={(e) => {
                          setSex(e.target.value);
                        }}
                        required
                      />
                      <label className="form-check-label" htmlFor={v}>
                        {v}
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="py-2 mt-3">
              <label>* 信箱</label>
              <input
                className="form-control"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>

            <div className="py-2">
              <label>* 電話</label>
              <input
                maxLength="11"
                // pattern="09\d{2}-\d{6}"
                type="text"
                className="form-control"
                id="phone"
                // placeholder="手機號碼(格式:09xx-xxxxxx)"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                required
              />
            </div>
            <div className="py-2">
              <label>備註</label>
              <textarea
                type="textarea"
                className="form-control"
                id=""
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                }}
              />
            </div>

            <div className="">
              <button
                className="btn btn-secondary text-white mb-3 sendFormBtn"
                onClick={() => {
                  setStep({ ...step, step1: true, step2: '' });
                }}
              >
                返回，修改訂單
              </button>
              <button
                type="submit"
                className="btn btn-primary text-white mb-3 sendFormBtn"
              >
                確認完成，送出資料
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CourseCart02;
