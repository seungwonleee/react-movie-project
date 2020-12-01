import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import like from '../likeImage/like.png';
import notLike from '../likeImage/notLike.png';

function Favorite(props) {

    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;

    const [favoriteNumber, setFavoriteNumber] = useState(0);
    const [favorited, setFavorited] = useState(false);

    let variables = {
        userFrom,
        movieId,
        movieTitle,
        moviePost,
        movieRunTime
    }

    useEffect(() => {


        axios.post('/api/favorite/favoriteNumber', variables)
            .then(res => {
                console.log('favoriteNumber =>', res.data)
                if (res.data.success) {
                    setFavoriteNumber(res.data.favoriteNumber)
                } else {
                    alert('숫자 정보를 가져오는데 실패 했습니다.')
                }
            })

        axios.post('/api/favorite/favorited', variables)
            .then(res => {
                console.log('favorited =>', res.data)
                if (res.data.success) {
                    setFavorited(res.data.favorited)
                } else {
                    alert('정보를 가져오는데 실패 했습니다.')
                }
            })

    }, [])

    const onClickFavorite = () => {
        if (favorited) {
            axios.post('/api/favorite/removeFromFavorite', variables)
                .then(res => {
                    if (res.data.success) {
                        setFavoriteNumber(favoriteNumber - 1);
                        setFavorited(!favorited);
                    } else {
                        alert('Favorite 리스트에서 지우는 걸 실패했습니다.');
                    }
                })
        } else {
            axios.post('/api/favorite/addToFavorite', variables)
                .then(res => {
                    if (res.data.success) {
                        setFavoriteNumber(favoriteNumber + 1);
                        setFavorited(!favorited);
                    } else {
                        alert('Favorite 리스트에서 추가하는 걸 실패했습니다.');
                    }
                })
        }
    }

    return (
        <div>
            <Button style={{ border: 'none' }} onClick={onClickFavorite}>{favorited ? <img style={{ width: '1.5rem' }} src={like} alt="좋아요 버튼" /> : <img style={{ width: '1.5rem' }} src={notLike} alt="좋아요 취소" />}</Button>

            <span>{favoriteNumber}</span>
        </div>
    )
}

export default Favorite
