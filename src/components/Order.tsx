import { useState } from 'react';

export function Order({ orderData }: { orderData: any }) {
  //注文ボタンが押されたらorderの中のstatusと宛先情報と支払い方法を更新する(画面上に表示させる必要はない)新規追加する？
  //fetchを使う。onClickOrder関数をボタンのonClickイベントで呼び出す
//const [idOrder, setIdOrder] = useState('');
  const [statusOrder, setStatusOrder] = useState('');
  const onChangeStatusOrder = (event: any) =>
    setStatusOrder(event.target.value);

  const [desNameOrder, setDesNameOrder] = useState('');
  const onChangeDesNameOrder = (event: any) =>
    setDesNameOrder(event.target.value);

  const [desEmailOrder, setDesEmailOrder] = useState('');
  const onChangeDesEmailOrder = (event: any) =>
    setDesEmailOrder(event.target.value);

  const [desZipCodeOrder, setDesZipCodeOrder] = useState('');
  const onChangeDesZipCodeOrder = (event: any) =>
    setDesZipCodeOrder(event.target.value);

  const [desAddressOrder, setDesAddressOrder] = useState('');
  const onChangeDesAddressOrder = (event: any) =>
    setDesAddressOrder(event.target.value);

  const [desTelOrder, setDesTelOrder] = useState('');
  const onChangeDesTelOrder = (event: any) =>
    setDesTelOrder(event.target.value);

  const [deliTimeOrder, setDeliTimeOrder] = useState('');
  const onChangeDeliTimeOrder = (event: any) =>
    setDeliTimeOrder(event.target.value);

  const [payOrder, setPayOrder] = useState('');
  const onChangePayOrder = (event: any) =>
    setPayOrder(event.target.value);

  //もし選択された決済方法がvalue=1ならstatusの値を1にする、2なら2
  //決済方法に入力された情報をとってくる(payOrder?)
  //とってきた情報をもとにstatusを更新する
  if (orderData.paymentMethod === 1) {
    //payOrder === 1
    orderData.status = 1; //statusOrder = 1;
  } else if (orderData.paymentMethod === 2) {
    //payOrder === 2
    orderData.status = 2; //statusOrder = 2;
  }

  //注文確認画面のボタンにonClickイベント(<Link href="/completion"><button onClick={()=>onClickOrder()}><a>注文</a></Link>)(新規追加)
  //更新→→fetch(`/api/orders/${orderData.id})　'PUT'
  //<input value={desNameOrder} onChange={onChangeStatusOrder}>
  const onClickOrder = () => {
    return fetch(`/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: statusOrder,
        destinationName: desNameOrder,
        destinationEmail: desEmailOrder,
        destinationZipCode: desZipCodeOrder,
        destinationAddress: desAddressOrder,
        destinationTel: desTelOrder,
        deliveryTime: deliTimeOrder,
        paymentMethod: payOrder,
      }),
    }).then((res) => res.json());
  };
}

//空のデータに新規で追加するならgetStaticPropsいらない？
export async function getStaticProps({ params }: any) {
  const id = params.id;
  const res = await fetch(`http://localhost:8000/orders/${id}`);
  const orderData = await res.json();
  if (!orderData.id) {
    return { notFound: true };
  }
  return { props: { orderData }, revalidate: 1 };
}

export async function getStaticPaths() {
  const res = await fetch(`http://localhost:8000/orders`);
  const orders = await res.json();
  const paths = orders.map((orderData: any) => ({
    params: { id: orderData.id.toString() },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
}
