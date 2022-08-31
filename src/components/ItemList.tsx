import useSWR from 'swr';
import Link from 'next/link';
import Image from 'next/image';
import styles from './itemList.module.css';

const fetcher = (resource: any, init: any) =>
  fetch(resource, init).then((res) => res.json());

export default function ItemList() {
  const { data, error } = useSWR('/api/items', fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className={styles.itemList}>
      {data.map((item: any) => {
        return (
          <>
            <div className={styles.item}>
              <Link href={`/items/${item.id}`}>
                <Image
                  src={item.imagePath}
                  alt="ピザ"
                  width={200}
                  height={125}
                />
              </Link>
              <p>
                <Link href={`/items/${item.id}`}>
                  <a>{item.name}</a>
                </Link>
                <br />
                <span className={styles.sizeM}>&nbsp;M&nbsp;</span>
                &nbsp;{item.priceM}円(税抜)
                <br />
                <span className={styles.sizeL}>&nbsp;L&nbsp;</span>
                &nbsp;{item.priceL}円(税抜)
              </p>
            </div>
          </>
        );
      })}
    </div>
  );
}
