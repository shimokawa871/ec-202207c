import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import useSWR from 'swr';
import ItemList from '../../components/ItemList';
import Header from '../../components/Header';
import HeaderCart from 'components/HeaderCart';
import HeaderOrder from 'components/HeaderOrder';
import HeaderLogin from 'components/HeaderLogin';
import HeaderLogout from 'components/HeaderLogout';
import Layout from '../../components/layout';

export default function Detail({ item }: any) {
  // console.log(item);

  const id = item.id;
  const name = item.name;
  const priceM = item.priceM;
  const priceL = item.priceL;
  const description = item.description;
  const imagePath = item.imagePath;

  const [price, setPrice] = useState(priceM);
  const [size, setSize] = useState(true);
  const [] = useState();

  function calc(b: any) {
    // setPrice(price)
    setPrice(b)

    let elements = document.getElementsByName('sizeChoice');
    // 0はMサイズ（true）1はLサイズ（false）
    setSize(elements[0].checked)
    console.log(size);

  }

  return (
    <>
      <Head>
        <title>らくらくピザ屋 - 商品詳細</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        menu1={<HeaderCart />}
        menu2={<HeaderOrder />}
        menu3={<HeaderLogin />}
        menu4={<HeaderLogout />}
      />  

      <div>
        <h3>商品詳細</h3>

        <Image src={imagePath} width={100} height={100} alt="logo" />
      </div>
      <h4>商品名:{name}</h4>
      <p>
        <span>説明:{description}</span>
      </p>

      <div>
        <span>サイズ</span>
        <label>
          <input
            type="radio"
            name="sizeChoice"
            value={priceM}
            onChange={(e: any) => calc(e.target.value)}
            checked
          />
          <span>&nbsp;М&nbsp;</span>&nbsp;&nbsp;{priceM}円(税抜)
        </label>
        <label>
          <input
            type="radio"
            name="sizeChoice"
            value={priceL}
            onChange={(e: any) => calc(e.target.value)}
          />
          <span>&nbsp;Ｌ</span>&nbsp;&nbsp;{priceL}円(税抜)
        </label>
      </div>

      <div>
        <label>
          トッピング：&nbsp;1つにつき
          <span>&nbsp;М&nbsp;</span>&nbsp;&nbsp;200円(税抜)
          <span>&nbsp;Ｌ</span>&nbsp;&nbsp;300円(税抜)
        </label>
        <Option size={size} priceM={priceM} priceL={priceL} price={price}/>
      </div>
      
      <Link href="/">
        <a>
          <input type="submit" value="カートに入れる" />
        </a>
      </Link>
    </>
  );
}

export async function getStaticPaths() {
  const url = `http://localhost:8000/items`;

  const res = await fetch(url);
  const items = await res.json();

  return {
    paths: items.map((item: any) => `/items/${item.id}`),
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { id: string };
}) {
  const url = `http://localhost:8000/items/${params.id}`;

  const res = await fetch(url);
  const item = await res.json();

  return {
    props: { item },
  };
}

// option のデータ表示
const fetcher = (resource: any, init: any) =>
  fetch(resource, init).then((res) => res.json());

export function Option(props: any){
  const { data, error } = useSWR('/api/options', fetcher);
  
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const optionPriceM = data[0].priceM;
  const optionPriceL = data[0].priceL;

  const size = props.size;
  const price = props.price;
  
  
  // オプションの料金がどっちか
  let optionPrice = size ? optionPriceM : optionPriceL;
  console.log(optionPrice);

  return <OptionData size={size} price={price} optionPrice={optionPrice} data={data} />
}

export function OptionData(props: any):any {
  
  const [singlePrice, setSinglePrice] = useState(props.price);

  function sizeJudge() {
    // チェックボックスにチェックが入っている数を数える
    const checkCount = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    ).length;
    console.log(checkCount);
   setSinglePrice(checkCount * props.optionPrice + Number(props.price));
    console.log(singlePrice);
  }
  
  return (
    <div>
      {props.data.map((d: any) => {
        return (
          <label key={d.id}>
            <input
              type="checkbox"
              value={d.name}
              onChange={() => sizeJudge()}
            />
            {d.name}
          </label>
        );
      })}
      <Total singlePrice ={singlePrice} />
    </div>
  )
}

// 個数と合計値の計算
export function Total(props: any) {

  const [itemCount, setItemCount] = useState(1);

  function totalCalc(num :number) {
    setItemCount(num)
  }

  return (
    <>
      <div>
        <label>
          数量:数量を選択してください
          <select
            name="area"
            onChange={(e: any) => totalCalc(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
      </div>

      <div>
        <span>
          この商品金額：<span>{itemCount * props.singlePrice}</span>円(税抜)
        </span>
      </div>
    </>
  );
}
