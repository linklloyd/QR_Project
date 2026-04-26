import { useState } from "react";
import { restaurant, categorias } from "../data/menu";
import { IconHamburger, IconSearch, IconClose, IconPin, IconClock, IconPhone } from "./Icons";
import "./Menu.css";

function FadeImage({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`img-wrapper ${className}-wrapper`}>
      {!loaded && <div className="img-skeleton" />}
      <img
        src={src}
        alt={alt}
        className={`${className} ${loaded ? "img-visible" : "img-hidden"}`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

export default function Menu() {
  const [categoriaActiva, setCategoriaActiva] = useState(categorias[0].id);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const categoria = categorias.find((c) => c.id === categoriaActiva);

  const resultados = query.trim()
    ? categorias.flatMap((c) =>
        c.platillos.filter(
          (p) =>
            p.nombre.toLowerCase().includes(query.toLowerCase()) ||
            p.descripcion.toLowerCase().includes(query.toLowerCase())
        )
      )
    : null;

  function seleccionarCategoria(id) {
    setCategoriaActiva(id);
    setDrawerOpen(false);
    setSearchOpen(false);
    setQuery("");
  }

  return (
    <div className="menu-wrapper">
      {/* Sidebar desktop */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>{restaurant.nombre}</h1>
          <p>{restaurant.descripcion}</p>
        </div>
        <nav className="sidebar-nav">
          {categorias.map((cat) => (
            <button
              key={cat.id}
              className={`sidebar-btn ${categoriaActiva === cat.id ? "activa" : ""}`}
              onClick={() => seleccionarCategoria(cat.id)}
            >
              {cat.nombre}
            </button>
          ))}
        </nav>
        <div className="sidebar-info">
          <p><IconPin /> {restaurant.direccion}</p>
          <p><IconClock /> {restaurant.horario}</p>
          <p><IconPhone /> {restaurant.telefono}</p>
        </div>
      </aside>

      <main className="menu-main">
        {/* Navbar mobile */}
        <nav className="mobile-navbar">
          <button className="nav-icon-btn" onClick={() => { setDrawerOpen(true); setSearchOpen(false); }}>
            <IconHamburger />
          </button>
          <span className="nav-title">{restaurant.nombre}</span>
          <button className="nav-icon-btn" onClick={() => { setSearchOpen((v) => !v); setQuery(""); }}>
            <IconSearch />
          </button>
        </nav>

        {/* Búsqueda mobile */}
        {searchOpen && (
          <div className="search-bar">
            <input
              autoFocus
              type="text"
              placeholder="Buscar platillo..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        )}

        {/* Drawer */}
        {drawerOpen && (
          <>
            <div className="drawer-overlay" onClick={() => setDrawerOpen(false)} />
            <div className="drawer">
              <div className="drawer-header">
                <span>{restaurant.nombre}</span>
                <button onClick={() => setDrawerOpen(false)}><IconClose /></button>
              </div>
              {categorias.map((cat) => (
                <button
                  key={cat.id}
                  className={`drawer-btn ${categoriaActiva === cat.id ? "activa" : ""}`}
                  onClick={() => seleccionarCategoria(cat.id)}
                >
                  {cat.nombre}
                </button>
              ))}
              <div className="drawer-info">
                <p><IconPin /> {restaurant.direccion}</p>
                <p><IconClock /> {restaurant.horario}</p>
                <p><IconPhone /> {restaurant.telefono}</p>
              </div>
            </div>
          </>
        )}

        {/* Hero mobile */}
        {!searchOpen && (
          <header className="mobile-header">
            <FadeImage src={restaurant.hero} alt={restaurant.nombre} className="hero-img" />
            <div className="mobile-title">
              <h1>{restaurant.nombre}</h1>
              <p>{restaurant.descripcion}</p>
            </div>
          </header>
        )}

        {/* Tabs mobile */}
        {!searchOpen && (
          <nav className="mobile-cats">
            {categorias.map((cat) => (
              <button
                key={cat.id}
                className={`cat-btn ${categoriaActiva === cat.id ? "activa" : ""}`}
                onClick={() => seleccionarCategoria(cat.id)}
              >
                {cat.nombre}
              </button>
            ))}
          </nav>
        )}

        {/* Resultados búsqueda o lista normal */}
        {resultados ? (
          <section className="platillos-lista">
            {resultados.length === 0 ? (
              <p className="sin-resultados">No se encontró ningún platillo</p>
            ) : (
              resultados.map((p) => (
                <PlatilloCard key={p.id} platillo={p} />
              ))
            )}
          </section>
        ) : (
          <>
            <div className="cat-banner">
              <FadeImage src={categoria.banner} alt={categoria.nombre} className="banner-img" />
              <div className="cat-banner-overlay">
                <h2>{categoria.nombre}</h2>
              </div>
            </div>
            <section className="platillos-lista">
              {categoria.platillos.map((p) => (
                <PlatilloCard key={p.id} platillo={p} />
              ))}
            </section>
          </>
        )}

        <footer className="menu-footer">
          <p>Precios en pesos mexicanos • IVA incluido</p>
        </footer>
      </main>
    </div>
  );
}

function PlatilloCard({ platillo }) {
  return (
    <div className="platillo-card">
      <FadeImage src={platillo.foto} alt={platillo.nombre} className="platillo-foto" />
      <div className="platillo-info">
        <h3>{platillo.nombre}</h3>
        <p>{platillo.descripcion}</p>
      </div>
      <span className="platillo-precio">${platillo.precio}</span>
    </div>
  );
}
