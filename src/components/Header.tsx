import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header(props:any){
    return(
        <header style={{display:'flex',justifyContent:'space-between'}}>
            <h1>
              <Link href={'/api/items'}>
                <Image
                  src={'/header_logo.png'}
                  alt="ロゴ"
                  width={195}
                  height={35}
                />
              </Link>
            </h1>
            <nav style={{width:'auto'}}>
                <ul style={{listStyle:'none',display:'flex',gap:'3%',paddingLeft:'0',minWidth:'400px'}}>
                    <li style={{whiteSpace:'nowrap'}}>{props.menu}</li>
                    <li style={{whiteSpace:'nowrap'}}>{props.menu}</li>

                    {/* <li style={{whiteSpace:'nowrap'}}><Link href=""><a>ショッピングカート</a></Link></li>
                    <li style={{whiteSpace:'nowrap'}}><Link href=""><a>注文履歴</a></Link></li>
                    <li style={{whiteSpace:'nowrap'}}><Link href=""><a>ログイン</a></Link></li>
                    <li style={{whiteSpace:'nowrap'}}><Link href=""><a>ログアウト</a></Link></li> */}
                </ul>
            </nav>
        </header>
    )
}
