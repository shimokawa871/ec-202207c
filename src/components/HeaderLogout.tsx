import Link from 'next/link';
import { useState } from 'react';
import React from 'react';

export default function HeaderLogout() {
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
    // return  alert(`${userIdCookie}  ${userNameCookie}`);
  };
  const deleteCookie = () => {
    getCookieData();
    document.cookie = `id=${userIdCookie}; max-age=0`;
    document.cookie = `name=${userNameCookie}; max-age=0`;
    window.location.href = 'http://localhost:3000/login';
  };

  return (
    <Link href="/login">
      <a onClick={deleteCookie}>ログアウト</a>
    </Link>
  );
}
