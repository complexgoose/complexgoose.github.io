import React from'react'
import Global from '../components/Global.js';

class MapPage extends React.Component
{
    render()
    {
        return(
            <div style={{height:"100vh"}}>
                <Global/>
                <iframe style ={{height:"93vh",width:"100%"}}src="https://go.jack.vg/map"/>
            </div>
        );
    }
}

export default MapPage;