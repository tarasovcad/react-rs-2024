const Loader = () => {
  return (
    <div className="loader-overlay" data-testid="loader-overlay">
      <div className="loader-section" data-testid="loader-section">
        <div className="loader1" data-testid="loader1"></div>
        <div className="loader" data-testid="loader2"></div>
      </div>
    </div>
  );
};

export default Loader;
