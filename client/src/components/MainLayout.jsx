import React, { useEffect, useRef } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { CourseProvider, useCourse } from '../context/CourseContext';
import { useLocation } from 'react-router-dom';

const MainLayoutContent = ({ children, showSidebar = true }) => {
  const { selectedTopic } = useCourse();
  const location = useLocation();
  const scrollRef = useRef(null);

  // Auto-scroll to top on topic change or route change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedTopic?.id, location.pathname]);

  return (
    <div className="main-layout">
      <Header />
      <div className="app-container">
        {showSidebar && <Sidebar />}
        <div 
          className={`page-content ${!showSidebar ? 'full-width' : ''}`}
          ref={scrollRef}
        >
          {children}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .main-layout {
          display: flex;
          flex-direction: column;
          height: 100vh;
          overflow: hidden;
          background: var(--app-bg);
          color: var(--app-text);
        }
        .app-container {
          display: flex;
          flex: 1;
          overflow: hidden;
        }
        .page-content {
          flex: 1;
          overflow-y: auto;
          background: var(--app-bg);
        }
        
        @media (max-width: 768px) {
          .app-container {
            flex-direction: column;
          }
        }
      `}} />
    </div>
  );
};

const MainLayout = (props) => (
  <CourseProvider>
    <MainLayoutContent {...props} />
  </CourseProvider>
);

export default MainLayout;
