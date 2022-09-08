import styleOrder from '../styles/form.module.css';
import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Header from '../components/Header';
import HeaderCart from '../components/HeaderCart';
import HeaderOrder from '../components/HeaderOrder';
import HeaderLogin from '../components/HeaderLogin';
import HeaderLogout from '../components/HeaderLogout';


//各フォームのデータ型cd
// type FormData = {
//   userName: string;
//   email: string;
//   zipcode: string;
//   address: string;
//   tel: string;
// };

//(export)
const orderConfirmation = () => {
  //フォームにステートを付与
  const [orderFormData, setOrderFormData] = useState({
    //status:0,
    userName: '',
    email: '',
    zipCode: '',
    address: '',
    tel: '',
    //deliveryTime: '',
    //payment:1,
  });

  //フォームへの入力内容を反映[onChange]
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setOrderFormData({ ...orderFormData, [name]: value });
  };

  //[支払い方法のonChange]
  //①支払い方法だけvalueを文字列から数値に変える
  //②paymentが1だったらstatusも1、2だったら2
  const [payment, setPayment] = useState(1);
  const [status, setStatus] = useState(0);

  const onChangePay = (event: any) => {
    setPayment(Number(event.target.value));
    setStatus(Number(event.target.value));
  };

  //分けた(配達時間)
  const [deliveryTime,setDeliveryTime] =useState('');
  const onChangeTime = (event:any)=>{
    setDeliveryTime(event.target.value);
  }

  const [deliveryDate,setDeliveryDate] = useState('');
  const onChangeDate = (event:any)=>{
    setDeliveryDate(event.target.value);
  }

  //ボタンのイベント
  const onClickOrder = () => {
    return fetch(`/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: status,
        destinationName: orderFormData.userName,
        destinationEmail: orderFormData.email,
        destinationZipCode: orderFormData.zipCode,
        destinationAddress: orderFormData.address,
        destinationTel: orderFormData.tel,
        deliveryTime: `${deliveryDate}　${deliveryTime}`,
        paymentMethod: payment,
      }),
    }).then((res) => res.json());
  };

  return (
    <>
      <Head>
        <title>注文確認画面</title>
      </Head>
      <Header
        menu1={<HeaderCart />}
        menu2={<HeaderOrder />}
        menu3={<HeaderLogin />}
        menu4={<HeaderLogout />}
      />


      <form className={styleOrder.form}>
        <p className={styleOrder.labelTitle}>お届け先情報</p>
        <div className={styleOrder.formSample}>
          <p className={styleOrder.formLabel}>
            <span className={styleOrder.formRequire}>必須</span>氏名
          </p>
          <input
            className={styleOrder.formInput}
            name="userName"
            type="text"
            placeholder="(例)鈴木一郎"
            value={orderFormData.userName}
            onChange={handleChange}
          />
        </div>
        <div className={styleOrder.formSample}>
          <p className={styleOrder.formLabel}>
            <span className={styleOrder.formRequire}>必須</span>
            メールアドレス
          </p>
          <input
            className={styleOrder.formInput}
            name="email"
            type="text"
            placeholder="(例)○○○○.goomail.com"
            value={orderFormData.email}
            onChange={handleChange}
          />
        </div>
        <div className={styleOrder.formSample}>
          <p className={styleOrder.formLabel}>
            <span className={styleOrder.formRequire}>必須</span>
            郵便番号
          </p>
          <input
            className={styleOrder.formInput}
            name="zipCode"
            type="text"
            placeholder="(注意)ハイフンなし"
            value={orderFormData.zipCode}
            onChange={handleChange}
          />
          <br />
          <button>住所検索</button>
        </div>
        <div className={styleOrder.formSample}>
          <p className={styleOrder.formLabel}>
            <span className={styleOrder.formRequire}>必須</span>住所
          </p>
          <input
            className={styleOrder.formInput}
            name="address"
            type="text"
            placeholder="(例)○○県○○市"
            value={orderFormData.address}
            onChange={handleChange}
          />
        </div>
        <div className={styleOrder.formSample}>
          <p className={styleOrder.formLabel}>
            <span className={styleOrder.formRequire}>必須</span>
            電話番号
          </p>
          <input
            className={styleOrder.formInput}
            name="tel"
            type="text"
            placeholder="(注意)ハイフンなし"
            value={orderFormData.tel}
            onChange={handleChange}
          />
        </div>
        <div className={styleOrder.formSample}>
          <p className={styleOrder.formLabel}>
            <span className={styleOrder.formRequire}>必須</span>
            配達日時
          </p>
          <div>
            <p className={styleOrder.information}>
              配達日時を入力してください
            </p>
            <input
              className={styleOrder.formInput}
              type="date"
              value={deliveryDate}
              onChange={onChangeDate}
            />
            <input
              className={styleOrder.formInput}
              type="time"
              list="data-list"
              min="09:00"
              max="23:00"
              step="1800"
              name="time"
              value={deliveryTime}
              onChange={onChangeTime}
            />
            <span></span>
            <datalist id="data-list">
              <option value="09:00"></option>
              <option value="09:30"></option>
              <option value="10:00"></option>
              <option value="10:30"></option>
              <option value="11:00"></option>
              <option value="11:30"></option>
              <option value="12:00"></option>
              <option value="12:30"></option>
              <option value="13:00"></option>
              <option value="13:30"></option>
              <option value="14:00"></option>
              <option value="14:30"></option>
              <option value="15:00"></option>
              <option value="15:30"></option>
              <option value="16:00"></option>
              <option value="16:30"></option>
              <option value="17:00"></option>
              <option value="17:30"></option>
              <option value="18:00"></option>
              <option value="18:30"></option>
              <option value="19:00"></option>
              <option value="19:30"></option>
              <option value="20:00"></option>
              <option value="20:30"></option>
              <option value="21:00"></option>
              <option value="21:30"></option>
              <option value="22:00"></option>
              <option value="22:30"></option>
              <option value="23:00"></option>
            </datalist>
          </div>
        </div>
        <div className={styleOrder.formRadio}>
          <p className={styleOrder.formLabel}>
            <span className={styleOrder.formRequire}>必須</span>
            お支払い方法
          </p>
          <div className={styleOrder.radioLabel}>
            <label className={styleOrder.labelRadio}>
              <input
                type="radio"
                name="payment"
                value="1"
                onChange={onChangePay}
              />
              代金引換
            </label>
            <label className={styleOrder.labelRadio}>
              <input
                type="radio"
                name="payment"
                value="2"
                onChange={onChangePay}
              />
              クレジットカード
            </label>
          </div>
        </div>
        <Link href="/completion">
          <input
            type="submit"
            className={styleOrder.formBtn}
            value="送信する"
            // onClick=ここに送信後のロジックを実装
            onClick={() => onClickOrder()}
          />
        </Link>
      </form>
    </>
  );
};

export default orderConfirmation;
