import React, { Component } from 'react'
import axios from 'axios';
export default class Movies extends Component {
    constructor() {
        super()
        this.state = {
            id: '',
            pageNum: [1],
            currpage: 1,
            movies: [],
            FavouriteMovie: [],
            isLoading: false,
            totalResults: 0,
            pageSize: 20
        }
    }
    loadNews = async () => {
        this.setState({
            currpage: this.state.currpage + 1
        })
        let totalPagess = Math.ceil(this.state.totalResults / this.state.pageSize);  //per page movie data
        if (this.state.currpage > totalPagess) {
            this.setState({
                isLoading: true
            })
            return;
        }
        let res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=a70924997e02110adcecdf0c4fa26bff&language=en-US&page=${this.state.currpage}&pageSize=${this.state.pageSize}`)
        let listMovies = res.data.results;
        this.setState({
            movies: [...this.state.movies, ...listMovies],
        })
    }
    callbackfn = (entries) => {
        if (entries[0].isIntersecting) {
            this.loadNews();
        }
    };

    async componentDidUpdate() {
        const loader = document.querySelector(".infinite-loader");
        if (loader) {
            const observer = new IntersectionObserver(this.callbackfn, { threshold: 1.0 });
            observer.observe(loader);
            return () => observer.disconnect(); // Cleanup the observer on unmount
        }
    }

    async componentDidMount() {
        //sideeffects i.e changes
        let res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=a70924997e02110adcecdf0c4fa26bff&language=en-US`)
        let listMovies = res.data.results;
        let movieData = JSON.parse(localStorage.getItem("movies") || "[]");
        let temp = movieData.map((movie) => movie.id)
        this.setState({
            movies: [...this.state.movies, ...listMovies],
            FavouriteMovie: [...temp],
            totalResults: res.data.total_results
        })
    }

    handleFavourite = (movieObj) => {
        let movieData = JSON.parse(localStorage.getItem("movies") || "[]")
        if (this.state.FavouriteMovie.includes(movieObj.id)) {
            movieData = movieData.filter((movie) => movie.id != movieObj.id)
        }
        else {
            movieData.push(movieObj);
        }
        localStorage.setItem("movies", JSON.stringify(movieData)); //synchronous fn

        let temp = movieData.map((movie) => movie.id)
        this.setState({
            FavouriteMovie: [...temp]
        })
    }
    render() {
        return (
            <div>
                {
                    this.state.movies.length == 0 ?
                        <div className="spinner-border text-danger" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        :
                        <div>
                            <h1 className='text-center'>Trending</h1>
                            <div className='Movie-List'>
                                {
                                    this.state.movies.map((movieObj, index) => (

                                        <div className='card Movie-card' key={index}
                                            onMouseEnter={() => (this.setState({ id: movieObj.id }))}
                                            onMouseLeave={() => (this.setState({ id: "" }))}
                                        >
                                            <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                                                className="card-img-top movie-img"
                                                alt={movieObj.title} />
                                            <div className='container'>
                                                <h5 className="card-title movie-title">{movieObj.title}</h5>
                                                <h6 className='card-title movie-date'>{movieObj.release_date}</h6>
                                            </div>
                                            <div className='btn-favourite'>
                                                {
                                                    this.state.id === movieObj.id && (
                                                        <a className="btn btn-primary btn" onClick={() => this.handleFavourite(movieObj)} >
                                                            {!this.state.FavouriteMovie.includes(movieObj.id) ?

                                                                "Add to Favourites"
                                                                :
                                                                "Remove from Favourites"
                                                            }
                                                        </a>

                                                    )
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='infinite-loader'>
                                {!this.state.isLoading && (<h1>Loading...............</h1>)}
                            </div>
                        </div>
                }
            </div>
        )
    }
}
