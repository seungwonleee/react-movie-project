import React from 'react'
import { Col, Row } from 'antd';

function GridCard(props) {
    // LadingPage에서 사용
    if (props.landingPage) {
        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative', textAlign: 'center' }}>
                    <a href={`/movie/${props.movieId}`}>
                        <img style={{ height: '300px', width: '100%' }} src={props.image} alt={props.movieName} />
                        <p>{props.movieName}</p>
                    </a>

                </div>
            </Col>
        )
    } else {
        // MovieDetail에서 사용
        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative', textAlign: 'center' }}>
                    <img style={{ height: '300px', width: '100%' }} src={props.image} alt={props.actoreName} />
                    <p>{props.actoreName}</p>
                </div>
            </Col>
        )
    }


}

export default GridCard
