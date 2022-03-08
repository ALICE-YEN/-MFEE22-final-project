import React from 'react';
import "./InformationDetails.scss";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom' 

// 撈資料引入
import axios from 'axios';
import { API_URL } from '../../utils/config';
import { IMAGE_URL } from '../../utils/config';



function InformationDetails() {
    // 使用useNavigate
    let navigate = useNavigate();
    // 使用useParams
    const { info_no } = useParams();

    // 指定info_no的資料
    const [infoNoData, setInfoNoData] = useState([]);

    //上一頁的資料
    const [prevData, setPrevData] = useState([]);

    // 下一頁的資料
    const [nextData, setNextData] = useState([]);

    // 載入指示器[1]
    const [isLoading, setIsLoading] = useState(false);


    // 載入spinner
    // x秒後自動關掉spinner
    useEffect(() => {
        if (isLoading) {
        setTimeout(() => {
            setIsLoading(false);
        }, 2);
        }
    }, []);


    useEffect(() => {
        // 開啟

        let getInfoNoData = async () => {
            let response = await axios.get(`${API_URL}/information/${info_no}`);

            // console.log("InfornationDetails頁收到的response.data,data:", response.data.data);
            // console.log("InfornationDetails頁收到的response.data.prevData:", response.data.prevData);
            // console.log("InfornationDetails頁收到的response.data.nextData:", response.data.nextData);
            setInfoNoData(response.data.data);
            setPrevData(response.data.prevData);
            setNextData(response.data.nextData);
            setIsLoading(false); // 關掉spinner
            };
            getInfoNoData();
    }, []);

    // 載入指示 spinner動畫
    const spinner = (
    <>
        <div className="d-flex justify-content-center align-items-center">
        {/* <Spinner animation="border" variant="secondary" /> */}
        <div className="spinner-border text-secondary" variant="secondary" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        </div>
    </>
    );
    



    return (
    <>
    {/* <div> */}
    {/* <h3>麵包屑</h3> */}
    {/* <h3>麵包{spinner}</h3> */}
    {/* {isLoading ? spinner : <h3>麵包屑拿到了資料了</h3>} */}
    {/* </div> */}

    {infoNoData.map( (infoNoDataItem, i) => {
        return (
            <React.Fragment key={infoNoDataItem.info_id}>

            {/* 上方大圖 */}
            {/* <div className="container-fluid titlePicSectionInfo"> */}
            {(() => {
                if (isLoading === true) {
                    return <>{spinner}</>;
                }
                else{
                    return (
                        <>
                        {/* 資料拿到 */}
                        <div className="container titleSectionInfo d-flex flex-row align-items-end">
                        <div className="row">
                            <div className="col-12 col-sm-9 p-5 pb-0">
                                <div className="titleWordInfo d-flex flex-column align-items-start text-start mb-4">
                                    <span className="badge bg-dark h6">{infoNoDataItem.info_cat}</span>
                                    <h1 className="black">{infoNoDataItem.big_title}</h1>
                                    <h6 className="black">{infoNoDataItem.create_time} {infoNoDataItem.author}</h6>
                                </div>
                                {/* line */}
                                <div className="lineInfo mt-5"></div>
                            </div>    
                        
                            <div className="col-12 col-sm-3 p-5 pb-0">
                                <div className="titleTopPicBoxInfo">
                                    <img
                                        className="titleTopPicInfo"
                                        src={`${IMAGE_URL}/information/${infoNoDataItem.big_img}`}
                                        alt={infoNoDataItem.big_img}
                                    />
                                </div>
                                {/* <div className="titleTopPicBoxInfo">
                                    <h4>have fun</h4>
                                </div> */}
                            </div>
                        </div>
                        </div>
                        </>      
                    )
                }
            })()} {/* IIFE */} 
            {/* </div> */}
            {/* container-fluid */}

            {/* line */}
            {/* <div className="container">
                <div className="row lineBox">
                    <div className="col-12">
                        <div className="lineInfo"></div>
                    </div>
                </div>
            </div> */}

            {(() => {
                if (infoNoDataItem.one_text_one === null && infoNoDataItem.one_title === null){
                    return (
                    <>

                    <h3>此文章內容還在編寫中～敬請期待！</h3>
                    {/* 文章內容 */}
                    <div className="container contentSectionInfo">
                        <div className="row">
                            <div className="col-12 col-sm-9 p-5">
                                {/* 第1段-1 */}
                                <h2>此文章內容還在編寫中～敬請期待！</h2>

                                {/* /////////////////////////////// */}
                                {/* line */}
                                <div className="lineInfo mt-5 mb-3"></div>

                                <div className="d-flex justify-content-between mb-3 gray">
                                    <h5>上一篇文章</h5>
                                    <h5>下一篇文章</h5>
                                </div>
                                <div className="d-flex justify-content-between mb-5">
                                    <div className="prevNextBoxInfo">
                                        <Link to="/information-details">上一篇文章上一篇文章上一篇文章上一篇文章</Link>
                                    </div>
                                    <div className="prevNextBoxInfo">
                                        <Link to="/information-details">下一篇文章下一篇文章下一篇文章下一篇文章</Link>
                                    </div>                    
                                </div>
                                
                            </div> {/* col */}

                            {/* 右側欄位/////////////////////////////// */}
                            <div className="col-12 col-sm-3 p-5">
                                <h5 className="lh-base gray">您是否也有許多衝浪故事，期待與浪友們分享？</h5>
                                {/* line */}
                                <div className="lineInfo my-3"></div>
                                <p className="lh-lg mb-5 gray">FUNWAVE編輯部團隊擁有專業編輯、撰稿人、攝影師以及一群熱情的浪友們，為您的衝浪故事量身打造獨特的篇章。</p>
                                <h5 className="lh-base gray">聯繫FUNWAVE編輯部</h5>
                                {/* line */}
                                <div className="lineInfo my-3"></div>
                                <p className="lh-lg gray">0800-000-000<br/>funwave2022@gmail.com<br/>誠摯歡迎您，與我們分享您的衝浪故事以及任何想法！</p>
                            </div> {/* col */}
                        </div> {/* row */}

                    </div> {/* container */}


                    </> 
                    );
                }
                else{
                    return (
                    <>
                    
                    {/* 文章內容 */}
                    <div className="container contentSectionInfo">
                        <div className="row">
                            <div className="col-12 col-sm-9 p-5">
                                {infoNoDataItem.one_title === null ? null : <h2 className="lh-base pb-3">{infoNoDataItem.one_title}</h2>}
                                
                                {infoNoDataItem.one_text_one === null ? null : <p className="lh-lg pb-3">{infoNoDataItem.one_text_one}</p>}

                                {infoNoDataItem.one_ita_one === null ? null : <h3 className="lh-base fst-italic text-center deepblue pb-3 px-5">{infoNoDataItem.one_ita_one}</h3>}

                                {infoNoDataItem.one_img_one === null ? null : <div className="contentPicBoxInfo">
                                    <img
                                        className="contentPicInfo"
                                        src={`${IMAGE_URL}/information/${infoNoDataItem.one_img_one}`}
                                        alt={infoNoDataItem.one_img_one}
                                    />
                                </div>}

                                {infoNoDataItem.one_imgword_one === null ? null : <h6 className="fst-italic pt-1 pb-3">{infoNoDataItem.one_imgword_one}</h6>}
                                
                                {/* 第1段-2 */}
                                {infoNoDataItem.one_text_two === null ? null : <p className="lh-lg pb-3">{infoNoDataItem.one_text_two}</p>}

                                {infoNoDataItem.one_ita_two === null ? null : <h3 className="lh-base fst-italic text-center deepblue pb-3 px-5">{infoNoDataItem.one_ita_two}</h3>}

                                {infoNoDataItem.one_img_two === null ? null : <div className="contentPicBoxInfo">
                                    <img
                                        className="contentPicInfo"
                                        src={`${IMAGE_URL}/information/${infoNoDataItem.one_img_two}`}
                                        alt={infoNoDataItem.one_img_two}
                                    />
                                </div>}

                                {infoNoDataItem.one_imgword_two === null ? null : <h6 className="fst-italic pt-1 pb-3">{infoNoDataItem.one_imgword_two}</h6>}


                                {/* 第2段-1 */}
                                {infoNoDataItem.two_title === null ? null : <h2 className="lh-base pb-3">{infoNoDataItem.two_title}</h2>}
                                
                                {infoNoDataItem.two_text_one === null ? null : <p className="lh-lg pb-3">{infoNoDataItem.two_text_one}</p>}

                                {infoNoDataItem.two_ita_one === null ? null : <h3 className="lh-base fst-italic text-center deepblue pb-3 px-5">{infoNoDataItem.two_ita_one}</h3>}

                                {infoNoDataItem.two_img_one === null ? null : <div className="contentPicBoxInfo">
                                    <img
                                        className="contentPicInfo"
                                        src={`${IMAGE_URL}/information/${infoNoDataItem.two_img_one}`}
                                        alt={infoNoDataItem.two_img_one}
                                    />
                                </div>}

                                {infoNoDataItem.two_imgword_one === null ? null : <h6 className="fst-italic pt-1 pb-3">{infoNoDataItem.two_imgword_one}</h6>}
                                
                                {/* 第2段-2 */}
                                {infoNoDataItem.two_text_two === null ? null : <p className="lh-lg pb-3">{infoNoDataItem.two_text_two}</p>}

                                {infoNoDataItem.two_ita_two === null ? null : <h3 className="lh-base fst-italic text-center deepblue pb-3 px-5">{infoNoDataItem.two_ita_two}</h3>}

                                {infoNoDataItem.two_img_two === null ? null : <div className="contentPicBoxInfo">
                                    <img
                                        className="contentPicInfo"
                                        src={`${IMAGE_URL}/information/${infoNoDataItem.two_img_two}`}
                                        alt={infoNoDataItem.two_img_two}
                                    />
                                </div>}

                                {infoNoDataItem.two_imgword_two === null ? null : <h6 className="fst-italic pt-1 pb-3">{infoNoDataItem.two_imgword_two}</h6>}

                                {/* 第3段-1 */}
                                {infoNoDataItem.three_title === null ? null : <h2 className="lh-base pb-3">{infoNoDataItem.three_title}</h2>}
                                
                                {infoNoDataItem.three_text_one === null ? null : <p className="lh-lg pb-3">{infoNoDataItem.three_text_one}</p>}

                                {infoNoDataItem.three_ita_one === null ? null : <h3 className="lh-base fst-italic text-center deepblue pb-3 px-5">{infoNoDataItem.three_ita_one}</h3>}

                                {infoNoDataItem.three_img_one === null ? null : <div className="contentPicBoxInfo">
                                    <img
                                        className="contentPicInfo"
                                        src={`${IMAGE_URL}/information/${infoNoDataItem.three_img_one}`}
                                        alt={infoNoDataItem.three_img_one}
                                    />
                                </div>}

                                {infoNoDataItem.three_imgword_one === null ? null : <h6 className="fst-italic pt-1 pb-3">{infoNoDataItem.three_imgword_one}</h6>}
                                
                                {/* 第3段-2 */}
                                {infoNoDataItem.three_text_two === null ? null : <p className="lh-lg pb-3">{infoNoDataItem.three_text_two}</p>}

                                {infoNoDataItem.three_ita_two === null ? null : <h3 className="lh-base fst-italic text-center deepblue pb-3 px-5">{infoNoDataItem.three_ita_two}</h3>}

                                {infoNoDataItem.three_img_two === null ? null : <div className="contentPicBoxInfo">
                                    <img
                                        className="contentPicInfo"
                                        src={`${IMAGE_URL}/information/${infoNoDataItem.three_img_two}`}
                                        alt={infoNoDataItem.three_img_two}
                                    />
                                </div>}

                                {infoNoDataItem.three_imgword_two === null ? null : <h6 className="fst-italic pt-1 pb-3">{infoNoDataItem.three_imgword_two}</h6>}

                                {/* 第4段-1 */}
                                {infoNoDataItem.four_title === null ? null : <h2 className="lh-base pb-3">{infoNoDataItem.four_title}</h2>}
                                
                                {infoNoDataItem.four_text_one === null ? null : <p className="lh-lg pb-3">{infoNoDataItem.four_text_one}</p>}

                                {infoNoDataItem.four_ita_one === null ? null : <h3 className="lh-base fst-italic text-center deepblue pb-3 px-5">{infoNoDataItem.four_ita_one}</h3>}

                                {infoNoDataItem.four_img_one === null ? null : <div className="contentPicBoxInfo">
                                    <img
                                        className="contentPicInfo"
                                        src={`${IMAGE_URL}/information/${infoNoDataItem.four_img_one}`}
                                        alt={infoNoDataItem.four_img_one}
                                    />
                                </div>}

                                {infoNoDataItem.four_imgword_one === null ? null : <h6 className="fst-italic pt-1 pb-3">{infoNoDataItem.four_imgword_one}</h6>}
                                
                                {/* 第4段-2 */}
                                {infoNoDataItem.four_text_two === null ? null : <p className="lh-lg pb-3">{infoNoDataItem.four_text_two}</p>}

                                {infoNoDataItem.four_ita_two === null ? null : <h3 className="lh-base fst-italic text-center deepblue pb-3 px-5">{infoNoDataItem.four_ita_two}</h3>}

                                {infoNoDataItem.four_img_two === null ? null : <div className="contentPicBoxInfo">
                                    <img
                                        className="contentPicInfo"
                                        src={`${IMAGE_URL}/information/${infoNoDataItem.four_img_two}`}
                                        alt={infoNoDataItem.four_img_two}
                                    />
                                </div>}

                                {infoNoDataItem.four_imgword_two === null ? null : <h6 className="fst-italic pt-1 pb-3">{infoNoDataItem.four_imgword_two}</h6>}


                                {/* /////////////////////////////// */}
                                {/* line */}
                                <div className="lineInfo mt-5 mb-3"></div>

                                <div className="d-flex justify-content-between mb-3 gray">
                                    <h5>上一篇文章</h5>
                                    <h5>下一篇文章</h5>
                                </div>

                                <div className="d-flex justify-content-between mb-5">

                                {/* 因應SQL壞掉重寫的 */}
                                {(() => {
                                    if(prevData.length === 0) {
                                        return (
                                            <div className="prevNextBoxInfo h5 gray text-start">沒有更多文章了~看看其他分類文章吧<br/><Link to={`/information`}>返回文章分類主頁面</Link></div>
                                        );
                                    }
                                    else {

                                        return (
                                            prevData.map((prevDataItem, i) => {
                                                return (
                                                    <React.Fragment key={prevDataItem.info_id}>
                                                    <div className="prevNextBoxInfo h5 text-start">
                                                        <a className="h5" href="" onClick={()=> navigate(`/information/${prevDataItem.info_no}`)}>{prevDataItem.big_title}</a>
                                                    </div>
                                                    </React.Fragment>
                                                ); // map-return結尾
                                            }) // map-function結尾
                                        ); // else-return結尾
                                    } // function結尾
                                })()}
                                {/* IIFE結尾 */}


                                {/* 原來SQL沒壞掉時寫的 */}
                                {/* {prevData.map((prevDataItem, i) => {
                                    return (
                                    <React.Fragment key={prevDataItem.info_id}>
                                    
                                    {prevDataItem.big_title === null ? <div className="prevNextBoxInfo h5 gray text-start">沒有更多文章了~看看其他分類文章吧<br/><Link to={`/information`}>返回文章分類主頁面</Link></div> : <div className="prevNextBoxInfo h5 text-start">
                                        <a className="h5" href="" onClick={()=> navigate(`/information/${prevDataItem.info_no}`)}>{prevDataItem.big_title}</a>
                                    </div>}

                                    </React.Fragment>
                                    )
                                })} */}

                                {nextData.map((nextDataItem, i) => {
                                    return (
                                    <React.Fragment key={nextDataItem.info_id}>
                                    
                                    {nextDataItem.big_title === null ? <div className="prevNextBoxInfo h5 gray text-end">沒有更多文章了~看看其他分類文章吧<br/><Link to={`/information`}>返回文章分類主頁面</Link></div> : <div className="prevNextBoxInfo h5 text-end">
                                        <a className="h5 text-end" href="" onClick={()=> navigate(`/information/${nextDataItem.info_no}`)}>{nextDataItem.big_title}</a>
                                    </div>}

                                    </React.Fragment>
                                    )
                                })}
                                </div>
                                
                            </div> {/* col */}

                            {/* 右側欄位/////////////////////////////// */}
                            <div className="col-12 col-sm-3 p-5">
                                <h5 className="changeFontInfo">Share Your Special Story !</h5>
                                <h6 className="lh-base black">您是否也有許多衝浪故事，期待與浪友們分享？</h6>
                                {/* line */}
                                <div className="lineInfo my-3"></div>
                                <h6 className="lh-lg mb-5 gray">FUNWAVE編輯部團隊擁有專業編輯、撰稿人、攝影師以及一群熱情的浪友們，為您的衝浪故事量身打造獨特的篇章。</h6>
                                <h6 className="lh-base black">聯繫FUNWAVE編輯部</h6>
                                {/* line */}
                                <div className="lineInfo my-3"></div>
                                <h6 className="lh-lg gray">0800-000-000<br/>funwave2022@gmail.com<br/>誠摯歡迎您，與我們分享您的衝浪故事以及任何想法！</h6>
                            </div> {/* col */}
                        </div> {/* row */}

                    </div> {/* container */}

                    
                    </> 
                    );
                }

            })()} {/* IIFE */}


            </React.Fragment>
        );
    })}


    </>
    );
}

export default InformationDetails;       