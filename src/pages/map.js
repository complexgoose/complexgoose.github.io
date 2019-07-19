import React from'react'
import Global from '../components/Global.js';


class MapPage extends React.Component
{
    render()
    {
        return(
            <div style={{height:"100vh",overflow:"none",display: "flex",flexFlow: "column"}}>
                <Global/>
                <iframe title="Map" style ={{width:"100%",flex:"1"}}src="https://go.jack.vg/map"/>
            </div>
        );
    }
}

export default MapPage;