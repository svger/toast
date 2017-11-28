import React from 'react';
import Toast from '../src/Toast';
import styles from '../src/style/index.less'

class App extends React.Component {

    showToast = () => {
        Toast.success (<div><span style={{'verticalAlign': 'super'}}>loading</span></div>);
        Toast.danger (<div><span style={{'verticalAlign': 'super'}}>呵呵</span></div>, 0);
    }

    render() {

      return (
        <div style={{'height': '800px'}}>
            <button className="cefc-button" onClick={this.showToast}>
                Show Toast
            </button>
        </div>
    );
  }
}

export default App;
