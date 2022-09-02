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

  //登録ボタン処理
  const onClickRegister = () => {
    alert();
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
  // setFormData({
  //   userName: '名前は必須項目です。',
  //   email: 'メールアドレスは必須項目です。',
  //   zipcode: '郵便番号は必須項目です。',
  //   address: '住所は必須項目です。',
  //   tel: '電話番号は必須項目です。',
  //   password: 'パスワードは必須項目です。',
  //   Cpassword: 'パスワードは必須項目です。',
  //   id: '',
  // });

  //jsonserverへ登録（テスト）
  const onClickAdd = () => {
    if (formData.userName === '') {
      return alert('名前を入力してください');
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

  return (
    <>
      <form className={styleForm.form}>
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
          ></input>
        </div>
        <div className={styleForm.formSample}>
          <p className={styleForm.formLabel}>
            <span className={styleForm.formRequire}>必須</span>
            郵便番号
          </p>
          <button>住所検索</button>
          <input
            className={styleForm.formInput}
            name="zipcode"
            placeholder="Zipcode"
            value={formData.zipcode}
            onChange={handleChange}
          ></input>
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
              onClick={onClickClear}
            />
        </div>
      </form>
    </>
  );
};

export default UserRegister;
