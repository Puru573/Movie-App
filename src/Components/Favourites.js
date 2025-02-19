import React, { Component } from 'react'
class Favourites extends Component {
    constructor() {
        super();
        this.state = ({
            genre: [],
            currGenre: 'All Genre',
            movies: [],
            search: '',
            releaseDate: [],
            currPage: 1,
            limit: 5
        })
    }

    componentDidMount() {
        let movie = JSON.parse(localStorage.getItem("movies") || "[]");
        let genreId = {
            28: "Action",
            12: "Adventure",
            16: "Animation",
            35: "Comedy",
            80: "Crime",
            99: "Documentary",
            18: "Drama",
            10751: "Family",
            14: "Fantasy",
            36: "History",
            27: "Horror",
            10402: "Music",
            9648: "Mystery",
            10749: "Romance",
            878: "Sci-Fi",
            10770: "TV",
            53: "Thriller",
            10752: "War",
            37: "Western",
        };

        let tempArr = [];//string collection of genre id
        movie.forEach((movieObj) => {
            if (!tempArr.includes(genreId[movieObj.genre_ids[0]])) {
                tempArr.push(genreId[movieObj.genre_ids[0]]);
            }
        })
        tempArr.unshift("All Genre");
        this.setState({
            movies: [...movie],
            genre: [...tempArr]
        })
    }
    handleGenre = (genre) => {
        this.setState({
            currGenre: genre
        })

    }
    handleDuplicate = (tempArr) => {
        for (let i = 0; i <= tempArr.length - 1; i++) {
            for (let j = i + 1; j < tempArr.length; j++)
                if (tempArr[i] === tempArr[j]) {
                    tempArr.splice(j, 1);
                    j--;
                }
        }
        return tempArr;
    }
    handleDelete = (movieObj) => {
        let genreId = {
            28: "Action",
            12: "Adventure",
            16: "Animation",
            35: "Comedy",
            80: "Crime",
            99: "Documentary",
            18: "Drama",
            10751: "Family",
            14: "Fantasy",
            36: "History",
            27: "Horror",
            10402: "Music",
            9648: "Mystery",
            10749: "Romance",
            878: "Sci-Fi",
            10770: "TV",
            53: "Thriller",
            10752: "War",
            37: "Western",
        };
        let tempArr = [];
        let movie = JSON.parse(localStorage.getItem("movies") || "[]")
        let filteredData = movie.filter((m) => {
            return m.id != movieObj.id
        })
        localStorage.setItem("movies", JSON.stringify(filteredData));

        filteredData.forEach((movieObj) => {
            let latestGenre = genreId[movieObj.genre_ids[0]];
            tempArr.push(latestGenre);
        })
        let latestTempArr = this.handleDuplicate(tempArr)
        tempArr.unshift("All Genre");
        this.setState({
            movies: [...filteredData],
            genre: [...latestTempArr]
        })
    }

    sortRatingDesc = () => {
        let temp = this.state.movies;
        temp.sort(function (objA, objB) {
            return objB.vote_average - objA.vote_average;
        })
        this.setState({
            movies: [...temp]
        })
    }

    sortRatingAsc = () => {
        let temp = this.state.movies;
        temp.sort(function (objA, objB) {
            return objA.vote_average - objB.vote_average;
        })
        this.setState({
            movies: [...temp]
        })
    }

    sortPopularityDesc = () => {
        let temp = this.state.movies;
        temp.sort(function (objA, objB) {
            return objB.popularity - objA.popularity;
        })
        this.setState({
            movies: [...temp]
        })
    }



    sortPopularityAsc = () => {
        let temp = this.state.movies;
        temp.sort(function (objA, objB) {
            return objA.popularity - objB.popularity;
        })
        this.setState({
            movies: [...temp]
        })
    }

    sortDateAsc = () => {
        let temp = this.state.movies;
        temp.sort(function (objA, objB) {
            let dateA = new Date(objA.release_date);
            let dateB = new Date(objB.release_date);
            return dateA - dateB;
        })
        this.setState({
            movies: [...temp]
        })
    }
    sortDateDesc = () => {
        let temp = this.state.movies;
        temp.sort(function (objA, objB) {
            let dateA = new Date(objA.release_date);
            let dateB = new Date(objB.release_date);
            return dateB - dateA;
        })
        this.setState({
            movies: [...temp]
        })
    }
    handleClick = (page) => {
        this.setState({
            currPage: page
        })
    }

    handleLimit=(e)=>{
        if(e.target.value > 0){
            this.setState({
                limit: e.target.value
            })
        }
    }


    render() {
        let genreId = {
            28: "Action",
            12: "Adventure",
            16: "Animation",
            35: "Comedy",
            80: "Crime",
            99: "Documentary",
            18: "Drama",
            10751: "Family",
            14: "Fantasy",
            36: "History",
            27: "Horror",
            10402: "Music",
            9648: "Mystery",
            10749: "Romance",
            878: "Sci-Fi",
            10770: "TV",
            53: "Thriller",
            10752: "War",
            37: "Western",
        };
        let filterArr = this.state.movies;
        if (this.state.search == '') {
            filterArr = this.state.movies;
        }
        else {

            filterArr = filterArr.filter((movieObj) => movieObj.original_title.toLowerCase().includes(this.state.search.toLowerCase()));

        }
        if (this.state.currGenre != "All Genre") {
            filterArr = filterArr.filter((movieObj) => genreId[movieObj.genre_ids[0]] == this.state.currGenre) //we get the movies according to the currGenre
        }
        // pagination and numbering logic
       
            let pages = Math.ceil(filterArr.length / this.state.limit );
            let pageArr = [];
            
                for (let i = 1; i <= pages;i++) {
                    pageArr.push(i)
                }
        
                let si = (this.state.currPage - 1) * this.state.limit;
                let ei = Number(si) + Number(this.state.limit);
                filterArr = filterArr.slice(si, ei);
            
        
        

        return (
            <div>
                {(filterArr.length === 0 && this.state.genre.length === 1) ? <div className='headingStyle'><h1>Please Add the movies to the favourite section</h1></div> :
                    <div className="row favourite-content">
                        <div className='col-lg-3 col=sm-12 favourite-list'>
                            {
                                this.state.genre.map((genre,index) => (
                                    <ul key={index} className="list-group table">

                                        {this.state.currGenre === genre
                                            ?
                                            <li className="list-group-item all-genre" >{genre}</li>
                                            :
                                            <li className="list-group-item remaining-genre" onClick={() => this.handleGenre(genre)}>{genre}</li>
                                        }

                                    </ul>

                                ))
                            }
                        </div>
                        <div className='col-lg-9 col-sm-12 favourite-table'>
                            <div className="input-group flex-nowrap ">
                                <input type="text" placeholder="search movies..." value={this.state.search} onChange={(e) => this.setState({ search: e.target.value })} className="form-control" />
                                <input type="number" placeholder="Type numbers..." value={this.state.limit} onChange={this.handleLimit} className="form-control" />
                            </div>
                            <div className='row'>
                            <div class="table-responsive">

                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Title</th>
                                            <th scope="col">Genre</th>
                                            <th class="interacting"scope="col"><i className="fas fa-sort-up" onClick={this.sortPopularityDesc} />Popularity<i className="fas fa-sort-down" onClick={this.sortPopularityAsc}></i></th>
                                            <th class="interacting"scope="col"><i className="fas fa-sort-up" onClick={this.sortDateDesc} />Release_Date<i className="fas fa-sort-down" onClick={this.sortDateAsc}></i></th>
                                            <th class="interacting"scope="col"><i className="fas fa-sort-up" onClick={this.sortRatingDesc} />Rating<i className="fas fa-sort-down" onClick={this.sortRatingAsc}></i></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            filterArr.length === 0 ? <div className='favouriteHeading'><h3>No movies found by your Search in this Genre</h3></div> :
                                                filterArr.map((movieObj) => (
                                                    <tr key={movieObj.id}>
                                                        <td scope="row"><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} className='table-image' />{movieObj.original_title}</td>
                                                        <td>{genreId[movieObj.genre_ids[0]]}</td>
                                                        <td>{movieObj.popularity}</td>
                                                        <td>{movieObj.release_date}</td>
                                                        <td>{movieObj.vote_average}</td>
                                                        <td><button type="button" className="btn btn-danger" onClick={() => this.handleDelete(movieObj)}>Delete</button></td>
                                                    </tr>
                                                ))

                                        }
                                    </tbody>
                                </table>
                            </div>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        {
                                            pageArr.map((page,index) => (
                                                filterArr.length === 0 ? onclick = (this.handleClick(page)) :
                                                    <li key={index} className="page-item favourite-pagination"><a className="page-link" onClick={() => this.handleClick(page)}>{page}</a></li>
                                            ))
                                        }
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
export default Favourites;