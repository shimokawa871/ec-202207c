import Link from 'next/link';

export default function HeaderCart() {
  return (
    <Link href="/cart">
      <a>ショッピングカート</a>
    </Link>
  );
}
