import useSWR from 'swr';
import Link from 'next/link';
import Image from 'next/image';

const fetcher = (resource:any,init:any) => fetch(resource,init).then((res)=>res.json());

export default function ItemList(){
    const {data,error} = useSWR('/api/items',fetcher);

    if(error) return <div>failed to load</div>;
    if(!data) return <div>loading...</div>;

    return (
        <table>
          <tbody>
            <tr>
            {data.map((item:any)=>{
              return(
                <>
                  <th>
                    <Link href={`/items/${item.id}`}>
                    <Image src={item.imagePath}
                    alt="ピザ"
                    width={200}
                    height={125}
                    />
                    </Link>
                    <br />
                    <Link href={`/items/${item.id}`}>
                      <a>{item.name}</a>
                    </Link>
                    <br />
                    <span className="size">M</span>&nbsp;{item.priceM}円(税抜)
                    <br/>
                    <span className="size">L</span>&nbsp;{item.priceL}円(税抜)
                  </th>
                </>
              )
            })}
            </tr>
          </tbody>
        </table>
    )
}
