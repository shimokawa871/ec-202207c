import Head from 'next/head';
import Header from '../../components/Header';
import HeaderLoginUserName from 'components/HeaderLoginUserName';
import HeaderCart from 'components/HeaderCart';
import HeaderOrder from 'components/HeaderOrder';
import HeaderLogin from 'components/HeaderLogin';
import HeaderLogout from 'components/HeaderLogout';
import Layout from '../../components/layout';
import Search from 'components/Search';
import useSWR from 'swr';

export const fetcher = (resource: any, init: any) =>
  fetch(resource, init).then((res) => res.json());

export default function Page() {
  const { data, error } = useSWR('/api/items', fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Layout>
      <Head>
        <title>ラクラクピザ</title>
      </Head>
      <Header
       menu5={<HeaderLoginUserName />}
        menu1={<HeaderCart />}
        menu2={<HeaderOrder />}
        menu3={<HeaderLogin />}
        menu4={<HeaderLogout />}
      />
      <Search />
    </Layout>
  );
}
