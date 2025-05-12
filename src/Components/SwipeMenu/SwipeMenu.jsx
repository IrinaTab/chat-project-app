import React, { useState } from 'react';
import './SwipeMenu.css';

const SwipeMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleTouchStart = (e) => {
    const startX = e.touches[0].clientX;
    const startY = e.touches[0].clientY;

    e.data = { startX, startY };
  };

  const handleTouchMove = (e) => {
    if (!e.data) return;

    const { startX, startY } = e.data;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;

    const diffX = currentX - startX;
    const diffY = currentY - startY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        setIsMenuOpen(true);
      } else {
        setIsMenuOpen(false);
      }
    }
  };

  return (
    <div
      className="swipe-menu"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {isMenuOpen && <div className="menu">Меню</div>}
      <div className="content">Содержимое блока SwipeMenu</div>
    </div>
  );
};

export default SwipeMenu;
