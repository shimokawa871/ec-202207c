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
import HeaderCart from '../../components/HeaderCart';
import HeaderOrder from '../../components/HeaderOrder';
import HeaderLogin from '../../components/HeaderLogin';
import HeaderLogout from '../../components/HeaderLogout';
import HeaderLoginUserName from '../../components/HeaderLoginUserName';

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
//inputの値の初期値
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
  //フォームの入力値をステートで管理
  const [formValues, setFormValues] = useState(initialValues);
  //エラー文をステートで管理formErrorsはオブジェクト
  const [formErrors, setFormErrors] = useState({} as any);
  //フォームの入力値を反映
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //登録ボタン
  const handleSubmit = (e: any) => {
    //フォームを送信しないようにする
    e.preventDefault();
    //バリデーションチェックの結果を別変数に代入
    const validateResult = validate(formValues)
    let errNum = Object.keys(validateResult).length;
    if(errNum >= 1) {
      setFormErrors(validateResult);
    } else if (errNum === 0) {
      //ログイン情報を送信する。
          fetch('/api/users', {
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
        alert("ユーザ登録が完了しました！")
        window.location.href = 'http://localhost:3000/login';
      }
  };

  //バリデーションチェック
  const validate = (values: any) => {
    //エラー文を格納する空のオブジェクトを生成
    const errors = {} as any;
    //メールアドレスの正規表現
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
        menu5={<HeaderLoginUserName />}
      />
      <div className={styleForm.formContainer}>
        <form>
          <h1 className={styleForm.head}>ユーザ登録</h1>
          <hr className={styleForm.hr}/>
          <div className={styleForm.uiForm}>
            <div className={styleForm.formField}>
              <label>
                {/* 名前 */}
                <small className={styleForm.errorMsg}>
                  {formErrors.userName}
                </small>
              </label>
              <input
                type="text"
                placeholder="名前"
                name="userName"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={styleForm.formField}>
              <label>
                {/* メールアドレス */}
                <small className={styleForm.errorMsg}>
                  {formErrors.email}
                </small>
              </label>
              <input
                type="email"
                placeholder="メールアドレス"
                name="email"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={styleForm.formField}>
              <label>
                {/* 郵便番号 */}
                <small className={styleForm.errorMsg}>
                  {formErrors.zipcode}
                </small>
              </label>
              <input
                type="text"
                placeholder="郵便番号"
                name="zipcode"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={styleForm.formField}>
              <label>
                {/* 住所 */}
                <small className={styleForm.errorMsg}>
                  {formErrors.address}
                </small>
              </label>
              <input
                type="text"
                placeholder="住所"
                name="address"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={styleForm.formField}>
              <label>
                {/* 電話番号 */}
                <small className={styleForm.errorMsg}>
                  {formErrors.tel}
                </small>
              </label>
              <input
                type="text"
                placeholder="電話番号"
                name="tel"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={styleForm.formField}>
              <label>
                {/* パスワード */}
                <small className={styleForm.errorMsg}>
                  {formErrors.password}
                </small>
              </label>
              <input
                type="password"
                placeholder="パスワード"
                name="password"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={styleForm.formField}>
              <label>
                {/* 確認用パスワード */}
                <small className={styleForm.errorMsg}>
                  {formErrors.Cpassword}
                </small>
              </label>
              <input
                type="password"
                placeholder="確認用パスワード"
                name="Cpassword"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <button
              className={styleForm.submitButton}
              onClick={(e) => handleSubmit(e)}
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
