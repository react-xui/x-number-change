/*
 * @Descripttion: 
 * @Author: tianxiangbing
 * @Date: 2018-11-30 15:11:03
 * @LastEditTime: 2020-10-27 20:51:38
 * @github: https://github.com/tianxiangbing
 */
import React from 'react';
import ReactDOM from 'react-dom';
import NumberChange from '../src/index';
import '../src/_index';
import './_app.less'
var appElement = document.getElementById('example');
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {v:1.123,isShow:true}
  }
  componentDidMount(){
  }
  render() {
    return (
      <div>
         {this.state.isShow && <NumberChange className="pr" timer={2000} value={this.state.v}></NumberChange>}
         <input type="text" onChange={(e)=>{
           this.setState({v:e.target.value})
         }}></input>
         <button onClick={()=>{
           this.setState({ isShow:!this.state.isShow })
          }
         }>隐藏</button>
      </div>
    )
  }
}
ReactDOM.render(<App />, appElement);