import useSWR from 'swr';
import styleOrder from '../styles/orderForm.module.css';
import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

//各フォームのデータ型cd
// type FormData = {
//   userName: string;
//   email: string;
//   zipcode: string;
//   address: string;
//   tel: string;
// };

export const fetcher = (resource: any, init: any) =>
  fetch(resource, init).then((res) => res.json());

const orderConfirmation = () => {
  //クッキーの取得とキーを指定して値を取り出せるようにする
  function getCookie(name: any) {
    if (typeof document !== 'undefined') {
      //documentが定義されている場合のみプログラムを実行
      let cookieData = document.cookie.split(';');
      for (let i = 0; i < cookieData.length; i++) {
        let keyValue = cookieData[i].split('=');
        if (trim(keyValue[0]) === name) {
          return decodeURIComponent(trim(keyValue[1]));
        }
      }
      return null;
    }
  }
  //前後の空白を取り除く
  function trim(value: any) {
    return value.replace(/^¥s* |¥s*$/g, '');
  }

  //既に登録されているユーザーの情報を取得(クッキーのidと同じidの情報を取得しdataに格納)
  const { data, error } = useSWR(
    `http://localhost:8000/users/${getCookie('id')}`,
    fetcher
  );

  //フォームにステートを付与(初期値)
  // const [orderFormData, setOrderFormData] = useState({
  //   id: getCookie('id'),//いる？？
  //   //status:0,
  //   //userName: '',
  //   email: '',
  //   zipCode: '',
  //   address: '',
  //   tel: '',
  //   //deliveryTime: '',
  //   //payment:1,
  // });

  //フォームへの入力内容を反映[onChange]
  // const handleChange = (event: any) => {
  //   const { name, value } = event.target;
  //   setOrderFormData({ ...orderFormData, [name]: value });
  // };

  //名前、メールアドレス、郵便番号、住所、電話番号
  const [userName, setUserName] = useState('');
  const onChangeName = (event: any) => {
    setUserName(event.target.value);
  };

  const [email, setEmail] = useState('');
  const onChangeEmail = (event: any) => {
    setEmail(event.target.value);
  };

  const [zipCode, setZipCode] = useState('');
  const onChangeZipCode = (event: any) => {
    setZipCode(event.target.value);
  };

  const [address, setAddress] = useState('');
  const onChangeAddress = (event: any) => {
    setAddress(event.target.value);
  };

  const [tel, setTel] = useState('');
  const onChangeTel = (event: any) => {
    setTel(event.target.value);
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

  //配達時間(stateを日付と時間の2つに分けて送信する時はdeliveryTimeひとつにまとめる)
  const [deliveryTime, setDeliveryTime] = useState('');
  const onChangeTime = (event: any) => {
    setDeliveryTime(event.target.value);
  };

  const [deliveryDate, setDeliveryDate] = useState('');
  const onChangeDate = (event: any) => {
    setDeliveryDate(event.target.value);
  };

  //エラー処理
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  //登録情報反映ボタン(db.jsonに登録されている情報をフォームに表示)
  const onCLickData = () => {
    setUserName(data.name);
    setEmail(data.mail);
    setZipCode(data.zipcode);
    setAddress(data.address);
    setTel(data.tel);
  };

  //送信ボタン(db.jsonのordersにフォームの内容を新規追加)
  const onClickOrder = () => {
    return fetch(`/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: status,
        destinationName: userName,
        destinationEmail: email,
        destinationZipCode: zipCode,
        destinationAddress: address,
        destinationTel: tel,
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

      <div className={styleOrder.orderFormContainer}>
        <form>
          <h1 className={styleOrder.head}>お届け先情報</h1>
          <hr className={styleOrder.hr} />
          <button
            className={styleOrder.coBtn}
            type="button"
            onClick={() => onCLickData()}
          >
            ご登録住所にお届けする場合はこちら
          </button>
          <p className={styleOrder.pTitle}>
            新しいお届け先にお届けする場合は下記ご入力下さい。
          </p>
          <div className={styleOrder.orderFormField}>
            <label className={styleOrder.formLabel}>
              氏名
              <small className={styleOrder.errorMsg}></small>
            </label>
            <input
              className={styleOrder.formInput}
              name="userName"
              type="text"
              placeholder="Name"
              value={userName}
              onChange={onChangeName}
            />
          </div>
          <div className={styleOrder.orderFormField}>
            <label className={styleOrder.formLabel}>
              メールアドレス
              <small className={styleOrder.errorMsg}></small>
            </label>
            <input
              className={styleOrder.formInput}
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={onChangeEmail}
            />
          </div>
          <div className={styleOrder.orderFormField}>
            <label className={styleOrder.formLabel}>
              郵便番号
              <small className={styleOrder.errorMsg}></small>
              <button className={styleOrder.addressBtn}>
                住所検索
              </button>
            </label>
            <input
              className={styleOrder.formInput}
              name="zipCode"
              type="text"
              placeholder="ZipCode"
              value={zipCode}
              onChange={onChangeZipCode}
            />
          </div>
          <div className={styleOrder.orderFormField}>
            <label className={styleOrder.formLabel}>
              住所
              <small className={styleOrder.errorMsg}></small>
            </label>
            <input
              className={styleOrder.formInput}
              name="address"
              type="text"
              placeholder="Address"
              value={address}
              onChange={onChangeAddress}
            />
          </div>
          <div className={styleOrder.orderFormField}>
            <label className={styleOrder.formLabel}>
              電話番号
              <small className={styleOrder.errorMsg}></small>
            </label>
            <input
              className={styleOrder.formInput}
              name="tel"
              type="text"
              placeholder="Tel"
              value={tel}
              onChange={onChangeTel}
            />
          </div>
          <div className={styleOrder.orderFormField}>
            <label className={styleOrder.formLabel}>
              配達日時
              <small className={styleOrder.errorMsg}></small>
            </label>
            <div>
              <p className={styleOrder.dateInformation}>
                ご希望の配達日時を選択してください
              </p>
              <input
                className={styleOrder.dateForm}
                type="date"
                value={deliveryDate}
                onChange={onChangeDate}
              />
              <input
                className={styleOrder.timeForm}
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
          <div className={styleOrder.orderFormField}>
            <label className={styleOrder.formLabel}>
              お支払い方法
              <small className={styleOrder.errorMsg}></small>
            </label>
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
              className={styleOrder.orderBtn}
              value="この内容で注文する"
              onClick={() => onClickOrder()}
            />
          </Link>
        </form>
      </div>
    </>
  );
};

export default orderConfirmation;