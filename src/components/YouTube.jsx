import React from 'react';

class YouTube extends React.Component {

    render() {
        return (
            <div className="YouTube">
                <iframe height="100" width="200" src={`https://www.youtube.com/embed/${this.props.id}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        );
    }
}

export default YouTube;