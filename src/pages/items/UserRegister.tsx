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
import styleForm from 'styles/form.module.css';
import Header from '../../components/Header';
import HeaderCart from 'components/HeaderCart';
import HeaderOrder from 'components/HeaderOrder';
import HeaderLogin from 'components/HeaderLogin';
import HeaderLogout from 'components/HeaderLogout';

//各フォームのデータ型cd
type formValues = {
  userName: string;
  email: string;
  zipcode: string;
  address: string;
  tel: string;
  password: string;
  Cpassword: string;
  id: number;
};

const UserRegister = () => {
  const initialValues = {
    userName: '',
    email: '',
    zipcode: '',
    address: '',
    tel: '',
    password: '',
    Cpassword: '',
    id: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({} as any);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: any) => {
    //フォームを送信しないようにする
    e.preventDefault();
    //バリデーションチェックをする。
    setFormErrors(validate(formValues));
    const errNum = Object.keys(formErrors).length;
    if (errNum !== 0) {
      e.preventDefault();
      console.log(errNum);
    } else {
      //ログイン情報を送信する。
      return fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formValues.userName,
          mail: formValues.email,
          zipcode: formValues.zipcode,
          address: formValues.address,
          tel: formValues.tel,
          password: formValues.password,
          Cpassword: formValues.Cpassword,
        }),
      });
    }
  };

  const validate = (values: any) => {
    const errors = {} as any;
    const regex =
      /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    if (!values.userName) {
      errors.userName = '※ユーザ名を入力してください';
    }
    if (!values.email) {
      errors.email = '※メールアドレスを入力してください';
    } else if (!regex.test(values.email)) {
      errors.email = '※正しいメールアドレスを入力してください';
    }
    if (!values.zipcode) {
      errors.zipcode = '※郵便番号を入力してください';
    }
    if (!values.address) {
      errors.address = '※住所を入力してください';
    }
    if (!values.tel) {
      errors.tel = '※電話番号を入力してください';
    }
    if (!values.password) {
      errors.password = '※パスワードを入力してください';
    } else if (values.password.length < 4) {
      errors.password =
        '※4文字以上16文字以下のパスワードを入力してください';
    } else if (values.password.length > 16) {
      errors.password =
        '※4文字以上16文字以下のパスワードを入力してください';
    }
    if (values.password != values.Cpassword) {
      errors.Cpassword = 'パスワードが一致しません';
    }
    return errors;
  };

  return (
    <>
      <Header
        menu1={<HeaderCart />}
        menu2={<HeaderOrder />}
        menu3={<HeaderLogin />}
        menu4={<HeaderLogout />}
      />
      <div className={styleForm.formContainer}>
        <form>
          <h1 className={styleForm.head}>ユーザ登録</h1>
          <hr />
          <div className={styleForm.uiForm}>
            <div className={styleForm.formField}>
              <label>
                ユーザ名
                <small className={styleForm.errorMsg}>
                  {formErrors.userName}
                </small>
              </label>
              <input
                type="text"
                placeholder="Name"
                name="userName"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={styleForm.formField}>
              <label>
                メールアドレス
                <small className={styleForm.errorMsg}>
                  {formErrors.email}
                </small>
              </label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={styleForm.formField}>
              <label>
                郵便番号
                <small className={styleForm.errorMsg}>
                  {formErrors.zipcode}
                </small>
              </label>
              <input
                type="text"
                placeholder="Zipcode"
                name="zipcode"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={styleForm.formField}>
              <label>
                住所
                <small className={styleForm.errorMsg}>
                  {formErrors.address}
                </small>
              </label>
              <input
                type="text"
                placeholder="Address"
                name="address"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={styleForm.formField}>
              <label>
                電話番号
                <small className={styleForm.errorMsg}>
                  {formErrors.tel}
                </small>
              </label>
              <input
                type="text"
                placeholder="Tel"
                name="tel"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={styleForm.formField}>
              <label>
                パスワード
                <small className={styleForm.errorMsg}>
                  {formErrors.password}
                </small>
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={styleForm.formField}>
              <label>
                確認用パスワード
                <small className={styleForm.errorMsg}>
                  {formErrors.Cpassword}
                </small>
              </label>
              <input
                type="password"
                placeholder="Confirmation Password"
                name="Cpassword"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <button
              className={styleForm.submitButton}
              onClick={handleSubmit}
            >
              登録
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserRegister;
