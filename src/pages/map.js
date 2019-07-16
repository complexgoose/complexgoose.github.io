import React from'react'
import Global from '../components/Global.js';

class MapPage extends React.Component
{
    render()
    {
        return(
            <div>
                <Global/>
                <iframe style ={{width:"100%",height:"93vh"}}src="https://go.strosahl.org/map"/>
            </div>
        );
    }
}

export default MapPage;