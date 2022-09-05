import Head from 'next/head';
import Header from '../../components/Header';
import HeaderCart from 'components/HeaderCart';
import HeaderOrder from 'components/HeaderOrder';
import HeaderLogin from 'components/HeaderLogin';
import HeaderLogout from 'components/HeaderLogout';
import useSWR, { useSWRConfig } from 'swr';
import Image from 'next/image';
import styles from '../../components/cart.module.css';
import Link from 'next/link';
import OrderItems from 'components/orderItemList';


const fetcher = (resource: any, init: any) =>
fetch(resource, init).then((res) => res.json());

export default function Cart() {
  const { data, error } = useSWR(
    'http://localhost:8000/orderItems',
    fetcher
    );
    const { mutate } = useSWRConfig();
    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;
    
    const onClickDelete = (id: number) => {
      fetch(`http://localhost:8000/orderItems/${id}`, {
        method: 'delete',
      });
      mutate('http://localhost:8000/orderItems');
    };
    
    let total: any = 0;
  
    let  onClickAdd = () =>{
      location.href = "https://www.google.com/?hl=ja";
    }

  return (
    <>
      <Head>
        <title>ショッピングカート</title>
      </Head>
      <Header
        menu1={<HeaderCart />}
        menu2={<HeaderOrder />}
        menu3={<HeaderLogin />}
        menu4={<HeaderLogout />}
      />
        <div className={styles.searchContents }>
        <h1></h1>
        <thead className={styles.th}>
                    <tr>
                      <th className={styles.th}>商品名</th>
                      <th className={styles.th}>サイズ・価格(税抜)・数量</th>
                      <th className={styles.th}>トッピング・価格（税抜）</th>
                      <th className={styles.th}>小計</th>
                    </tr>
                  </thead>
                  
      {data.map((orderItems: any) => {
        return (
          <>
            <div >
              <div>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <Image
                          src={orderItems.imagePath}
                          alt="ピザ"
                          width={150}
                          height={100}
                        />
                        <p>{`${orderItems.name}`}</p>
                      </td>
                      <td>
                        <span>{`${orderItems.size}　${orderItems.price}円　${orderItems.quantity}個`}</span>
                      </td>
                      <td>
                        <ul>
                        {orderItems.orderToppingList.map((topping:any) => {
                          return (
                          <>
                            <li className={styles.list}>
                              <p>{`${topping}`}　{`${orderItems.optionPrice}`}円</p>
                              </li>
                          </>
                          )
                          })}
                        </ul>
                      </td>
                      <td>{`${orderItems.subTotal}円`} </td>
                      <td>
                        <button
                          onClick={() => onClickDelete(orderItems.id)}
                        >
                          削除
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );
      }
      )
      }
      {/* {const price = {OrderItems.subTotal:any} */}
      {data.map((data: any) => {
          total += data.subTotal}
          )
      }
      <div>{`消費税：${Math.floor(total * 1.08 - total)}円`}</div>
        <div>{`ご注文金額合計：${Math.floor(total * 1.08)}円（合計）`}</div>
      {/* } */}
        <input 
        value={"注文に進む"}
        className={styles.btn}
        type="submit"
        onClick={onClickAdd}
        />
        </div>
    </>
  );
}