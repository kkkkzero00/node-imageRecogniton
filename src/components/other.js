import React from 'react';
const Test = ({name,age,star})=>{
    return (
        <div>
            <p>name: {name}</p>
            <p>age: {age}</p>
            <p>star: {star}</p>
        </div>
    )
}


class Other extends React.Component {
  constructor(props){
    super(props);

  } 
  render() {
    let testProps = {
        name:'hjk2',
        age:187,
        star:'five3342',
        list:()=>{
            console.log(list)
        }
    }
    return (
      <div>
        React 项目主页
        <Test {...testProps}/>
      </div>
    );
  }
}

export default Other;