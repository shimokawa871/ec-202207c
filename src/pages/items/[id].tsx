import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import useSWR from 'swr';

export default function Detail({ item }: any) {
  console.log(item);

  const id = item.id;
  const name = item.name;
  const priceM = item.priceM;
  const priceL = item.priceL;
  const description = item.description;
  const imagePath = item.imagePath;

  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [number, setNumber] = useState(1);
  const [size, setSize] = useState("");

  function calc(price: any) {
    setPrice(price);
    setNumber(number);
    setSize(price);

    // console.log(price);
    // console.log(number);
    setTotal(price * number);
  }

  return (
    <>
      <Head>
        <title>らくらくピザ屋 - 商品詳細</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>{/* Headerコンポーネント */}</header>
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
            name="size-choice"
            value={priceM}
            onChange={(e: any) => calc(e.target.value)}
          />
          <span>&nbsp;М&nbsp;</span>&nbsp;&nbsp;{priceM}円(税抜)
        </label>
        <label>
          <input
            type="radio"
            name="size-choice"
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
        <OptionData size ={size} />
      </div>
      <div>
        <label>
          数量:数量を選択してください
          <select
            name="area"
            onChange={(e: any) => setNumber(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </label>
      </div>

      <div>
        <span>
          この商品金額：<span>{total}</span>円(税抜)
        </span>
      </div>
      {/* リンク先変える */}
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

function OptionData({size}) {
  const { data, error } = useSWR('/api/options', fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  console.log(data);
  console.log(data.name);

  function sizeJudge() {
    console.log(size);

    // sizeMとsizeLの値はそれぞれ違うけどとりあえず1のデータで！
    if(size === 1380){
      console.log(size);
    }
  }

  return (
    <div>
      {data.map((d: any) => {
        return (
          <label key={d.id}>
            <input type="checkbox" value={d.name} onChange={() => sizeJudge()} />
            {d.name}
          </label>
        );
      })}
    </div>
  );
}
