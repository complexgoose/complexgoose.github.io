import React from'react'
import Global from '../components/Global.js';


class MapPage extends React.Component
{
    render()
    {
        return(
            <div style={{display:"flex",height:"100vh",overflow:"none",flexFlow:"row wrap"}}>
                <Global/>
                <iframe title="Map" style ={{height:"93vh",width:"100%"}}src="https://go.jack.vg/map"/>
            </div>
        );
    }
}

export default MapPage;