import useSWR from 'swr';
import Link from 'next/link';
import Image from 'next/image';

const fetcher = (resource: any, init: any) =>
  fetch(resource, init).then((res) => res.json());

export default function ItemList() {
  const { data, error } = useSWR('/api/items', fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    // <table>
    //   <tbody>
    //     <tr>
    //     {data.map((item:any)=>{
    //       return(
    //         <>
    //           <th>
    //             <Link href={`/items/${item.id}`}>
    //             <Image src={item.imagePath}
    //             alt="ピザ"
    //             width={200}
    //             height={125}
    //             />
    //             </Link>
    //             <br />
    //             <Link href={`/items/${item.id}`}>
    //               <a>{item.name}</a>
    //             </Link>
    //             <br />
    //             <span className="size">M</span>&nbsp;{item.priceM}円(税抜)
    //             <br/>
    //             <span className="size">L</span>&nbsp;{item.priceL}円(税抜)
    //           </th>
    //         </>
    //       )
    //     })}
    //     </tr>
    //   </tbody>
    // </table>
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width:'1100px',
        gap:'2%',
        textAlign:'center',
        marginTop:'0',
        marginBottom:'0',
        marginLeft:'auto',
        marginRight:'auto',

      }}
    >
      {data.map((item: any) => {
        return (
          <>
            <div style={{border:'solid',borderColor:'lightgray',margin:'15px'}}>
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
                <span className="size"
                style={{backgroundColor:'#ff6347',padding:'1px',border:'solid',borderColor:'#ff6347',borderRadius:'30%',lineHeight:'1.9',color:'white',fontSize:'12px',fontWeight:'bold'}}>&nbsp;M&nbsp;</span>&nbsp;{item.priceM}
                円(税抜)
                <br />
                <span className="size"
                style={{backgroundColor:'#ff6347',paddingTop:'1px',paddingBottom:'1px',paddingLeft:'2.85px',paddingRight:'2.85px',border:'solid',borderColor:'#ff6347',borderRadius:'30%',lineHeight:'1.9',color:'white',fontSize:'12px',fontWeight:'bold'}}>&nbsp;L&nbsp;</span>&nbsp;{item.priceL}
                円(税抜)
              </p>
            </div>
          </>
        );
      })}
    </div>
  );
}
