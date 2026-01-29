import React, { useState, useEffect } from 'react';
import UploadSection from './components/UploadSection';
import AnalysisResult from './components/AnalysisResult';

// Premium Background Component
const PremiumBackground = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate random stars
    const generatedStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 2,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="premium-bg">
      {/* Animated Gradient Orbs */}
      <div className="gradient-orb gradient-orb-1"></div>
      <div className="gradient-orb gradient-orb-2"></div>
      <div className="gradient-orb gradient-orb-3"></div>
      <div className="gradient-orb gradient-orb-4"></div>

      {/* Mesh Gradient Overlay */}
      <div className="mesh-overlay"></div>

      {/* Animated Stars */}
      <div className="stars">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Grid Pattern */}
      <div className="grid-pattern"></div>

      {/* Noise Texture */}
      <div className="noise-overlay"></div>

      {/* Top Glow Line */}
      <div className="top-glow"></div>
    </div>
  );
};

function App() {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (file) => {
    setLoading(true);
    setError(null);
    setAnalysisData(null);

    const formData = new FormData();
    formData.append('resume', file);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed. Please try again.');
      }

      const data = await response.json();
      setAnalysisData(data.analysis);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Premium Animated Background */}
      <PremiumBackground />

      <div className="relative min-h-screen text-slate-200 font-sans">
        {/* Glassmorphism Navigation */}
        <nav className="w-full py-6 px-8 border-b border-white/5 bg-slate-950/40 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-center">
            {/* Logo with gradient - larger font */}
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-red-400 via-rose-300 to-white bg-clip-text text-transparent">
              Smart Resume AI
            </h1>
          </div>
        </nav>

        <main className="container mx-auto px-4 pt-16 pb-20">
          {/* Hero Section with enhanced styling */}
          <div className="text-center mb-16 relative">
            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Main heading with gradient */}
            <h2 className="relative text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Optimize Your Resume
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-400 via-rose-400 to-red-300 bg-clip-text text-transparent">
                with AI
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Get instant, ATS-friendly feedback on your resume. Uncover hidden opportunities and
              <span className="text-red-400"> improve your chances </span>
              of landing your dream job.
            </p>

          </div>

          {/* Upload Section with glass effect wrapper */}
          <div className="glass-card rounded-2xl p-8 mb-10 max-w-2xl mx-auto">
            <UploadSection onUpload={handleUpload} isLoading={loading} error={error} />
          </div>

          {/* Analysis Results */}
          <AnalysisResult data={analysisData} />
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 py-6 text-center text-slate-500 text-sm">
          <p>© 2026 Smart Resume AI. Built with ❤️ using React & DeepSeek</p>
        </footer>
      </div>
    </>
  );
}

export default App;
