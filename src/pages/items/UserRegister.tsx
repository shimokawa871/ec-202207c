import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { any } from 'prop-types';
import React, { useRef } from 'react';
import { fn } from 'jest-mock';
import { type } from 'os';
import { ChangeEvent } from 'jest-haste-map';
import Link from 'next/link';
import styleForm from 'styles/styleOrderConfirmation.module.css';
import Header from '../../components/Header';
import HeaderCart from 'components/HeaderCart';
import HeaderOrder from 'components/HeaderOrder';
import HeaderLogin from 'components/HeaderLogin';
import HeaderLogout from 'components/HeaderLogout';

//各フォームのデータ型cd
type FormData = {
  userName: string;
  email: string;
  zipcode: string;
  address: string;
  tel: string;
  password: string;
  Cpassword: string;
  id: number;
};


const UserRegister: NextPage = () => {
  //フォームにステートを付与
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    zipcode: '',
    address: '',
    tel: '',
    password: '',
    Cpassword: '',
    id: '',
  });

  //フォームへの入力内容を反映
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  //クリアボタン処理
  const onClickClear = () =>
    setFormData({
      userName: '',
      email: '',
      zipcode: '',
      address: '',
      tel: '',
      password: '',
      Cpassword: '',
      id: '',
    });

  //必須項目が入力されなかった場合
  const alertSet = () => {
    setFormData({
      userName: '名前は必須項目です。',
      email: 'メールアドレスは必須項目です。',
      zipcode: '郵便番号は必須項目です。',
      address: '住所は必須項目です。',
      tel: '電話番号は必須項目です。',
      password: 'パスワードは必須項目です。',
      Cpassword: 'パスワードは必須項目です。',
      id: '',
    });
  };

  //jsonserverへ登録（テスト）
  const onClickAdd = () => {
    if (formData.userName === "") {
      return alert("ユーザ名を入力してください。")
    } 
    return fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.userName,
        mail: formData.email,
        zipcode: formData.zipcode,
        address: formData.address,
        tel: formData.tel,
        password: formData.password,
        Cpassword: formData.Cpassword,
      }),
    });
  };

  //jsonserverへ登録（テスト）
  const onClickTest = () => {
    return fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 't',
        mail: 't',
        zipcode: 't',
        address: 't',
        tel: 't',
        password: 't',
        Cpassword: 't',
      }),
    });
  };

  return (
    <>
      <Head>
        <title>らくらくピザ屋 - ユーザ登録画面</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        menu1={<HeaderCart />}
        menu2={<HeaderOrder />}
        menu3={<HeaderLogin />}
        menu4={<HeaderLogout />}
      />
      <form action="" method="post" id="form">
        <div className={styleForm.form}>
          <h1 className={styleForm.labelTitle}>ユーザ登録</h1>
          <div className={styleForm.formSample}>
            <p className={styleForm.formLabel}>
              <span className={styleForm.formRequire}>必須</span>氏名
            </p>
            <input
              className={styleForm.formInput}
              name="userName"
              placeholder="Name"
              value={formData.userName}
              onChange={handleChange}
              required
              type="text"
            />
          </div>
          <div className={styleForm.formSample}>
            <p className={styleForm.formLabel}>
              <span className={styleForm.formRequire}>必須</span>
              メールアドレス
            </p>
            <input
              className={styleForm.formInput}
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className={styleForm.formSample}>
            <p className={styleForm.formLabel}>
              <span className={styleForm.formRequire}>必須</span>
              郵便番号
            </p>
            <input
              className={styleForm.formInput}
              name="zipcode"
              placeholder="Zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              required
            ></input>
            <button>住所検索</button>
          </div>
          <div className={styleForm.formSample}>
            <p className={styleForm.formLabel}>
              <span className={styleForm.formRequire}>必須</span>氏名
            </p>
            <input
              className={styleForm.formInput}
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className={styleForm.formSample}>
            <p className={styleForm.formLabel}>
              <span className={styleForm.formRequire}>必須</span>
              電話番号
            </p>
            <input
              className={styleForm.formInput}
              name="tel"
              placeholder="Tel"
              value={formData.tel}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className={styleForm.formSample}>
            <p className={styleForm.formLabel}>
              <span className={styleForm.formRequire}>必須</span>
              パスワード
            </p>
            <input
              className={styleForm.formInput}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className={styleForm.formSample}>
            <p className={styleForm.formLabel}>
              <span className={styleForm.formRequire}>必須</span>
              確認用パスワード
            </p>
            <input
              className={styleForm.formInput}
              type="password"
              name="Cpassword"
              placeholder="Confirmation Password"
              value={formData.Cpassword}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div>
            <Link href="../login  ">
            <input
              className={styleForm.formBtn}
              type="submit"
              value="登録する"
              onClick={onClickAdd}
            />
            </Link>
            <input
              className={styleForm.formBtn}
              type="submit"
              value="クリア"
              onClick={() => onClickClear()}
            />
            {/* <button className={styleForm.formBtn} onClick={onClickAdd}>
            登録
          </button>
          <button className={styleForm.formBtn} onClick={onClickTest}>
            テストボタン
          </button> */}
          </div>
        </div>
      </form>
    </>
  );
};

export default UserRegister;
