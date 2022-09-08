import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head';
import Header from '../components/Header';
import HeaderCart from 'components/HeaderCart';
import HeaderOrder from 'components/HeaderOrder';
import HeaderLogin from 'components/HeaderLogin';
import HeaderLogout from 'components/HeaderLogout';
import styles from '../styles/error.module.css';
import HeaderLoginUserName from '../../components/HeaderLoginUserName';

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
        menu5={<HeaderLoginUserName />}
      />
  {/* <p>{router.asPath}</p> */}
  <div className={styles.comContents}>
  <p>申し訳ございませんが、
  ご指定の商品は現在お取り扱いをしておりません。</p>

  <p>5秒後に<span className={styles.msg}>商品一覧</span>へ戻ります。</p>

  <Link href="/items"><a><button className={styles.topButton}>商品一覧へ戻る</button></a></Link>
  </div>
  </>
  )
 }
  
