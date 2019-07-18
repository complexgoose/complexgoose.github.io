import React from "react"
import Global from "../components/Global.js"
class Page404 extends React.Component
{
    render()
    {
        return(
            <div display="flex" style={{height:"100vh"}}>
            <Global/>
            <div className="vc hc" style={{height:"93vh"}}>
                <div className="hc" style={{flexWrap:"wrap",alignContent:"flex-start"}}>

                    <h1>Something has gone wrong.</h1>
                    <div style={{flexBasis:"100%",height:"0"}} />
                    <p>{this.props.location.pathname} doesn't exist.</p>
                    <div style={{flexBasis:"100%",height:"0"}} />
                </div>
            </div></div>);
    }
}

export default Page404