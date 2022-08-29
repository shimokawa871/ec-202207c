import Head from 'next/head';
import Link from 'next/link';
import ItemList from '../../components/ItemList';
import Header from '../../components/Header';
import HeaderCart  from 'components/HeaderCart';
import HeaderOrder from 'components/HeaderOrder';


export default function Page(){
    return (
      <>
        <Head>
            <title>商品一覧</title>
        </Head>
        <Header menu={<HeaderCart />}/>


        <form>
            <p>商品を検索する</p>
            商品名&nbsp;&nbsp;<input
            type="text"/>
            <br/>
            <button>検索</button>&nbsp;&nbsp;
            <button>クリア</button>
        </form>
        <ItemList />
      </>
    );
}
