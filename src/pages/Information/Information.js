import React from 'react';
import "./Information.scss";
import { useState, useEffect } from "react";
import { Carousel, Tabs, Tab, Sonnet } from 'react-bootstrap';

import greenTitle from '../../data/images/greenTitle.svg';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { BsFillArrowDownCircleFill } from 'react-icons/bs';


// 撈資料引入
import axios from 'axios';
import { API_URL } from '../../utils/config';
import { IMAGE_URL } from '../../utils/config';
import { useParams, useNavigate, Link } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';
import onClick from 'react-bootstrap/PageItem';
import PageItem from 'react-bootstrap/PageItem';

// 修日期dayjs套件引入
import dayjs from 'dayjs';
import 'dayjs/locale/zh-tw';


function Information() {
    // 使用useNavigate
    let navigate = useNavigate();

    // 初始化狀態
    // 全部文章分頁
    const [nowPage, setNowPage] = useState(1);

    // 處理分類一文章分頁
    const [catOneNowPage, setCatOneNowPage] = useState(1);

    // 處理分類二文章分頁
    const [catTwoNowPage, setCatTwoNowPage] = useState(1);

    // 總共有幾頁
    // 全部文章分頁
    const [allLastPage, setAllLastPage] = useState(1);
    // 分類一文章分頁
    const [catOneLastPage, setCatOneLastPage] = useState(1);
    // 分類二文章分頁
    const [catTwoLastPage, setCatTwoLastPage] = useState(1);

    // Carousel狀態
    const [index, setIndex] = useState(0);
    // Carousel使用function宣告
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    // Carousel資料狀態
    const [caroData, setCaroData] = useState([]);

    // Tabs狀態
    const [key, setKey] = useState("allCat");

    // spinner狀態
    const [isLoading, setIsLoading] = useState(false);

    // 全部資料狀態
    const [allInfo, setAllInfo] = useState([]);
    const [displayInfo, setDisplayInfo] = useState([]);

    // 分類1資料狀態
    const [catOneInfo, setCatOneInfo] = useState([]);

    // 分類2資料狀態
    const [catTwoInfo, setCatTwoInfo] = useState([]);
    
    // 全部文章搜尋狀態
    const [searchWord, setSearchWord] = useState("");

    // 分類一文章搜尋狀態
    const [catOneSearchWord, setCatOneSearchWord] = useState("");

    // 分類二文章搜尋狀態
    const [catTwoSearchWord, setCatTwoSearchWord] = useState("");

    // function
    // 全部文章搜尋
    function handleAllSearch(e) { 
        
        e.preventDefault();
        setSearchWord(e.target.value);

        // console.log("e內容:" + e);
    }

    // 分類一文章搜尋
    function handleCatOneSearch(e) { 
        
        e.preventDefault();
        setCatOneSearchWord(e.target.value);

        // console.log("e內容:" + e);

    }

    // 分類二文章搜尋
    function handleCatTwoSearch(e) { 
        
        e.preventDefault();
        setCatTwoSearchWord(e.target.value);

        // console.log("e內容:" + e);

    }
    
    // 全部文章分頁pagination-function
    function getAllPageList() { 
        let pageList = [];
        for (let i = 1; i <= allLastPage; i++){
            pageList.push(
            <div key={i}>
                {nowPage === i ? <Pagination.Item key={i} onClick={(e) => setNowPage(i)} active>{i}</Pagination.Item> : <Pagination.Item key={i} onClick={(e) => setNowPage(i)}>{i}</Pagination.Item>}               
            </div> 
            );
        }
        return pageList;
    }

    // 分類一文章分頁pagination-function
    function getCatOnePageList() { 
        let pageList = [];
        for (let i = 1; i <= catOneLastPage; i++){
            pageList.push(
            <div key={i}>
                {catOneNowPage === i ? <Pagination.Item key={i} onClick={(e) => setCatOneNowPage(i)} active>{i}</Pagination.Item> : <Pagination.Item key={i} onClick={(e) => setCatOneNowPage(i)}>{i}</Pagination.Item>}               
            </div> 
            );
        }
        return pageList;
    }

    // 分類二文章分頁pagination-function
    function getCatTwoPageList() { 
        let pageList = [];
        for (let i = 1; i <= catTwoLastPage; i++){
            pageList.push(
            <div key={i}>
                {catTwoNowPage === i ? <Pagination.Item key={i} onClick={(e) => setCatTwoNowPage(i)} active>{i}</Pagination.Item> : <Pagination.Item key={i} onClick={(e) => setCatTwoNowPage(i)}>{i}</Pagination.Item>}               
            </div> 
            );
        }
        return pageList;
    }

    // 處理日期函式
    function dateAdjust(date) {
        dayjs.locale('zh-tw');
        let newDate = dayjs(date).format('YYYY-MM-DD');
        return newDate;
    }



    // useEffect
    // Carosel用資料抓取
    useEffect(() => {

            let getCaroInfo = async () => {
                // 模擬和伺服器要資料
                let response = await axios.get(`${API_URL}/information/caro`);
                //看看response抓到什麼
                // console.log(response);
                // 最後設定到狀態中
                setCaroData(response.data);
            };
            getCaroInfo();
    }, []);
    
    // 全部資料
    useEffect(() => {

        if (searchWord === "") {

            let getAllInfo = async () => {
                // 模擬和伺服器要資料
                let response = await axios.get(`${API_URL}/information?page=${nowPage}`); // pagination
                //看看response抓到什麼
                // console.log(response);
                // 最後設定到狀態中
                setAllInfo(response.data.pageData);
                setAllLastPage(response.data.pagination.lastPage);
                setDisplayInfo(response.data.pageData);

            };
            getAllInfo();
        }  // if
        else {
            let allSearch = async() => {
                try {
                    let response = await axios.post(
                        `${API_URL}/information/all-search`,
                        {searchWord, nowPage}
                    );
                    
                    // console.log("有沒有送搜尋關鍵字到後端", response.data);

                    setAllInfo(response.data.pageData);
                    setAllLastPage(response.data.pagination.lastPage);
                    setDisplayInfo(response.data.pageData);
                } catch (e) {
                    console.error("error", e.response.data);
                }
            }
            allSearch();
        }  // else

    }, [searchWord, nowPage]);

    // 分類1資料
    useEffect(() => {
        // 先開起載入指示器
        setIsLoading(true);

        if (catOneSearchWord === "") {
            let getCatOneInfo = async () => {
                // 模擬和伺服器要資料
                let response = await axios.get(`${API_URL}/information/cat-one?page=${catOneNowPage}`);
                //看看response抓到什麼
                // console.log(response);
                // 最後設定到狀態中
                setCatOneInfo(response.data.pageData);
                setCatOneLastPage(response.data.pagination.lastPage);
            };
            getCatOneInfo();
        }  // if
        else {
            let catOneSearch = async() => {
                try {
                    let response = await axios.post(
                        `${API_URL}/information/cat-one-search`,
                        {catOneSearchWord, catOneNowPage}
                    );
                    
                    // console.log("有沒有送搜尋關鍵字到後端", response.data);

                    setCatOneInfo(response.data.pageData);
                    setCatOneLastPage(response.data.pagination.lastPage);
                } catch (e) {
                    console.error("error", e.response.data);
                }
            }
            catOneSearch();
        }  // else
    }, [catOneSearchWord, catOneNowPage]);

    // 分類2資料
    useEffect(() => {

        if (catTwoSearchWord === "") {
            let getCatTwoInfo = async () => {
                // 模擬和伺服器要資料
                let response = await axios.get(`${API_URL}/information/cat-two?page=${catTwoNowPage}`);
                //看看response抓到什麼
                // console.log(response);
                // 最後設定到狀態中
                setCatTwoInfo(response.data.pageData);
                setCatTwoLastPage(response.data.pagination.lastPage)
            };
            getCatTwoInfo();    
        }  // if
        else {
            let catTwoSearch = async() => {
                try {
                    let response = await axios.post(
                        `${API_URL}/information/cat-two-search`,
                        {catTwoSearchWord, catTwoNowPage}
                    );
                    
                    // console.log("有沒有送搜尋關鍵字到後端", response.data);

                    setCatTwoInfo(response.data.pageData);
                    setCatTwoLastPage(response.data.pagination.lastPage);
                } catch (e) {
                    console.error("error", e.response.data);
                }
            }
            catTwoSearch();
        }  // else
        
    }, [catTwoSearchWord, catTwoNowPage]);



    return (
    <>   

        {/* <div>
            <h3>麵包屑</h3>
        </div> */}
        {/* 輪播部分 */}
        {/* <div className="container-fluid caroBoxInfo">
            <div className="row">
                <div className="col-12"> */}

                    {caroData.map( (caroDataItem, i) => {
                    return (
                    <React.Fragment key={i}>
                    
                    <Carousel activeIndex={index} onSelect={handleSelect}>
                        <Carousel.Item  className="">
                            <div className="">
                                <img
                                className="d-block w-100"
                                src={`${IMAGE_URL}/information/${caroDataItem.big_imgA}`}
                                alt="First slide"
                                />
                            </div>
                            <Carousel.Caption  className="">
                                <div className="d-flex flex-column align-items-start text-start mb-4">
                                    <span className="badge bg-dark h6">{caroDataItem.info_catA}</span>
                                    <a className="h1 white caroAInfo" href="" onClick={()=> navigate(`/information/${caroDataItem.info_noA}`)}>{caroDataItem.big_titleA}
                                    </a>
                                    <h6 className="caroADate">{dateAdjust(caroDataItem.create_timeA)} {caroDataItem.authorA}</h6>
                                </div>
                                <div className="d-flex flex-column align-items-center mb-4 downBtnInfoPC">
                                    <a href="#contentSectionInfo" className="pt-3">
                                        <BsFillArrowDownCircleFill 
                                            className="arrowDownInfo me-2"
                                            size={40}
                                            color="#ff7f6a"
                                        />
                                    </a>
                                </div>
                            </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src={`${IMAGE_URL}/information/${caroDataItem.big_imgB}`}
                                alt="Second slide"
                                />
                                <Carousel.Caption  className="">
                                    <div className="d-flex flex-column align-items-start text-start mb-4">
                                        <span className="badge bg-dark h6">{caroDataItem.info_catB}</span>
                                        <a className="h1 white caroAInfo" href="" onClick={()=> navigate(`/information/${caroDataItem.info_noB}`)}>{caroDataItem.big_titleB}
                                        </a>
                                        <h6 className="caroADate">{dateAdjust(caroDataItem.create_timeB)} {caroDataItem.authorB}</h6>
                                    </div>
                                    <div className="d-flex flex-column align-items-center mb-4 downBtnInfoPC">
                                        <a href="#contentSectionInfo" className="pt-3">
                                            <BsFillArrowDownCircleFill 
                                                className="arrowDownInfo me-2"
                                                size={40}
                                                color="#ff7f6a"
                                            />
                                        </a>
                                    </div>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src={`${IMAGE_URL}/information/${caroDataItem.big_imgC}`}
                                alt="Third slide"
                                />
                                <Carousel.Caption  className="">
                                    <div className="d-flex flex-column align-items-start text-start mb-4">
                                        <span className="badge bg-dark h6">{caroDataItem.info_catC}</span>
                                        <a className="h1 white caroAInfo" href="" onClick={()=> navigate(`/information/${caroDataItem.info_noC}`)}>{caroDataItem.big_titleC}
                                        </a>
                                        <h6 className="caroADate">{dateAdjust(caroDataItem.create_timeC)} {caroDataItem.authorC}</h6>
                                    </div>
                                    <div className="d-flex flex-column align-items-center mb-4 downBtnInfoPC">
                                        <a href="#contentSectionInfo" className="pt-3">
                                            <BsFillArrowDownCircleFill 
                                                className="arrowDownInfo me-2"
                                                size={40}
                                                color="#ff7f6a"
                                            />
                                        </a>
                                    </div>
                                </Carousel.Caption>
                            </Carousel.Item>
                    </Carousel>

                    </React.Fragment>
                    )
                    })}

                {/* </div> */}
                 {/* col */}
            {/* </div> */}
            {/* row */}
        {/* </div> */}
        {/* container-fluid */}

        {/* <a href="#contentSectionInfo">
            <BsFillArrowDownCircleFill 
                className="arrowDownInfo me-2"
                size={20}
                color="#a0a7ac"
            />
        </a> */}

        {/* 輪播部分以下 */}
        <div id="contentSectionInfo" className="container contentSectionInfo pt-5">
            {/* <div className="row"></div> */}
            <div className="row">
                <div className="col-12">

                <div className="">
                <Tabs
                    // className="" // 沒作用
                    id="controlled-tab-info"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                    >
                    <Tab className="" eventKey="allCat" title="全部文章">
                        {/* <Sonnet /> */}
                        <div className="d-flex justify-content-end">
                                    <input
                                    type="text"
                                    placeholder="  🔍  以關鍵字搜尋"
                                    className="searchInfoPC form-control mt-1 rounded-pill w-25 text-muted"
                                    value={searchWord}
                                    onChange={(e) => handleAllSearch(e)}
                                    />
                            {/* </form> */}
                        </div>
                        <div className="d-flex justify-content-center pt-3">
                                    <input
                                    type="text"
                                    placeholder="  🔍  以關鍵字搜尋"
                                    className="searchInfoMO form-control mt-1 rounded-pill w-50 text-muted"
                                    value={searchWord}
                                    onChange={(e) => handleAllSearch(e)}
                                    />
                            {/* </form> */}
                        </div>
                        {/* 資訊大標題 */}
                        <div className="d-flex justify-content-center align-items-center flex-row pt-4 pb-4 titleInfo">
                                <img src={greenTitle} className="me-3" alt="greenTitle" height="24px" width="64px"/>
                                <h1 className="m-0 fw-bold deepblue">全部文章</h1>
                        </div>
                        {/* 卡片容器 */}
                        <div className="row d-flex justify-content-center">

                        {searchWord !== "" && allInfo.length === 0 ? <>
                        
                            <div className="col-6 col-lg-6 p-5 text-center">
                                <h2>未找到與 "<span style={{color: "#17a8a2"}}>{searchWord}</span>" 相關的文章，<br/>請換換別的關鍵字試試看！</h2>
                            </div>

                        </> : <>

                            {/* 全部文章卡片 */}
                            {allInfo.map( (allInfoItem, i) => {
                                return (
                                <React.Fragment key={allInfoItem.info_no}>
                                <div className="col-12 col-lg-5 p-5" key={allInfoItem.info_no}>
                                    <Link to={`/information/${allInfoItem.info_no}`} style={{textDecoration: 'none', color: '#333333'}}>
                                    {/* 卡片本體-中間 */}
                                    <div className="cardHome shadow">
                                        {/* 卡片圖片容器-中間 */}
                                        <div className="cardPicDivHome d-flex justify-content-center align-items-center">
                                            {/* 卡片圖片標籤-中間 */}
                                            <span className="badgeHome badge bg-dark h6">{allInfoItem.info_cat}</span>
                                            {/* 卡片圖片本體-中間 */}
                                            <img className="cardPicHome" src={`${IMAGE_URL}/information/${allInfoItem.big_img}`} alt={allInfoItem.big_img}/>
                                        </div>
                                        {/* 卡片文字容器-中間 */}
                                        <div>
                                            <div className="cardTitleHome px-4 pt-4 pb-4">
                                                <h3>{allInfoItem.big_title}</h3>
                                            </div>
                                            <div className="cardTextHome px-4 pt-4 pb-4">
                                                <p>{allInfoItem.one_text_one}</p>
                                            </div>
                                            <div className="cardinfoHome d-flex justify-content-between align-items-center px-4 pt-5 pb-4">
                                                {/* 文章卡片按鈕 */}
                                                <h6>{dateAdjust(allInfoItem.create_time)} {allInfoItem.author}</h6>
                                                <div>
                                                    <a className="btn btn-primary" href="" onClick={()=> navigate(`/information/${allInfoItem.info_no}`)}>看更多
                                                    <FaLongArrowAltRight
                                                            className="ps-2"
                                                            size={24}
                                                            color="#ffffff"
                                                    />
                                                    </a>
                                                </div> {/* 文章卡片按鈕-結束 */}
                                            </div>
                                        </div>
                                    </div> {/* 卡片本體-中間 cardHome */}
                                    </Link>
                                </div> {/* column */}
                                </React.Fragment>
                                );
                            })} {/* map-結束 */}
                        </>} {/* 三元條件運算式-結束 */}

                        </div> {/* 卡片容器-結束 */}

                        {/* 全部文章pagination */}
                        <div className="d-flex justify-content-center paginationPadding">
                            <Pagination size="sm">
                                <Pagination.First onClick={(e) => setNowPage(1)}/>
                                {getAllPageList()}
                                <Pagination.Last onClick={(e) => setNowPage(allLastPage)}/>
                            </Pagination>
                        </div>


                    </Tab>

                    {/* 分類一Tab */}
                    <Tab className="" eventKey="catOne" title="人物故事">
                        {/* <Sonnet /> */}
                        <div className="d-flex justify-content-end">
                            <input
                                type="text"
                                placeholder="  🔍  以關鍵字搜尋"
                                className="form-control mt-1 rounded-pill w-25 text-muted"
                                value={catOneSearchWord}
                                onChange={(e) => handleCatOneSearch(e)}
                            />
                        </div>
                        {/* 資訊大標題 */}
                        <div className="d-flex justify-content-center align-items-center flex-row pt-4 pb-4 titleInfo">
                                <img src={greenTitle} className="me-3" alt="greenTitle" height="24px" width="64px"/>
                                <h1 className="m-0 fw-bold deepblue">人物故事</h1>
                        </div>
                        {/* 卡片容器 */}
                        <div className="row d-flex justify-content-center">

                        {catOneSearchWord !== "" && catOneInfo.length === 0 ? <>
                        
                            <div className="col-6 col-lg-6 p-5 text-center">
                                <h2>未找到與 "<span style={{color: "#17a8a2"}}>{catOneSearchWord}</span>" 相關的文章，<br/>請換換別的關鍵字試試看！</h2>
                            </div>

                        </> : <>

                            {/* 分類一文章卡片 */}    
                            {catOneInfo.map( (catOneItem, i) => {
                                return (
                                <React.Fragment key={catOneItem.info_no}>
                                <div className="col-12 col-lg-5 p-5" key={catOneItem.info_no} >

                                    {/* 卡片本體-中間 */}
                                <div className="cardHome shadow">
                                    {/* 卡片圖片容器-中間 */}
                                    <div className="cardPicDivHome d-flex justify-content-center align-items-center">
                                        {/* 卡片圖片標籤-中間 */}
                                        <span className="badgeHome badge bg-dark h6">{catOneItem.info_cat}</span>
                                        {/* 卡片圖片本體-中間 */}
                                        <img className="cardPicHome" src={`${IMAGE_URL}/information/${catOneItem.big_img}`} alt={catOneItem.big_img}/>
                                    </div>
                                    {/* 卡片文字容器-中間 */}
                                    <div>
                                        <div className="cardTitleHome px-4 pt-4 pb-4">
                                            <h3>{catOneItem.big_title}</h3>
                                        </div>
                                        <div className="cardTextHome px-4 pt-4 pb-4">
                                            <p>{catOneItem.one_text_one}</p>
                                        </div>
                                        <div className="cardinfoHome d-flex justify-content-between align-items-center px-4 pt-5 pb-4">
                                            {/* 文章卡片按鈕 */}
                                            <h6>{dateAdjust(catOneItem.create_time)} {catOneItem.author}</h6>
                                            <div>
                                                <a className="btn btn-primary" href="" onClick={()=> navigate(`/information/${catOneItem.info_no}`)}>看更多
                                                <FaLongArrowAltRight
                                                        className="ps-2"
                                                        size={24}
                                                        color="#ffffff"
                                                />
                                                </a>
                                            </div> {/* 文章卡片按鈕-結束 */}
                                        </div>
                                    </div>
                                </div> {/* 卡片本體-中間 cardHome */}
                                </div> {/* column */}
                                </React.Fragment>
                                );
                            })} {/* map-結束 */}
                        </>} {/* 三元條件運算式-結束 */}

                        </div> {/* 卡片容器-結束 */}

                        {/* 分類一pagination */}
                        <div className="d-flex justify-content-center mb-5 paginationPadding">
                            <Pagination size="sm">
                                <Pagination.First onClick={(e) => getCatOnePageList(1)}/>
                                {getCatOnePageList()}
                                <Pagination.Last onClick={(e) => getCatOnePageList(catOneLastPage)}/>
                            </Pagination>
                        </div>

                    </Tab>

                    {/* 分類二Tab */}
                    <Tab className="" eventKey="catTwo" title="衝浪主題">
                        {/* <Sonnet /> */}
                        <div className="d-flex justify-content-end">
                            <input
                                type="text"
                                placeholder="  🔍  以關鍵字搜尋"
                                className="form-control mt-1 rounded-pill w-25 text-muted"
                                value={catTwoSearchWord}
                                onChange={(e) => handleCatTwoSearch(e)}
                            />
                        </div>
                        {/* 資訊大標題 */}
                        <div className="d-flex justify-content-center align-items-center flex-row pt-4 pb-4 titleInfo">
                                <img src={greenTitle} className="me-3" alt="greenTitle" height="24px" width="64px"/>
                                <h1 className="m-0 fw-bold deepblue">衝浪主題</h1>
                        </div>
                        {/* 卡片容器 */}
                        <div className="row d-flex justify-content-center">

                        {catTwoSearchWord !== "" && catTwoInfo.length === 0 ? <>
                        
                            <div className="col-6 col-lg-6 p-5 text-center">
                                <h2>未找到與 "<span style={{color: "#17a8a2"}}>{catTwoSearchWord}</span>" 相關的文章，<br/>請換換別的關鍵字試試看！</h2>
                            </div>

                        </> : <>

                            {/* 分類二文章卡片 */}
                            {catTwoInfo.map( (catTwoItem, i) => {
                                return (
                                <React.Fragment key={catTwoItem.info_no}>
                                <div className="col-12 col-lg-5 p-5" key={catTwoItem.info_no}>
                                    {/* 卡片本體-中間 */}
                                <div className="cardHome shadow">
                                    {/* 卡片圖片容器-中間 */}
                                    <div className="cardPicDivHome d-flex justify-content-center align-items-center">
                                        {/* 卡片圖片標籤-中間 */}
                                        <span className="badgeHome badge bg-dark h6">{catTwoItem.info_cat}</span>
                                        {/* 卡片圖片本體-中間 */}
                                        <img className="cardPicHome" src={`${IMAGE_URL}/information/${catTwoItem.big_img}`} alt={catTwoItem.big_img}/>
                                    </div>
                                    {/* 卡片文字容器-中間 */}
                                    <div>
                                        <div className="cardTitleHome px-4 pt-4 pb-4">
                                            <h3>{catTwoItem.big_title}</h3>
                                        </div>
                                        <div className="cardTextHome px-4 pt-4 pb-4">
                                            <p>{catTwoItem.one_text_one}</p>
                                        </div>
                                        <div className="cardinfoHome d-flex justify-content-between align-items-center px-4 pt-5 pb-4">
                                            {/* 文章卡片按鈕 */}
                                            <h6>{dateAdjust(catTwoItem.create_time)} {catTwoItem.author}</h6>
                                            <div>
                                                <a className="btn btn-primary" href="" onClick={()=> navigate(`/information/${catTwoItem.info_no}`)}>看更多
                                                <FaLongArrowAltRight
                                                        className="ps-2"
                                                        size={24}
                                                        color="#ffffff"
                                                />
                                                </a>
                                            </div> {/* 文章卡片按鈕-結束 */}
                                        </div>
                                    </div>
                                </div> {/* 卡片本體-中間 cardHome */}
                                </div> {/* column */}
                                </React.Fragment>
                                );                        
                            })} {/* map-結束 */}
                        </>} {/* 三元條件運算式-結束 */}
                        
                        </div> {/* 卡片容器-結束 */}
                        
                        {/* 分類二pagination */}
                        <div className="d-flex justify-content-center mb-5 paginationPadding">
                            <Pagination size="sm">
                                <Pagination.First onClick={(e) => getCatTwoPageList(1)}/>
                                {getCatTwoPageList()}
                                <Pagination.Last onClick={(e) => getCatTwoPageList(catTwoLastPage)}/>
                            </Pagination>
                        </div>
                    </Tab>
                </Tabs>
                </div> {/*  */}

                </div> {/* col */}

            </div> {/* row */}
        </div>
    </>
    );
}

//   render(<ControlledCarousel />);
export default Information;
