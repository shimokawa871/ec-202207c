import Head from 'next/head';
import ItemList from '../../components/ItemList';
import Header from '../../components/Header';
import HeaderCart from 'components/HeaderCart';
import HeaderOrder from 'components/HeaderOrder';
import HeaderLogin from 'components/HeaderLogin';
import HeaderLogout from 'components/HeaderLogout';
import Layout from '../../components/layout';
import styles from '../../components/layout.module.css';

export default function Page(){
    return (
      <Layout>
        <Head>
            <title>商品一覧</title>
        </Head>
        <Header
        menu1={<HeaderCart />}
        menu2={<HeaderOrder />}
        menu3={<HeaderLogin />}
        menu4={<HeaderLogout />}
      />  
      <form className={styles.searchContents}>
        <p className={styles.search}>商品を検索する</p>
        <div className={styles.itemTitle}>
          商品名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="text" className={styles.searchForm} />
        </div>
        <br />
        <button className={styles.searchButton}>検索</button>
        &nbsp;&nbsp;
        <button className={styles.clearButton}>クリア</button>
      </form>
      <ItemList />
    </Layout>
  );
}
