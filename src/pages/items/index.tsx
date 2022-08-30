import Head from 'next/head';
//import Link from 'next/link';
// import ItemList from '../../components/ItemList';


export default function Page(){
    return (
      <>
        <Head>
            <title>商品一覧</title>
        </Head>
        <form>
            <p>商品を検索する</p>
            商品名&nbsp;&nbsp;<input
            type="text"/>
            <br/>
            <button>検索</button>&nbsp;&nbsp;
            <button>クリア</button>
        </form>
        {/* <ItemList /> */}
      </>
    );
}
