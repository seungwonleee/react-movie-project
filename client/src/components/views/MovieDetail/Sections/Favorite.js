import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Favorite(props) {

    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;

    const [favoriteNumber, setFavoriteNumber] = useState(0);
    const [favorited, setFavorited] = useState(false);

    useEffect(() => {

        let variables = {
            userFrom,
            movieId,
        }

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

    return (
        <div>
            <button>{favorited ? 'Not Favorite' : 'Add to Favorite'} {favoriteNumber}</button>
        </div>
    )
}

export default Favorite
