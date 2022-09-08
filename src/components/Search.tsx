import { useState } from 'react';
import styles from './search.module.css';
import itemListStyles from './itemList.module.css';
import useSWR from 'swr';
import ItemList from './ItemList';
import Link from 'next/link';
import Image from 'next/image';

export const fetcher = (resource: any, init: any) =>
  fetch(resource, init).then((res) => res.json());

export default function Search() {
  const { data, error } = useSWR('/api/items', fetcher);

  //formの入力される値の書き換え用
  const [searchWord, setSearchWord] = useState('');
  //form内の値が変更された時に発火するメソッド(stateの値をformに記述された値に変換)
  const searchOnInput = (event: any) => {
    setSearchWord(event.target.value);
  };

  //formで検索された値を保存する用
  const [searchData, setSearchData] = useState([]);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  //検索ボタンイベント
  const onSearch = () => {
    setSearchData(
      data.filter((event: any) => {
        return event.name.indexOf(searchWord) >= 0; //data配列の中からsearchWordが0以上のものを検索してフィルターにかける
      })
    );
  };

  //クリアボタンイベント
  const onClickClear = () => {
    setSearchWord('');
    setSearchData([]);
  };

  return (
    <>
      <form
        method="post"
        action="#"
        className={styles.searchContents}
      >
        <p className={styles.search}>商品を検索する</p>
        <div className={styles.itemTitle}>
          商品名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            type="text"
            id="name"
            name="name"
            value={searchWord}
            onChange={searchOnInput}
            className={styles.searchForm}
          />
        </div>
        <br />
        <button
          type="button"
          value="SEARCH"
          onClick={() => onSearch()}
          className={styles.searchButton}
        >
          検索
        </button>
        &nbsp;&nbsp;
        <button
          type="reset"
          onClick={() => onClickClear()}
          className={styles.clearButton}
        >
          クリア
        </button>
      </form>

      <div className={styles.searchResult}>
        {searchWord === '' ? ( //入力項目が空だったら
          <ItemList />
        ) : data.find((a: any) => a !== searchWord) ? (
          <p>該当商品がありません</p>
        ) : (
          searchData.map((item: any) => {
            return (
              <div key={item.id} className={itemListStyles.item}>
                <Link href={`/items/${item.id}`}>
                  <a>
                    <Image
                      src={item.imagePath}
                      alt="ピザ"
                      width={200}
                      height={125}
                    />
                    <div className={itemListStyles.itemText}>
                      <p className={itemListStyles.itemName}>
                        {item.name}
                      </p>
                      <br />
                      <span className={itemListStyles.sizeM}>
                        &nbsp;M&nbsp;
                      </span>
                      &nbsp;{item.priceM}円(税抜)
                      <br />
                      <span className={itemListStyles.sizeL}>
                        &nbsp;L&nbsp;
                      </span>
                      &nbsp;{item.priceL}円(税抜)
                    </div>
                  </a>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
