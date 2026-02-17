import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Resume from './components/Resume';
import TournamentDemo from './components/TournamentDemo';
import DocDemo from './components/DocDemo';
import AuditDemo from './components/AuditDemo';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      // Check if user has "completed" navigation (simplified to always prompt for now)
      e.preventDefault();
      const message = "you didn't see my portfolio completely are you sure to close Mr. Masthan Basha work";
      e.returnValue = message;
      return message;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className="App">
      <WhatsAppButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
        {/* Demo Route */}
        <Route path="/project-demo/tournament" element={
          <React.Suspense fallback={<div>Loading Demo...</div>}>
            <TournamentDemo />
          </React.Suspense>
        } />
        <Route path="/project-demo/doc2book" element={
          <React.Suspense fallback={<div>Loading Demo...</div>}>
            <DocDemo />
          </React.Suspense>
        } />
        <Route path="/project-demo/audit" element={
          <React.Suspense fallback={<div>Loading Demo...</div>}>
            <AuditDemo />
          </React.Suspense>
        } />
      </Routes>
    </div>
  );
}

export default App;
