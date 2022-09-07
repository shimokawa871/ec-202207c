import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import HeaderCart from '../components/HeaderCart';
import HeaderOrder from '../components/HeaderOrder';
import HeaderLogin from '../components/HeaderLogin';
import HeaderLogout from '../components/HeaderLogout';
import useSWR, { useSWRConfig } from 'swr';
import { useRouter } from 'next/router';
import { any } from 'prop-types';

// これを使うのか？？？？
// https://swr.vercel.app/ja/docs/mutation

// export function App () {
//   const { mutate } = useSWRConfig()

//   return (
//     <div>
//       <button onClick={() => {
//         // クッキーを期限切れとして設定します
//         document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

//         // このキーを使用してすべての SWR に再検証するように指示します
//         mutate('/api/user')
//       }}>
//         Logout
//       </button>
//     </div>
//   )
// }

export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  //db.jsonにユーザ情報があるかの確認フラグ
  const [dataJudge, setDataJudge] = useState(false);
  //ログインユーザのIDと名前
  const [logInUserId, setLogInUserId] = useState('');
  const [logInUserName, setLogInUserName] = useState('');

  const router = useRouter();

  //フォームに入力された値をステートに付与
  const onChangeEmail = (event: any) => setEmail(event.target.value);
  const onChangePass = (event: any) => setPass(event.target.value);

  //db.jsonからログインユーザ情報を取得
  fetch(
    `http://localhost:8000/users?mail=${email}&password=${pass}`,
    {
      method: 'GET',
    }
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data[0].name)
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

    //ログインボタン
    const handleClick = () => {
      if (dataJudge === false) {
        return alert("ユーザ情報が誤っています。")
      } else if (dataJudge === true) {
        // router.push("/index");
        document.cookie = `id=${logInUserId}; max-age=86400`;
        document.cookie = `name=${logInUserName}; max-age=86400`;
      }
    }
    //****cookieの取り扱い***//
    //***変数にcookieの値を格納(cookieがない状態で実行すると怒られる)
    // let resultId = document.cookie
    // console.log(resultId)
    //console.log(resultId) ---> "id=1; name=喜島郁莉"
    //***cookieを即時削除する関数
    const deleteCookie = () => {
      document.cookie = `id=${logInUserId}; max-age=0`
      document.cookie = `name=${logInUserName}; max-age=0`
    }
    //idとnameで別々に取り出す
    let userIdCookie : any
    let userNameCookie : any
    const getCookieData = () => {
      document.cookie.split('; ').forEach((cookie) => {
        let [key, value] = cookie.split("=");
        if (key === "id") {
          userIdCookie = value;
        } else if (key === "name") {
          userNameCookie = value;
        }
      })
      return  alert(`${userIdCookie}  ${userNameCookie}`);
    }

  return (
    <>
      <Head>
        <title>ログイン画面</title>
      </Head>
      <Header
        menu1={<HeaderCart />}
        menu2={<HeaderOrder />}
        menu3={<HeaderLogin />}
        menu4={<HeaderLogout />}
      />
      <h1>ログイン</h1>
      <form>
        <div>メールアドレス：</div>
        <input
          type="text"
          id="mail"
          name="mail"
          value={email}
          onChange={onChangeEmail}
        />

        <div>パスワード：</div>
        <input
          type="password"
          id="pass"
          name="pass"
          value={pass}
          onChange={onChangePass}
        />
        <button type="submit" name="ログイン" onClick={handleClick}>ログイン</button>
        <button onClick={deleteCookie}>ログアウト</button>
        <button onClick={getCookieData}>クッキーデータ取得</button>
        <small style={{ display: 'block' }}>
          <a
            href="http://localhost:3000/items/UserRegister"
            style={{ color: 'blue', textDecoration: 'underline' }}
          >
            ユーザ登録はこちら
          </a>
        </small>
      </form>
    </>
  );
}
