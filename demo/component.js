import React from 'react';
import Toast from '../src/Toast';
import Button from '@cefc-ui/button'

class App extends React.Component {

    componentDidMount() {
        console.log('APP componentDidUpdate')
        Toast.success (<span> 123 </span>);
    }

    showToast = () => {
        Toast.success (<span> 123 </span>);
    }

    render() {

      return (
        <div>
             <Button color="blue" block radius onClick={this.showToast} text="SHow Toast"/>
        </div>
    );
  }
}

export default App;
