import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import HeaderLogout from './HeaderLogout';

export default function HeaderLoginUserName(props: any) {
  const loginFlag = true;
  const [cookiesArray, setCookiesArray]: [string[], Function] =
    useState([]);
  useEffect(() => {
    //cookieの値を定数に代入
    const cookies = document.cookie;
    const array = cookies.split(';');
    if (array !== undefined) {
      setCookiesArray(array);
    }
  }, []);
  return (
    <>
      {cookiesArray.map((cookie) => {
        const cookieArray = cookie.split('=');
        if (loginFlag) {
          if (cookieArray[0] === ' name') {
            return (
              // eslint-disable-next-line react/jsx-key
              <a>{`こんにちは${cookieArray.slice(1)}`}さん</a>
            );
          }
        }
      })}
    </>
  );
}
