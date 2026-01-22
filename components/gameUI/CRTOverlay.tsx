const CRTOverlay = () => {
  return (
    <>
      {/* Scanlines */}
      <div className="crt-overlay" />
      
      {/* Noise */}
      <div className="noise-overlay" />
      
      {/* Vignette effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(0,0,0,0.4) 100%)",
        }}
      />
      
      {/* Screen edge glow */}
      <div 
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          boxShadow: "inset 0 0 100px rgba(0, 255, 65, 0.03)",
        }}
      />
    </>
  );
};

export default CRTOverlay;
