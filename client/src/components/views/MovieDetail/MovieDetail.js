import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config';
import { withRouter } from 'react-router-dom';
import { Row } from 'antd';

import MainImage from '../LandingPage/Sections/MainImage';
import noImage from '../MovieDetail/noImage/noImage1.png';
import MovieInfo from './Sections/MovieInfo';
import GridCard from '../commons/GridCard';
import Favorite from '../MovieDetail/Sections/Favorite'

function MovieDetail(props) {
    // url을 통해서 movieId를 가져왔다.
    const movieId = props.match.params.movieId;

    const [movie, setMovie] = useState({});
    const [casts, setCasts] = useState([]);
    const [actorToggle, setActorToggle] = useState(false)

    useEffect(() => {
        const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=ko-kr`;
        const endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

        // 영화 데이터 가져오기
        axios.get(endpoint)
            .then(res => {
                // console.log(res.data)
                setMovie(res.data)
            })

        // movieId로 영화별 배우 데이터 가져오기
        axios.get(endpointCrew)
            .then(res => {
                // console.log(res.data)
                // console.log(res.data.cast)
                // console.log(res.data.crew)
                setCasts(res.data.cast)
            })
    }, [])

    const onClickShowActor = () => {
        setActorToggle(!actorToggle)
    }

    return (
        <div>
            {/* header */}
            <MainImage
                image={`${IMAGE_BASE_URL}w1280${movie.poster_path}`}
                title={movie.title}
                text={movie.overview} />

            {/* body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>

                {/* 좋아요 버튼 */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite movieInfo={movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
                </div>

                {/* movie info */}
                <MovieInfo movie={movie} />
                <br />
                <hr />

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button onClick={onClickShowActor}>영화 배우 보기</button>
                </div>

                {/* actor grid */}
                < Row gutter={[16, 16]}>
                    {actorToggle && casts && casts.map((actor, index) => (
                        <GridCard
                            key={index}
                            image={actor.profile_path ? `${IMAGE_BASE_URL}/w500${actor.profile_path}` : noImage}
                            actoreName={actor.original_name}
                        />
                    ))}
                </Row>
            </div>
        </div >
    )
}

export default withRouter(MovieDetail)
