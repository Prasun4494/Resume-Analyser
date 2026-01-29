import React, { useState } from 'react';
import UploadSection from './components/UploadSection';
import AnalysisResult from './components/AnalysisResult';

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

    try {
      // Assuming server runs on localhost:5000 - In production this should be env var
      const response = await fetch('http://localhost:5000/api/analyze', {
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
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500 selection:text-white font-sans">
      <nav className="w-full py-6 px-8 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white tracking-tight">Smart Resume AI</h1>
          <div className="text-sm text-slate-500">Powered by Gemini</div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Optimize Your Resume with AI
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Get instant, ATS-friendly feedback on your resume. Uncover hidden opportunities and improve your chances of landing your dream job.
          </p>
        </div>

        <UploadSection onUpload={handleUpload} isLoading={loading} error={error} />

        <AnalysisResult data={analysisData} />
      </main>
    </div>
  );
}

export default App;
