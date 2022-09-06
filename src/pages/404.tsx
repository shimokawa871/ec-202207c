import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head';
import Header from '../components/Header';
import HeaderCart from 'components/HeaderCart';
import HeaderOrder from 'components/HeaderOrder';
import HeaderLogin from 'components/HeaderLogin';
import HeaderLogout from 'components/HeaderLogout';

export default function ErrorPage(){
  const router = useRouter()

  setTimeout(() => {
    window.location.href = "/items";
  }, 5000);

  return (
  <>
    <Head>
        <title>404 Not Found</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        menu1={<HeaderCart />}
        menu2={<HeaderOrder />}
        menu3={<HeaderLogin />}
        menu4={<HeaderLogout />}
      />
  {/* <p>{router.asPath}</p> */}
  <style jsx>{`
    a {
      text-decoration: underline;
    }

    .msg {
      color: #ff6347;
    }

  `}
  </style>
  <p className="msg">申し訳ございませんが、
  ご指定の商品は現在お取り扱いをしておりません。</p>

  <p>5秒後に<Link href="/items"><a>商品一覧</a></Link>へ戻ります。</p>
  </>
  )
 }
  
