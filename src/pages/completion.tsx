import Head from 'next/head';
import Link from 'next/link';
import Layout from 'components/layout';
import Header from 'components/Header';
import HeaderLoginUserName from 'components/HeaderLoginUserName';
import HeaderCart from 'components/HeaderCart';
import HeaderOrder from 'components/HeaderOrder';
import HeaderLogin from 'components/HeaderLogin';
import HeaderLogout from 'components/HeaderLogout';
import styles from 'components/completion.module.css';

export default function Completion() {
  return (
    <Layout>
      <Head>
        <title>注文完了</title>
      </Head>
      <Header
        menu5={<HeaderLoginUserName />}
        menu1={<HeaderCart />}
        menu2={<HeaderOrder />}
        menu3={<HeaderLogin />}
        menu4={<HeaderLogout />}
      />
      <div className={styles.comContents}>
        <div className={styles.completion}>
          <p className={styles.title}>決済が完了しました！</p>
          <p className={styles.text}>
            この度はご注文ありがとうございます。
            <br />
            お支払い先は、お送りしたメールに記載してありますのでご確認ください。
            <br />
            メールが届かない場合は「注文履歴」からご確認ください。
          </p>
        </div>
        <div>
          <Link href="/items">
            <button className={styles.topButton}>
              <a>トップに戻る</a>
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
