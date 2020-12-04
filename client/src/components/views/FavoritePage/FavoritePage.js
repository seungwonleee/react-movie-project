import React, { useEffect, useState } from 'react';
import './favorite.css';
import axios from 'axios';
import { Popover } from 'antd';
import { IMAGE_BASE_URL } from '../../Config';

function FavoritePage() {

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        axiosFavoriteMovie();
    }, [])

    const axiosFavoriteMovie = () => {
        axios.post('/api/favorite/getFavoriteMovie', { userFrom: localStorage.getItem('userId') })
            .then(res => {
                if (res.data.success) {
                    // console.log(favorites)
                    console.log(res.data.favorites)
                    setFavorites(res.data.favorites);
                } else {
                    alert('영화 정보를 가져오는데 실패했습니다.');
                }
            })
    }

    const onClickDelete = (movieId, userFrom) => {
        const variables = {
            movieId,
            userFrom
        }

        axios.post('/api/favorite/removeFromFavoriteMovie', variables)
            .then(res => {
                if (res.data.success) {
                    axiosFavoriteMovie();
                } else {
                    alert('좋아요 목록에서 삭제하는데 실패했습니다.');
                }
            })
    }

    const renderCards = favorites.map((favorite, index) => {

        const content = (
            <div>
                {favorite.moviePost ?
                    <img src={`${IMAGE_BASE_URL}w200${favorite.moviePost}`} alt={`${favorite.movieTitle}사진`} /> : 'no image'}
            </div>
        )

        return <tr key={index}>
            <Popover content={content} title={`${favorite.movieTitle}`}>
                <td>{favorite.movieTitle}</td>
            </Popover>
            <td>{favorite.movieRunTime} 분</td>
            <td><button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>삭제</button></td>
        </tr>
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h2>Favorite Movies</h2>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie Runtime</th>
                        <td>Remove From Favorite</td>
                    </tr>
                </thead>
                <tbody>
                    {renderCards}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
