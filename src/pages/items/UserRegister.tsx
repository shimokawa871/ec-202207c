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

  //jsonserverへ登録（テスト）
  const onClickAdd = () => {
    if (formData.userName === "") {
      return alert("ユーザー名を登録してください。")
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
      <h1>ユーザ登録</h1>
      <div>
        <p>名前:名前を入力してください</p>
        <input
          name="userName"
          placeholder="Name"
          value={formData.userName}
          onChange={handleChange}
        />
        <p>メールアドレス:メールアドレスを入力してください</p>
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        ></input>
        <p>郵便番号: 郵便番号を入力してください</p>
        <button>住所検索</button>
        <input
          name="zipcode"
          placeholder="Zipcode"
          value={formData.zipcode}
          onChange={handleChange}
        ></input>
        <p>住所: 住所を入力してください</p>
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        ></input>
        <p>電話番号: 電話番号を入力してください</p>
        <input
          name="tel"
          placeholder="Tel"
          value={formData.tel}
          onChange={handleChange}
        ></input>
        <p>パスワード: パスワードを入力してください</p>
        <input
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        ></input>
        <p>確認用パスワード: 確認用パスワードを入力してください</p>
        <input
          type="password"
          name="Cpassword"
          placeholder="Confirmation Password"
          value={formData.Cpassword}
          onChange={handleChange}
        ></input>
      </div>
      <div>
        <button onClick={onClickAdd}>登録</button>
        <button onClick={onClickClear}>クリア</button>
      </div>
    </>
  );
};

export default UserRegister;
