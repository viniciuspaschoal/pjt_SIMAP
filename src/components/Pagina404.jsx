function Pagina404() {
  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
      color: '#333',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '20px',
      textAlign: 'center',
    }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '0.5rem', color: '#0DB35D' }}>404</h1>
      <h2 style={{ marginBottom: '1.5rem' }}>Página não encontrada</h2>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        Ops! A página que você tentou acessar não existe.
      </p>
      <button
        onClick={() => window.history.back()}
        style={{
          backgroundColor: '#0DB35D',
          color: 'white',
          border: 'none',
          padding: '0.75rem 1.5rem',
          borderRadius: '5px',
          fontSize: '1rem',
          cursor: 'pointer',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0b7c41'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0DB35D'}
      >
        Voltar
      </button>
    </div>
  );
}

export default Pagina404;
