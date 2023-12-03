import React from 'react';
import Frame from './components/Frame';
import InfiniteMenuComponent from './components/InfiniteMenu';
import './App.scss'; // assuming you converted base.css to App.scss

const App: React.FC = () => {
  return (
    <div>
      <Frame />
      <InfiniteMenuComponent />
    </div>
  );
};

export default App;
