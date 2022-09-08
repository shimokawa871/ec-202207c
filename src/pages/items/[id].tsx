import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import useSWR from 'swr';
import Header from '../../components/Header';
import HeaderCart from 'components/HeaderCart';
import HeaderOrder from 'components/HeaderOrder';
import HeaderLogin from 'components/HeaderLogin';
import HeaderLogout from 'components/HeaderLogout';
import styles from '../../styles/detail.module.css';

export default function Detail({ item }: any) {
  // getStaticPropsでとってきたdb.json（items）のデータ
  const id = item.id;
  const name = item.name;
  const priceM = item.priceM;
  const priceL = item.priceL;
  const description = item.description;
  const imagePath = item.imagePath;

  // MサイズかLサイズか
  const [price, setPrice] = useState(priceM);
  const [size, setSize] = useState('M');

  // サイズを選んだ時に走る処理
  function calcM(e: any) {
    setPrice(e.target.value);
    console.log(e.target.value);
    setSize('M');
  }

  function calcL(e: any) {
    setPrice(e.target.value);
    console.log(e.target.value);
    setSize('L');
  }

  return (
    <>
      <Head>
        <title>{name} | 商品詳細</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        menu1={<HeaderCart />}
        menu2={<HeaderOrder />}
        menu3={<HeaderLogin />}
        menu4={<HeaderLogout />}
      />

      <div className={styles.container}>
        <div className={styles.itemImgCenter}>
          <h3 className={styles.textCenter}>商品詳細</h3>

          <div className={styles.imagePicture}>
          <Image
            src={imagePath}
            width={300}
            height={200}
            alt={name}
          />
          </div>
        {/* 商品名 */}
        <h4 className={styles.itemName}>{name}</h4>
        <p>
          {/* 説明 */}
          <span className={styles.mainDes}>{description}</span>
        </p>
        </div>
        <div className={styles.selectField}>
          <span className={styles.selectMenu}>サイズ</span>
          <br />
          <label>
            <input
              type="radio"
              name="sizeChoice"
              value={priceM}
              onChange={calcM}
              defaultChecked
            />
            <span className={styles.price}>&nbsp;М&nbsp;</span>
            &nbsp;&nbsp;{priceM}円(税抜)
          </label>
          <label>
            <input
              type="radio"
              name="sizeChoice"
              value={priceL}
              onChange={calcL}
            />
            <span className={styles.price}>&nbsp;Ｌ</span>&nbsp;&nbsp;
            {priceL}円(税抜)
          </label>
        </div>

        <div className={styles.selectField}>
          <label className={styles.selectMenu}>
            トッピング：
            <br />
            &nbsp;1つにつき
            <span>&nbsp;М&nbsp;</span>&nbsp;&nbsp;200円(税抜)
            <span>&nbsp;Ｌ</span>&nbsp;&nbsp;300円(税抜)
          </label>
          <Option
            name={name}
            size={size}
            priceM={priceM}
            priceL={priceL}
            price={price}
            imagePath={imagePath}
          />
          <div>{price}</div>
          <div>{size}</div>
        </div>
      </div>
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

export function Option(props: any) {
  const { data, error } = useSWR('/api/options', fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  // dataはdb.json（options）の情報が入っている

  //Mサイズ、Lサイズそれぞれの値段を取得
  // 要検討
  const optionPriceM = data[0].priceM;
  const optionPriceL = data[0].priceL;

  const size = props.size;
  const price = props.price;
  const name = props.name;
  const imagePath = props.imagePath;

  // オプションの料金がどっちか
  let optionPrice = size === 'M' ? optionPriceM : optionPriceL;

  return (
    <OptionData
      name={name}
      size={size}
      price={price}
      optionPrice={optionPrice}
      data={data}
      imagePath={imagePath}
    />
  );
}

export function OptionData(props: any): any {
  // 1枚の値段（オプションなしで）
  const [singlePrice, setSinglePrice] = useState(props.price);

  const price = props.price;
  const name = props.name;
  const imagePath = props.imagePath;
  const size = props.size;
  const optionPrice = props.optionPrice;

  // 追加したオプションの種類を格納する箱
  const [optionList, setOptionList] = useState(Array());

  // オプションにチェックを入れると処理が走る
  function optionChange(e: any) {
    const checkCount = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    ).length;

    if (optionList.includes(e.target.value)) {
      setOptionList(
        optionList.filter((item) => item !== e.target.value)
      );
    } else {
      setOptionList([...optionList, e.target.value]);
    }

    // setSinglePrice((optionList.length +1) * props.optionPrice + Number(props.price));
    setSinglePrice(
      checkCount * props.optionPrice + Number(props.price)
    );
  }

  return (
    <div>
      <div className={styles.selectField}>
        {props.data.map((d: any) => {
          return (
            <label key={d.id}>
              <input
                type="checkbox"
                value={d.name}
                onChange={optionChange}
              />
              {d.name}
            </label>
          );
        })}
      </div>
      <Total
        singlePrice={singlePrice}
        price={price}
        name={name}
        imagePath={imagePath}
        size={size}
        optionPrice={optionPrice}
        optionList={optionList}
      />
      <div>{optionList}</div>
    </div>
  );
}

// 個数と合計値の計算
export function Total(props: any) {
  const [itemCount, setItemCount] = useState(1);

  function totalCalc(num: number) {
    setItemCount(num);
  }

  const total = itemCount * props.singlePrice;

  return (
    <>
      <div className={styles.selectField}>
        <label>
          <span className={styles.selectMenu}>
            数量：
            <br />
            数量を選択してください
          </span>
          <br />
          <select
            className={styles.selectBox}
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
        <span className={styles.totalPrice}>
          合計金額：<span>{total}</span>
          円(税抜)
        </span>
      </div>

      <AddCart
        total={total}
        itemCount={itemCount}
        price={props.price}
        name={props.name}
        imagePath={props.imagePath}
        size={props.size}
        optionPrice={props.optionPrice}
        optionList={props.optionList}
      />
    </>
  );
}

export function AddCart({
  total,
  itemCount,
  price,
  name,
  imagePath,
  size,
  optionPrice,
  optionList,
}: any) {
  // カートに情報をプッシュする
  const add = (e: any) => {
    // e.preventDefault();
    console.log('カートに追加完了');

    // サーバへ送りたいデータ
    const output = {
      name: name,
      imagePath: imagePath,
      size: size,
      price: price, //1枚あたり（オプションなし）の値段
      quantity: itemCount,
      orderToppingList: optionList,
      optionPrice: optionPrice, //Optionコンポーネント ---> optionPriceの値（200円か300円か）
      subTotal: total, //Totalコンポーネント ---> totalの値
    };

    // FetchAPIのオプション準備
    const param = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      // リクエストボディ
      body: JSON.stringify(output),
    };

    fetch('http://localhost:8000/orderItems', param)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
      });
  };

  return (
    <Link href="/items/cart">
      <a>
        <input
          className={styles.cartAddButton}
          type="submit"
          value="カートに入れる"
          onClick={add}
        />
      </a>
    </Link>
  );
}
