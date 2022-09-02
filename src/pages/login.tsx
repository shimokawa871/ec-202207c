import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import HeaderCart from 'components/HeaderCart';
import HeaderOrder from 'components/HeaderOrder';
import HeaderLogin from 'components/HeaderLogin';
import HeaderLogout from 'components/HeaderLogout';


  // fetch(`http://localhost:8000/userhttp://localhost:8000/users?mail=${}&pass=${}`)
  //   .then(res => res.json())
  //   .then((data) => {
  //     })

      // サイズ１の配列を見つける

      import useSWR, { useSWRConfig } from 'swr'



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
  const [email, setEmail] =useState("");
  const onChangeEmail = (event:any) => setEmail(event.target.value);

  const [pass, setPass] = useState("");
  const onChangePass = (event:any) => setPass(event.target.value);



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
      <form >


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
        <input type="submit" value="ログイン"></input>
      </form >
    </>
  );
}
