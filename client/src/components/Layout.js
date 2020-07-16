import React from 'react';
import Header from './Header';

const Layout = ({ children }) => (
  <>
  <Header />
  <div className="Layout">
  <div className="Layout__container">
      {children}
      </div>
  </div>
  </>
);

export default Layout;
