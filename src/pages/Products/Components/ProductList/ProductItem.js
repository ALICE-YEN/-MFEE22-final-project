import React from 'react';
import { Figure } from 'react-bootstrap';
import { IMAGE_URL } from '../../../../utils/config';

// react-icons
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
// import { BsStarHalf } from 'react-icons/bs'; // 半星星
import { BiHeart } from 'react-icons/bi';
// import { FaHeart } from 'react-icons/fa'; // 全愛心

// 文字過長會跑版、後端圖片如何置換

function ProductItem(props) {
  const { name, image1, price, small_cat_id, brand_id } = props.product;
  // 小分類、品牌的id對照名稱
  const smallCatTypes = [
    '長板',
    '快樂板',
    '短板',
    '衝浪板舵',
    '腳繩',
    '腳踏墊',
    '衝浪斗篷毛巾衣',
    '防寒衣',
  ];
  const brandTypes = [
    'Catch Surf',
    'Solid Surf Co',
    'JJF by Pyzel',
    'Modern',
    'Softech',
    'Almond Surfboards',
    'Lib Tech',
    'True Ames',
    'Captain Fin',
    'Creatures of Leisure',
    'Roam',
    'Pro-Lite',
    'en.saintjacques',
  ];

  return (
    <>
      {/* 商品列表的個別商品 */}
      <Figure className="mt-4 position-relative">
        <Figure.Image
          width={265}
          height={350}
          alt={`${image1}`}
          src={`${IMAGE_URL}/products/${image1}`}
        />
        {/* <BiHeart
          size={21}
          color="#ff7f6a"
          className="float-end position-absolute top-0 end-0"
        /> */}
        <div className="d-flex justify-content-center mt-2">
          <AiFillStar size={20} color="#ff7f6a" />
          <AiFillStar size={20} color="#ff7f6a" />
          <AiFillStar size={20} color="#ff7f6a" />
          <AiFillStar size={20} color="#ff7f6a" />
          <AiOutlineStar size={20} color="#ff7f6a" />
        </div>
        <Figure.Caption className="d-flex justify-content-center">
          <p className="mb-0 mt-2">{name}</p>
        </Figure.Caption>
        <Figure.Caption className="d-flex justify-content-center">
          <p className="mb-0">{brandTypes[brand_id - 1]}</p>
        </Figure.Caption>
        <Figure.Caption className="d-flex justify-content-center">
          <p className="mb-2">{smallCatTypes[small_cat_id - 1]}</p>
        </Figure.Caption>
        <Figure.Caption className="d-flex justify-content-center">
          <p className="fw-bold">NT {price.toLocaleString()}</p>
        </Figure.Caption>
      </Figure>
    </>
  );
}

export default ProductItem;
