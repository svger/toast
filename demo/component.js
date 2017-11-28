import React from 'react';
import Toast from '../src/Toast';
import styles from '../src/style/index.less'

class App extends React.Component {

    showToast = () => {
        Toast.success (<div><span style={{'verticalAlign': 'super'}}>loading</span></div>);
    }

    render() {

      return (
        <div style={{'height': '800px'}}>
            <button className="bfd-button" onClick={this.showToast}>
                Show Toast
            </button>
        </div>
    );
  }
}

export default App;
