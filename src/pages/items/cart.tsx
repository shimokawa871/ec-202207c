import Head from 'next/head';
import Header from '../../components/Header';
import HeaderCart from 'components/HeaderCart';
import HeaderOrder from 'components/HeaderOrder';
import HeaderLogin from 'components/HeaderLogin';
import HeaderLogout from 'components/HeaderLogout';
import useSWR, { useSWRConfig } from 'swr';
import Image from 'next/image';
import styles from '../../components/itemList.module.css';
import Link from 'next/link';

let total: any = [];

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
        <h1>注文内容確認</h1>
        <thead>
                    <tr>
                      <th>商品名</th>
                      <th>サイズ・価格（税抜）・数量</th>
                      <th>トッピング・価格（税抜）</th>
                      <th>小計</th>
                    </tr>
                  </thead>
                  
      {data.map((orderItems: any) => {
        return (
          <>
            <div>
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
                        {/* {data.orderItems.orderToppingList.map((topping:any) => {
                          <>
                            <li>{`${topping}`}</li>
                          </>
                          })} */}
                        </ul>
                      </td>
                      <td>
                        <span>小計</span>
                      </td>
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
      <div>消費税：？？？円</div>
      <div>`ご注文金額合計：${total}円（合計）`</div>
    </>
  );
}
