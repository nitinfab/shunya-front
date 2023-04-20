import React from 'react';
import Board from './board/';

import { ThemeContext, themes } from './theme-context';
import { ToolsProvider } from './board/context/tools.js';

class MainSpace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: document.body.clientWidth * 0.82, // set width to 82% of body width
      height: document.body.clientHeight * 0.9 // set height to 90% of body height
    };
  }

  handleWindowResize = () => {
    this.setState({
      width: document.body.clientWidth * 0.82,
      height: document.body.clientHeight * 0.9
    });
  }

  render() {
    const { height, width } = this.state;

    return <div style={{ height: "100%",maxWidth:"100%" }}>
      <ThemeContext.Provider value={themes.light}>
        <ToolsProvider>
          <div className="App" style={{ width: `${width}px`, height: `${height}px`, }}>
            <Board width={width} height={height} />
          </div>
        </ToolsProvider>
      </ThemeContext.Provider>
      </div>
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
  }
}

export default MainSpace;
