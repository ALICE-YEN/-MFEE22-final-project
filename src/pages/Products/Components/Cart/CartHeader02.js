// CartHeader02.js 內容說明：購物車三步驟的進度條

import React from 'react';
import greenTitle from '../../../../data/images/greenTitle.svg';

function CartHeader02(props) {
  return (
    <>
      <header className="rwdMargin5 py-2 rwdPaddingX5">
        <div className="text-secondary fw-bold h1 text-center mb-5">
          <img
            src={greenTitle}
            className="greenTitle me-3"
            alt="greenTitle"
            height="24px"
            width="64px"
          />
          衝浪商品購物車
        </div>
        <div className="row">
          <div className="cartHeaderTotal">
            <div className="col-lg-3 d-flex align-items-center shadow py-2 cartStepsSigns borderRadius">
              <div className="fs-1 carHeader20 text-center">01</div>
              <div className="carHeader80">
                確認清單 & 付款及配送方式
                <br />
                Cart & Check out
              </div>
            </div>
            <div className="col-lg-3 d-flex align-items-center shadow py-2 cartStepsSignsOrange borderRadius">
              <div className="fs-1 carHeader20 text-center">02</div>
              <div className="carHeader80">
                填寫訂購資料
                <br />
                Shipping & Billing Info
              </div>
            </div>
            <div className="col-lg-3 d-flex align-items-center shadow py-2 cartStepsSigns borderRadius">
              <div className="fs-1 carHeader20 text-center">03</div>
              <div className="carHeader80">
                購物完成！
                <br />
                Order completed
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default CartHeader02;
