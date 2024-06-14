import React, { Component } from 'react'
import axios from 'axios';
import Favourites from './Favourites';
export default class Movies extends Component {
    constructor() {
        super()
        this.state = {
            id: '',
            pageNum: [1],
            currpage:1,
            movies:[],
            FavouriteMovie:[]
        }
    }
    handleNext=()=>{
        let tempArr=[];
        for(let i=1;i<=this.state.pageNum.length+1;i++){
            tempArr.push(i);
            console.log("tempArr",tempArr);
        }
        this.setState({
            currpage:this.state.currpage+1,
            pageNum:[...tempArr]
        },this.changeMovies)

    }

    handlePrevious=()=>{
        let prevArr=[];
        for(let i=1;i<=this.state.pageNum.length-1;i++){
            prevArr.push(i);
        }
        if(this.state.currpage!=1){
            this.setState({
                currpage:this.state.currpage-1,
                pageNum:[...prevArr]
            },this.changeMovies)
        }
    }

    async changeMovies(){
        console.log("function get called");
        let res= await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=a70924997e02110adcecdf0c4fa26bff&language=en-US&page=${this.state.currpage}`)
        let listMovies=res.data.results;
        console.log("results",listMovies);
        this.setState({
            movies:[...listMovies]
        })
    }

    async componentDidMount(){
        //sideeffects i.e changes
        let res= await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=a70924997e02110adcecdf0c4fa26bff&language=en-US&page=${this.state.currpage}`)
        let listMovies=res.data.results;
        let movieData = JSON.parse(localStorage.getItem("movies") || "[]");
        let temp=movieData.map((movie)=>movie.id)
        this.setState({
            movies:[...this.state.movies,...listMovies],
            FavouriteMovie:[...temp]
        })
    }

    handleCurrentPage=(value)=>{
        if(value!=this.state.currpage){
            this.setState({
                currpage:value
            },this.changeMovies)
        }
    }

    handleFavourite=(movieObj)=>{
        let movieData = JSON.parse(localStorage.getItem("movies") || "[]")
        if(this.state.FavouriteMovie.includes(movieObj.id)){
            movieData= movieData.filter((movie)=> movie.id!=movieObj.id)
        }
        else{
            movieData.push(movieObj);
        }
        localStorage.setItem("movies",JSON.stringify(movieData)); //synchronous fn

        let temp=movieData.map((movie)=>movie.id)
        this.setState({
            FavouriteMovie:[...temp ]
        })
    }
    render() {
        console.log("favouritemovies",this.state.FavouriteMovie);
        console.log("movies",this.state.movies);
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
                                            <h5 className="card-title movie-title">{movieObj.title}</h5>
                                            <div className='btn-favourite'>
                                                {
                                                    this.state.id === movieObj.id && (
                                                        <a className="btn btn-primary btn" onClick={()=>this.handleFavourite(movieObj)} >
                                                            {!this.state.FavouriteMovie.includes(movieObj.id)?
                                                            
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
                            <div className='page'>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                    <li className="page-item"><a class="page-link prev" onClick={this.handlePrevious} >Previous</a></li>
                                        {this.state.pageNum.map((value,index) => (
                                            <li className="page-item"><a className="page-link" key={index} onClick={()=>this.handleCurrentPage(value)}>{value}</a></li>

                                        ))}
                                        <li className="page-item"><a className="page-link next" onClick={this.handleNext}>Next</a></li>


                                    </ul>
                                </nav>
                            </div>
                        </div>

                }
            </div>
        )
    }
}
