import React from'react'
import Card from 'react-bootstrap/Card';
import Global from '../components/Global.js'
import YouTube from "../components/YouTube"

class IndexPage extends React.Component
{

  randItem(arr)
  {
      return arr[Math.floor(Math.random()*arr.length)];
  }
  render =()=>
  {
      return(
          <div style={{height:"100vh", display:"flex",flexDirection:"column"}}>
              <Global/>
              <div className="hc">
                <Card bg="warning">
                  <Card.Header className="hc">Generative Art Workshop</Card.Header>
                  <Card.Body>
                    <Card.Text className="hc">
                      I hosted a Generative Art Workshop with Communication Madison <br/> in Fall 2020, you can see my tutorials below.
                    </Card.Text>
                    <div className="vc hc">
                      <YouTube id="xuYaILT_BTI">
                        First
                      </YouTube>
                      <YouTube id="M2RhNl0gLXo">
                      Second
                      </YouTube>
                      <YouTube id="bBnG1Vhccpo">
                        Third
                      </YouTube>
                    </div>
                  </Card.Body>
                </Card>

              </div>
          </div>
      );
  }
}
export default IndexPage;
