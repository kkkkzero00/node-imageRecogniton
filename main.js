import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Index from './src/components/index';
import Other from './src/components/other';

class Main extends React.Component {

  construtor(props){
    

  }

  renderComponets(){
    let useRouter = false;
    let indexProps = {
      title:'index'
    }
    if(useRouter){
      return (<Router>
                <div>
                  <ul>
                    <li><Link to="/">主页</Link></li>
                    <li><Link to="other">其他页面</Link></li>
                  </ul>

                    <Route exact path="/" component={Index} />
                    <Route path="/other" component={Other} />
                </div>
              </Router>)
    }else{
      return (<Index {...indexProps}/>)
    }
  }

  render() {
    return (
      <div>
        {this.renderComponets()}
      </div>
    );
  }
}

ReactDOM.render(
  <Main/>,
  document.getElementById("app")
);