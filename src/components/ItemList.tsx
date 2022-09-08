import useSWR from 'swr';
import Link from 'next/link';
import Image from 'next/image';
import styles from './itemList.module.css';

export const fetcher = (resource: any, init: any) =>
  fetch(resource, init).then((res) => res.json());

export default function ItemList() {
  const { data, error } = useSWR('/api/items', fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const sortList = data.sort(function (a: any, b: any) {
    return a.priceM - b.priceM;
  });

  return (
    <div className={styles.itemList}>
      {sortList.map((item: any) => {
        return (
          <>
            <div className={styles.item}>
              <Link href={`/items/${item.id}`}>
                <a>
                  <Image
                    src={item.imagePath}
                    alt="ピザ"
                    width={200}
                    height={125}
                  />
                  <div className={styles.itemText}>
                    <p className={styles.itemName}>{item.name}</p>
                    <br />
                    <span className={styles.sizeM}>
                      &nbsp;M&nbsp;
                    </span>
                    &nbsp;{item.priceM.toLocaleString()}円(税抜)
                    <br />
                    <span className={styles.sizeL}>
                      &nbsp;L&nbsp;
                    </span>
                    &nbsp;{item.priceL.toLocaleString()}円(税抜)
                  </div>
                </a>
              </Link>
            </div>
          </>
        );
      })}
    </div>
  );
}
