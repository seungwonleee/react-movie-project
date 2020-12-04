import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import GridCard from '../commons/GridCard';
import { Row } from 'antd';


function LandingPage(props) {

    const [movies, setMovies] = useState([]);
    const [movieMainImage, setMovieMainImage] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-rk&page=${page}`;

        axios.get(endpoint)
            .then(res => {
                // console.log(res.data)
                // 기존의 데이터는 그대로 있으면서 출력 시키고자 할때 불변성 유지 / 새로 나오게 할때는 불변성 유지X
                setMovies(movies.concat(...res.data.results))
                setMovieMainImage(res.data.results[0])
            });
    }, [page])

    const loadMoreItems = () => {
        // 다음 페이지 내용 출력
        setPage(page + 1);
    }

    return (
        <>
            <div style={{ width: '100%', margin: '0' }}>
                {/* main image 비동기 작업때문에 데이터가 렌더링 되지 않으므로 &&로 값이 할당될때 렌더링하게 하기*/}
                {movieMainImage &&
                    <MainImage
                        image={`${IMAGE_BASE_URL}w1280${movieMainImage.backdrop_path}`}
                        title={movieMainImage.title}
                        text={movieMainImage.overview} />}

                <div style={{ width: '85%', margin: '1rem auto' }}>
                    <h2>Movies by latest</h2>
                    <hr />
                    {/* movie grid cards */}
                    <Row gutter={[16, 16]}>
                        {movies && movies.map((movie, index) => (
                            <GridCard
                                key={index}
                                landingPage
                                movieName={movie.original_title}
                                image={movie.poster_path ? `${IMAGE_BASE_URL}/w500${movie.poster_path}` : null}
                                movieId={movie.id}
                            />
                        ))}
                    </Row>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                    <button onClick={loadMoreItems}>Load More</button>
                </div>
            </div >
        </>
    )
}

export default withRouter(LandingPage);
