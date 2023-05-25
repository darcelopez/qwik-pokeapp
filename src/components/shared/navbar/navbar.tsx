import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { QwikLogo } from '../icons/qwik';
import styles from './navbar.module.css';

export default component$(() => {
  return (
    <header class={styles.header}>
      <div class={['container', styles.wrapper]}>
        <div class={styles.logo}>
          <Link href="/" title="qwik">
            <QwikLogo height={50}/>
          </Link>
        </div>
        <ul>
          {/* <li>
            <a href="https://qwik.builder.io/docs/components/overview/" target="_blank">
              Docs
            </a>
          </li>
          <li>
            <a href="https://qwik.builder.io/examples/introduction/hello-world/" target="_blank">
              Examples
            </a>
          </li>
          <li>
            <a href="https://qwik.builder.io/tutorial/welcome/overview/" target="_blank">
              Tutorials
            </a>
          </li> */}
          <li>
            <Link href="/login/">Login</Link> 
          </li>
          <li>
            <Link href="/dashboard/">Admin Dashboard</Link> 
          </li>
          <li>
            <Link href="/pokemons/list-ssr/">SSR-List</Link> 
          </li>
          <li>
            <Link href="/pokemons/list-client/">Client-List</Link> 
          </li>
          <li>
            <Link href="/counter/">Counter</Link> 
          </li>
        </ul>
      </div>
    </header>
  );
});
