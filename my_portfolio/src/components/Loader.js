function Loader({ hidden }) {
  return (
    <div id="loader" className={hidden ? 'hidden' : ''}>
      <div className="loader-ring"></div>
      <div className="loader-text">Jai Sarathi</div>
    </div>
  );
}

export default Loader;
