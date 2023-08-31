import Link from 'next/link';
import css from './Nav.module.sass';

const pages = [
  { href: '/', name: 'Home' },
  { href: '/todo', name: 'To Do List' },
  // { href: '/about', name: 'About' },
  // { href: '/users', name: 'Users' },
  // { href: '/info', name: 'test FetchUser' },
  // { href: '/table', name: 'on mount tables' },
  // { href: '/table2', name: 'on click table' },
  // { href: '/static', name: 'static data' }
];

export default function Nav() {
  return <nav className={css.nav}>
    <ul>
      {pages.map(({ href, name }) => <li key={href}><Link href={href}>{name}</Link></li>)}
    </ul>
  </nav >;
}