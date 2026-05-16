import React, { createContext, useContext, useState, useEffect } from 'react';
import { courseData } from '../data/mockData';

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [selectedTopic, setSelectedTopic] = useState(() => {
    const savedId = localStorage.getItem('lastTopicId');
    if (savedId) {
      const all = courseData.flatMap(w => w.days.flatMap(d => d.topics));
      const found = all.find(t => t.id === savedId);
      if (found) return found;
    }
    return courseData[0].days[0].topics[0];
  });

  const [theme] = useState('light');
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(localStorage.getItem('isSidebarCollapsed') === 'true');
  const [userAssignments, setUserAssignments] = useState([]);

  const fetchUserAssignments = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (!userData?.token) return;
      
      const response = await fetch('/api/assignments/my', { // We'll create this route
        headers: { 'Authorization': `Bearer ${userData.token}` }
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setUserAssignments(data);
      }
    } catch (err) {
      console.error('Failed to fetch user assignments');
    }
  };

  useEffect(() => {
    fetchUserAssignments();
  }, []);

  useEffect(() => {
    if (selectedTopic?.id) {
      localStorage.setItem('lastTopicId', selectedTopic.id);
    }
  }, [selectedTopic]);

  useEffect(() => {
    localStorage.setItem('isSidebarCollapsed', isSidebarCollapsed);
  }, [isSidebarCollapsed]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  const toggleTheme = () => {};
  
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const toggleSidebarCollapse = () => setIsSidebarCollapsed(prev => !prev);

  return (
    <CourseContext.Provider value={{ 
      selectedTopic, 
      setSelectedTopic, 
      theme, 
      toggleTheme,
      isSidebarOpen,
      toggleSidebar,
      isSidebarCollapsed,
      toggleSidebarCollapse,
      userAssignments,
      refreshAssignments: fetchUserAssignments
    }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => useContext(CourseContext);
