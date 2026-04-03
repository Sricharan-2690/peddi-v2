import React, { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setWidth(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '2px',
        background: '#FF9D00',
        zIndex: 9998,
        transition: 'width 50ms linear',
        width: `${width}%`
      }}
    />
  );
}
