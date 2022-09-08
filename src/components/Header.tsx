import Link from 'next/link';
import Image from 'next/image';
import styles from './header.module.css';
import React from 'react';

export default function Header(props: any) {
  return (
    <header className={styles.header}>
      <h1>
        <Link href={'/items'}>
          <Image
            src={'/header_logo.png'}
            alt="ロゴ"
            width={195}
            height={35}
          />
        </Link>
      </h1>
      <nav className={styles.headerMenu}>
        <ul className={styles.menu}>
          <li className={styles.menuList}>{props.menu5}</li>
          <li className={styles.menuList}>{props.menu1}</li>
          <li className={styles.menuList}>{props.menu2}</li>
          <li className={styles.menuList}>{props.menu3}</li>
          <li className={styles.menuList}>{props.menu4}</li>
        </ul>
      </nav>
    </header>
  );
}
