import Head from 'next/head';

import Link from 'next/link';
import ItemList from '../../components/ItemList';
import Header from '../../components/Header';
import HeaderCart  from 'components/HeaderCart';
import HeaderOrder from 'components/HeaderOrder';
import HeaderLogin from 'components/HeaderLogin';
import HeaderLogout from 'components/HeaderLogout';



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
        <ItemList /> 

            <title>ラクラクピザ</title>
        </Head>
        <Header
        menu1={<HeaderCart />}
        menu2={<HeaderOrder />}
        menu3 ={<HeaderLogin />}
        menu4={<HeaderLogout />}
        />


        <form style={{textAlign:'center',width:'600px',padding:'1%',marginTop:'1%',marginBottom:'3%',marginLeft:'auto',marginRight:'auto',borderRadius:'5%',borderStyle:'dashed',borderColor:'#f0e68c',borderWidth:'3px'}}>
            <p style={{fontSize:'1.2rem',color:'#ff6347'}}>商品を検索する</p>
            <div style={{fontWeight:'bold',color:'#ff6347'}}>商品名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
            type="text"
            style={{height:'30px',width:'350px',borderStyle:'solid',borderWidth:'1px',borderColor:'#ff6347',marginBottom:'1%'}}/></div>
            <br/>
            <button style={{backgroundColor:'#ff6347',color:'white',fontWeight:'bold',borderRadius:'10%',border:'none',paddingTop:'8px',paddingBottom:'8px',paddingLeft:'15px',paddingRight:'15px'}}>検索</button>&nbsp;&nbsp;
            <button style={{backgroundColor:'lightgray',color:'white',fontWeight:'bold',borderRadius:'10%',border:'none',paddingTop:'8px',paddingBottom:'8px',paddingLeft:'15px',paddingRight:'15px'}}>クリア</button>
        </form>
        <ItemList />
      </>
    );
}
