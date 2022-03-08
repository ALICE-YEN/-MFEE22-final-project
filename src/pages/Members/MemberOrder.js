import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../utils/config';
import './Member.scss';
import { useAuth } from '../../context/auth';
import titleImgMember from '../../data/images/greenwave64x24.png';
import Swal from 'sweetalert2';

const MemberOrder = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { auth, setAuth } = useAuth();
  const [pages, setPages] = useState([]);
  const [updatedOrderId, setUpdatedOrderId] = useState('');
  const [updatedOrderStatus, setUpdatedOrderStatus] = useState('');

  // 為了處理網址
  let navigate = useNavigate();

  async function handleDelete(order_id) {
    const { isConfirmed } = await Swal.fire({
      title: '您確定要刪除訂單紀錄嗎?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff7f6a',
      cancelButtonColor: '#17a8a2',
      cancelButtonText: '取消',
      confirmButtonText: '確定',
    });
    if (!isConfirmed) {
      return;
    }
    let response = await axios.post(
      `${API_URL}/member/member-order/${order_id}/delete`
    );
    console.log(response.data);
    if (response.data.isDeleted) {
      setData(data.filter((order) => order.id !== order_id));
    }
  }

  async function getMemberOrderList(page = 1) {
    let response = await axios.get(
      `${API_URL}/member/member-order/${auth.member_id}?page=${page}`
    );
    let orders = [];
    response.data.data.forEach(function (orderData) {
      orders.push(orderData);
    });

    setData([]);
    setData(orders);
    setPages(response.data.pagination.pages);
    console.log('orders', orders);
  }

  setInterval(() => {
    if (updatedOrderId !== localStorage.getItem('updatedOrderId')) {
      setUpdatedOrderId(localStorage.getItem('updatedOrderId'));
    }
    if (updatedOrderStatus !== localStorage.getItem('updatedOrderStatus')) {
      setUpdatedOrderStatus(localStorage.getItem('updatedOrderStatus'));
    }
  }, 500);

  function changePage(page) {
    setCurrentPage(page);
    getMemberOrderList(page);
  }

  useEffect(() => {
    getMemberOrderList();
  }, []);
  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row d-flex justify-content-center">
          <h2 className="mb-5 titleMember text-center">
            <span className="me-2">
              <img src={titleImgMember} className="titleImgMember" />
            </span>
            訂單紀錄
          </h2>
          <div className="d-flex mt-3">
            <h3 className="fs-20Member">訂單查詢</h3>
          </div>
          <div className="orderTableWrapMember mb-3">
            {/* <table className="table table-control align-middle text-center"> */}
            <Table
              responsive
              hover
              className="table table-control align-middle text-center tableMemberOrderDetails"
            >
              <thead>
                <tr>
                  <th></th>
                  <th className="fs-20Member text-nowrap">訂單號碼</th>
                  <th
                    className="fs-20Member text-nowrap"
                    style={{ minWidth: '120px' }}
                  >
                    訂單日期
                  </th>
                  <th className="fs-20Member text-nowrap">合計</th>
                  <th className="fs-20Member text-nowrap">訂單狀態</th>
                </tr>
              </thead>
              <tbody>
                {data.map((order_list) => {
                  return (
                    <tr key={order_list.order_time}>
                      <td className="text-nowrap">
                        <Link
                          to={`/member/member-order/${order_list.id}`}
                          className="deepblue me-3"
                          target="_blank"
                        >
                          <i className="fas fa-external-link-alt"></i>
                        </Link>
                        <span
                          className="deleteIconMember orange"
                          onClick={() => {
                            handleDelete(order_list.id);
                          }}
                          // onClick={() => {
                          //   if (order_list.valid !== 2) {
                          //     handleDelete(order_list.id);
                          //   }
                          // }}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </span>
                      </td>
                      <td>{order_list.id}</td>
                      <td>{order_list.order_time}</td>
                      <td>{order_list.amount}</td>
                      <td
                        className={`prepareColorMember ${
                          order_list.memberStatus === '訂單已完成'
                            ? 'black'
                            : ''
                        }`}
                      >
                        {/* {order_list.status} */}
                        {updatedOrderId == order_list.id
                          ? updatedOrderStatus
                          : order_list.status}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              {/* </table> */}
            </Table>
          </div>
          <nav aria-label="pageMember">
            <ul className="d-flex justify-content-center mt-5">
              <li class="page-item">
                <a
                  class="page-link"
                  onClick={() => changePage(1)}
                  href="#/"
                  aria-label="Next"
                >
                  <span aria-hidden="true">&laquo;</span>
                  <span class="sr-only">Previous</span>
                </a>
              </li>
              {Array.from(Array(pages).keys()).map((p) => {
                return (
                  <li className="page-item">
                    <a
                      className={
                        currentPage === p + 1
                          ? 'active page-link pageLinkMember'
                          : 'page-link pageLinkMember'
                      }
                      onClick={() => changePage(p + 1)}
                      href="#/"
                    >
                      {p + 1}
                    </a>
                  </li>
                );
              })}
              <li class="page-item">
                <a
                  class="page-link"
                  href="#/"
                  aria-label="Next"
                  onClick={() => changePage(pages)}
                >
                  <span aria-hidden="true">&raquo;</span>
                  <span class="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default MemberOrder;
