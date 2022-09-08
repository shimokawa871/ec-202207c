import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import HeaderCart from '../components/HeaderCart';
import HeaderOrder from '../components/HeaderOrder';
import HeaderLogin from '../components/HeaderLogin';
import HeaderLogout from '../components/HeaderLogout';
import HeaderLoginUserName from '../components/HeaderLoginUserName';
import React from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { useRouter } from 'next/router';
import { any } from 'prop-types';
import sL from '../styles/login.module.css';
import Link from 'next/link';

export default function Login() {
  //inputの値の初期値
  const initialValues = {
    email: '',
    password: '',
  };
  //フォームの入力値をステートで管理
  const [formValues, setFormValues] = useState(initialValues);
  //db.jsonにユーザ情報があるかの確認フラグ
  const [dataJudge, setDataJudge] = useState(false);
  //ログインユーザのIDと名前をステートで管理
  const [logInUserId, setLogInUserId] = useState('');
  const [logInUserName, setLogInUserName] = useState('');
  //エラー文をステートで管理formErrorsはオブジェクト
  const [formErrors, setFormErrors] = useState({} as any);
  //フォームの入力値を反映
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //db.jsonからログインユーザ情報を取得
  fetch(
    `http://localhost:8000/users?mail=${formValues.email}&password=${formValues.password}`,
    {
      method: 'GET',
    }
  )
    .then((res) => res.json())
    .then((data) => {
      //ログインユーザ情報が存在すれば、ステートに付与
      if (data.length === 1) {
        setDataJudge(true);
        setLogInUserId(data[0].id);
        setLogInUserName(data[0].name);
        //存在しない場合はjudgeフラグ変更なし
      } else {
        setDataJudge(false);
      }
    });

  //バリデーションチェック
  const validate = (values: any) => {
    //エラー文を格納する空のオブジェクトを生成
    const errors = {} as any;
    //メールアドレスの正規表現
    const regex =
      /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    if (values.email === '') {
      errors.email = '※メールアドレスを入力してください';
    } else if (!regex.test(values.email)) {
      errors.email = '※正しいメールアドレスを入力してください';
    }
    if (dataJudge === false) {
      errors.password = '※パスワードに誤りがあります';
    }
    return errors;
  };

  //ログインボタン
  const handleClick = (e: any) => {
    //バリデーションチェックをする
    setFormErrors(validate(formValues));
    //エラーの数を変数に格納
    const errNum = Object.keys(formErrors).length;
    if (errNum !== 0) {
      return
    } else if (dataJudge === true) {
      document.cookie = `id=${logInUserId}; max-age=86400`;
      document.cookie = `name=${logInUserName}; max-age=86400`;
      //商品一覧ページに遷移
      window.location.href = 'http://localhost:3000/login';

    }
  };

  //****cookieの取り扱い***//
  //***変数にcookieの値を格納(cookieがない状態で実行すると怒られる)
  // let resultId = document.cookie
  // console.log(resultId)
  //console.log(resultId) ---> "id=1; name=喜島郁莉"
  //***cookieを即時削除する関数
  const deleteCookie = () => {
    document.cookie = `id=${logInUserId}; max-age=0`;
    document.cookie = `name=${logInUserName}; max-age=0`;
  };
  //idとnameで別々に取り出す
  let userIdCookie: any;
  let userNameCookie: any;
  const getCookieData = () => {
    document.cookie.split('; ').forEach((cookie) => {
      let [key, value] = cookie.split('=');
      if (key === 'id') {
        userIdCookie = value;
      } else if (key === 'name') {
        userNameCookie = value;
      }
    });
    return alert(`${userIdCookie}  ${userNameCookie}`);
  };
  return (
    <>
      <Head>
        <title>ログイン画面</title>
      </Head>
      <Header
        menu5={<HeaderLoginUserName />}
        menu1={<HeaderCart />}
        menu2={<HeaderOrder />}
        menu3={<HeaderLogin />}
        menu4={<HeaderLogout />}
        logInUserId={logInUserId}
        logInUserName={logInUserName}
      />

      <div>
        <div className={sL.body}>
          <div className={sL.loginBox}>
            <div className={sL.leftBox}>
              <form>
                <h1 className={sL.h1}>ログイン</h1>
                <small className={sL.errorMsg}>
                  {formErrors.email}
                </small>
                <input
                  className={sL.form3}
                  placeholder="メールアドレス"
                  type="email"
                  id="email"
                  name="email"
                  value={formValues.email}
                  onChange={(e) => handleChange(e)}
                />
                <small className={sL.errorMsg}>
                  {formErrors.password}
                </small>
                <input
                  className={sL.form3}
                  placeholder="パスワード"
                  type="password"
                  id="password"
                  name="password"
                  value={formValues.password}
                  onChange={(e) => handleChange(e)}
                />
                <input
                  className={sL.submit}
                  type="button"
                  name="login-button"
                  value="ログイン"
                  onClick={handleClick}
                />
              </form>
              <Link href="http://localhost:3000/items/UserRegister">
                <small className={sL.small}>ユーザ登録はこちら</small>
              </Link>
            </div>
            <div className={sL.rightBox}>
              <span className={sL.loginWithSns}>SNSでログイン</span>
              <button className={sL.snsFacebook}>
                FaceBookでログイン
              </button>
              <button className={sL.snsGoogle}>
                Googleでログイン
              </button>
              <button className={sL.snsTwitter}>
                Twitterでログイン
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [pass, setPass] = useState('');
//   //db.jsonにユーザ情報があるかの確認フラグ
//   const [dataJudge, setDataJudge] = useState(false);
//   //ログインユーザのIDと名前をステートで管理
//   const [logInUserId, setLogInUserId] = useState('');
//   const [logInUserName, setLogInUserName] = useState('');

//   //ログインユーザのIDと

//   //フォームに入力された値をステートに付与
//   const onChangeEmail = (event: any) => setEmail(event.target.value);
//   const onChangePass = (event: any) => setPass(event.target.value);

//   //db.jsonからログインユーザ情報を取得
//   fetch(
//     `http://localhost:8000/users?mail=${email}&password=${pass}`,
//     {
//       method: 'GET',
//     }
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       // console.log(data[0].name)
//       //ログインユーザ情報が存在すれば、ステートに付与
//       if (data.length === 1) {
//         setDataJudge(true);
//         setLogInUserId(data[0].id);
//         setLogInUserName(data[0].name);
//         //存在しない場合はjudgeフラグ変更なし
//       } else {
//         setDataJudge(false);
//       }
//     });

//   //ログインボタン
//   const handleClick = () => {
//     if (dataJudge === false) {
//       return alert('ユーザ情報が誤っています。');
//     } else if (dataJudge === true) {
//       // router.push("/index");
//       document.cookie = `id=${logInUserId}; max-age=86400`;
//       document.cookie = `name=${logInUserName}; max-age=86400`;
//     }
//   };
//   //****cookieの取り扱い***//
//   //***変数にcookieの値を格納(cookieがない状態で実行すると怒られる)
//   // let resultId = document.cookie
//   // console.log(resultId)
//   //console.log(resultId) ---> "id=1; name=喜島郁莉"
//   //***cookieを即時削除する関数
//   const deleteCookie = () => {
//     document.cookie = `id=${logInUserId}; max-age=0`;
//     document.cookie = `name=${logInUserName}; max-age=0`;
//   };
//   //idとnameで別々に取り出す
//   let userIdCookie: any;
//   let userNameCookie: any;
//   const getCookieData = () => {
//     document.cookie.split('; ').forEach((cookie) => {
//       let [key, value] = cookie.split('=');
//       if (key === 'id') {
//         userIdCookie = value;
//       } else if (key === 'name') {
//         userNameCookie = value;
//       }
//     });
//     return alert(`${userIdCookie}  ${userNameCookie}`);
//   };

//   return (
//     <>
//       <Head>
//         <title>ログイン画面</title>
//       </Head>
//       <Header
//         menu5={<HeaderLoginUserName />}
//         menu1={<HeaderCart />}
//         menu2={<HeaderOrder />}
//         menu3={<HeaderLogin />}
//         menu4={<HeaderLogout />}
//         logInUserId={logInUserId}
//         logInUserName={logInUserName}
//       />
//       <h1>ログイン</h1>
//       <form>
//         <div>メールアドレス：</div>
//         <input
//           type="text"
//           id="mail"
//           name="mail"
//           value={email}
//           onChange={onChangeEmail}
//         />

//         <div>パスワード：</div>
//         <input
//           type="password"
//           id="pass"
//           name="pass"
//           value={pass}
//           onChange={onChangePass}
//         />
//         <button type="submit" name="ログイン" onClick={handleClick}>
//           ログイン
//         </button>
//         <button onClick={deleteCookie}>ログアウト</button>
//         <button onClick={getCookieData}>クッキーデータ取得</button>
//         <small style={{ display: 'block' }}>
//           <a
//             href="http://localhost:3000/items/UserRegister"
//             style={{ color: 'blue', textDecoration: 'underline' }}
//           >
//             ユーザ登録はこちら
//           </a>
//         </small>
//       </form>
//     </>
//   );
// }
