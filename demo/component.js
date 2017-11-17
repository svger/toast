import React from 'react';
import Toast from '../src/Toast';
import Button from '@cefc-ui/button'
import Icon from '@cefc-ui/icon'

class App extends React.Component {

    showToast = () => {
        Toast.success (<div><Icon type="reload" inline className='bfd-message'/><span style={{'verticalAlign': 'super'}}>loading</span></div>);
    }

    render() {

      return (
        <div style={{'height': '800px'}}>
             <Button color="blue" block radius onClick={this.showToast} text="Show Toast"/>
        </div>
    );
  }
}

export default App;
