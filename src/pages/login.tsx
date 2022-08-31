import Head from 'next/head';
import { useState } from 'react';
// import { userAgentFromString } from 'next/server';
// import { PassThrough } from 'stream';

// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import React, { ChangeEventHandler, SyntheticEvent, useState } from 'react';

export function User() {
  return fetch(
    'http://localhost:8000/users?mail=${email}&password=${pass}',
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return data.map((data: any) => {
        return {
          user: {
            id: data.id,
            email: data.email,
            password: data.password,
            logined: data.logined,
          },
        };
      });
    });
}

// const user = users.fiter(function(name1:any,){
//   if(name1.name === "setEmail")return true;
// });

export default function Login() {
  const [email, setEmail] = useState('');
  const onChangeEmail = (event: any) => setEmail(event.target.value);

  const [pass, setPass] = useState('');
  const onChangePass = (event: any) => setPass(event.target.value);

  return (
    <>
      <Head>
        <title>ログイン画面</title>
      </Head>
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
        <input type="submit" value="ログイン"></input>
      </form>
    </>
  );
}
