import Link from 'next/link';

export default function HeaderCart() {
  return (
    <Link href="/items/cart">
      <a>ショッピングカート</a>
    </Link>
  );
}
