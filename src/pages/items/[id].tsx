import Head from 'next/head';
import Image from 'next/image';

export default function Detail({item}: any) {
  console.log(item);

  const id = item.id;
  const name = item.name;
  const priceM = item.priceM;
  const priceL = item.priceL;
  const description = item.description;

  return (
    <>
      <Head>
        <title>らくらくピザ屋 - 商品詳細</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <p>
          <a href="#">ショッピングカート</a>&nbsp;&nbsp;
          <a href="#">注文履歴</a>&nbsp;&nbsp;
          <a href="#">ログイン</a>&nbsp;&nbsp;
          <a href="#">ログアウト</a>
        </p>
      </header>
      <div>
        <h3>商品詳細</h3>
        {/* <Image src="https://1.bp.blogspot.com/-CAroinPVLPw/X9GYFpVZ4DI/AAAAAAABcs8/EVBG1MUGq9wj56i-HKNzi5JHpDaERVlxwCNcBGAsYHQ/s509/food_pizza_whole.png" width={64} height={64} alt="item-image" /> */}
      </div>
      <h4>商品名:{name}</h4>
      <p>
        <span>価格:{priceM}</span>
      </p>
      <p>
        <span>説明:{description}</span>
      </p>

      <div>
        <span>サイズ</span>
        <label>
          <input
            type="radio"
            name="size-choice"
            // checked="checked"
          />
          <span>&nbsp;М&nbsp;</span>&nbsp;&nbsp;{priceM}円(税抜)
        </label>
        <label>
          <input type="radio" name="size-choice" />
          <span>&nbsp;Ｌ</span>&nbsp;&nbsp;{priceL}円(税抜)
        </label>
      </div>

      <div>
        <label>
          トッピング：&nbsp;1つにつき
          <span>&nbsp;М&nbsp;</span>&nbsp;&nbsp;200円(税抜)
          <span>&nbsp;Ｌ</span>&nbsp;&nbsp;300円(税抜)
        </label>

        <div>
          <label className="checkbox-inline">
            <input type="checkbox" value="" />
            オニオン
          </label>
          <label className="checkbox-inline">
            <input type="checkbox" value="" />
            チーズ
          </label>
          <label className="checkbox-inline">
            <input type="checkbox" value="" />
            ピーマン
          </label>
          <label className="checkbox-inline">
            <input type="checkbox" value="" />
            ロースハム{' '}
          </label>
          <br />
          <label className="checkbox-inline">
            <input type="checkbox" value="" />
            ほうれん草
          </label>
          <label className="checkbox-inline">
            <input type="checkbox" value="" />
            ぺパロに
          </label>
          <label className="checkbox-inline">
            <input type="checkbox" value="" />
            グリルナス
          </label>
          <label className="checkbox-inline">
            <input type="checkbox" value="" />
            あらびきソーセージ
          </label>
        </div>
      </div>

      <div>
        <label>
          数量:数量を選択してください
          <select name="area">
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
          この商品金額：<span>****</span>円(税抜)
        </span>
      </div>
      <input type="submit" value="カートに入れる" />
    </>
  );
}

// 1
// APIサーバからidのリストを取ってくる
export async function getStaticPaths() {
  const url = `http://localhost:8000/items`

  const res = await fetch(url);
  const items = await res.json()

  return {
    paths: items.map((item :any) => `/items/${item.id}`),
    fallback: false,
  };
}

// 2
// 該当ページの情報を取ってくるURLを作成
export async function getStaticProps({ params }: { params: {id:string} }) {

const url = `http://localhost:8000/items/${params.id}`

const res = await fetch(url);
const item = await res.json()

return {
props: {item},
};
}
