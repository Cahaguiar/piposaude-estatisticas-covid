import styles from './header.module.css'
import logoAzul from '../../img/logo-azul.png';
import setaCinza from '../../img/seta-cinza.png';
import { BiMenu } from 'react-icons/bi';
import { useState } from 'react';

const Header = () => {
  const [active, setMode] = useState(false);
  const ToggleMode = () => {
    setMode(!active);
  }
  return (
    <header>
      <section className={styles.headerSection}>
        <img src={logoAzul} alt='Logo Pipo Saúde' className={styles.logo} />
        <section onClick={ToggleMode} onKeyPress={ToggleMode} className={styles.iconMenuHamburguer}>
          <BiMenu tabIndex={"0"} role={"button"} aria-expanded="false" aria-label="menu"/>
        </section>
        <nav className={`${styles.menu} ${active ? styles.menuOpen : styles.menuClose}`}>
          <ul className={styles.menuList}>
            <li className={styles.menuItems}>
              <a href='#'>Sobre nós</a>
              <img src={setaCinza} className={styles.arrowIcon} />
              <ul>
                <li><a href='#'>Pipo Saúde</a></li>
                <li><a href='#'>Carreiras</a></li>
                <li><a href='#'>Imprensa</a></li>
              </ul>
            </li>
            <li className={styles.menuItems}>
              <a href='#'>Para RH</a>
              <img src={setaCinza} className={styles.arrowIcon} />
              <ul>
                <li><a href='#'>Nossa Solução</a></li>
                <li><a href='#'>Pipo para Startups</a></li>
                <li><a href='#'>Conheça nossos cases</a></li>
                <li><a href='#'>Resumo das operadoras</a></li>
              </ul>
            </li>
            <li className={styles.menuItems}>
              <a href='#'>Conteúdos</a>
              <img src={setaCinza} className={styles.arrowIcon} />
              <ul>
                <li><a href='#'>Blog</a></li>
                <li><a href='#'>Materiais</a></li>
                <li><a href='#'>Central de ajuda</a></li>
              </ul>
            </li>
            <li className={styles.menuItems}><a href='#'>Estatísticas COVID-19</a></li>
          </ul>
          <ul className={styles.listOfLinkButtons}>
            <li className={styles.pipoPlatform}><a href='#'>Plataforma Pipo</a></li>
            <li className={styles.quotesLink}><a role="button" tabindex="0" className={styles.quoteLink}>Quero uma cotação</a></li>  
          </ul>
        </nav>
      </section>
    </header>
  );
};

export default Header;