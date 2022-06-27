import styles from './header.module.css'
import logoAzul from '../../img/logo-azul.png';

const Header = () => {
  return (
    <header>
      <picture>
        <img src={logoAzul} alt='Logo Pipo Saúde' className={styles.logo} />
      </picture>
      <nav className={styles.menu}>
        <ol>
          <li>Sobre nós</li>
          <li><a>A Pipo Saúde</a></li>
          <li><a>Carreiras</a></li>
          <li><a>Imprensa</a></li>
        </ol>
        <ol>
          <li>Para RH</li>
          <li><a>Nossa Solução</a></li>
          <li><a>Pipo para Startups</a></li>
          <li><a>Conheça nossos cases</a></li>
          <li><a>Resumo das operadoras</a></li>
        </ol>
        <a>Para colaboradores</a>
        <ol>
          <li>Conteúdos</li>
          <li><a>Blog</a></li>
          <li><a>Materiais</a></li>
          <li><a>Estatísticas do COVID-19</a></li>
          <li><a>Central de ajuda</a></li>
        </ol>
      </nav>
      <section className='nav-bar-buttons'>
        <button>Plataforma Pipo</button>
        <button>Quero uma cotação</button>
      </section>
    </header>
  );
};

export default Header;