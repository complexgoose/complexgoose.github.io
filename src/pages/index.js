import React from'react'
import Global from '../components/Global.js'
import verbs from "../files/verbs.json"

class Word extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={y:0};
    }
    componentDidUpdate()
    {
        if(this.state.y==0) this.setState((state, props) =>({y:state.y-200}));
    }
    render()
    {
        return(<p style={{position:"absolute",transform:"translateY("+this.state.y+"px)"}}className="scroll">{verbs[this.props.index]}</p>);
    }
}

class IndexPage extends React.Component
{
    constructor()
    {
        super();
        this.state={index:0};
    }
    componentDidMount()
    {
        setInterval(this.add,1);
        //this.add();
    }
    words = [];
    add = ()=>
    {
        this.setState({index:this.state.index+1});
        this.words.push(<Word index={this.state.index}/>)
        setTimeout(this.remove,1000);
    }
    remove()
    {
        this.words.pop();
    }
    render()
    {
        return(
            <div style={{height:"100vh",display:"flex",flexDirection:"column"}}>
                <Global/>
                <div style={{flex:"1",flexFlow:"column"}} className="vc hc">{this.words.map((word)=>word)}</div>
            </div>
        );
    }
}

export default IndexPage;