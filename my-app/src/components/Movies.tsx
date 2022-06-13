import {useState, useEffect} from 'react';
import '../styles/Movies.css';
import {Form, Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Description from './Description';

import 'bootstrap/dist/css/bootstrap.min.css';

interface Movie {
    genre: string;
    image: string;
    name: string;
    productionYear: number;
    synopsis: string;
    synopsisShort: string;
   }

const MovieList = () => {

    const[movies, setMovies] = useState<Movie[] | []>([]);
    const[filteredMovies, setFilteredMovies] = useState<Movie[] | []>([]);
    const[avaliableYears, setAvaliableYears] = useState<number[] | []>([]);
    const[avaliableGenre, setAvaliableGenre] = useState<string[] | []>([]);
    const[selectedYear, setSelectedYearFilter] = useState<number | undefined>(undefined);
    const[selectedGenre, setSelectedGenreFilter] = useState<string | undefined>(undefined);
    
    const navigate = useNavigate();

    
    function applyFilters(){

        var filteredMovies = [];
        for(let i = 0; i < movies.length; i++){
            
            if(selectedYear===undefined && selectedGenre===undefined){
                filteredMovies = movies;
                break;
            }

            if(movies[i].productionYear === selectedYear && movies[i].genre === selectedGenre ){
                filteredMovies.push(movies[i]);
            }
            else if(selectedYear === undefined && movies[i].genre === selectedGenre){
                filteredMovies.push(movies[i]);
            }
            else if(selectedGenre === undefined && movies[i].productionYear === selectedYear){
                filteredMovies.push(movies[i]);
            }
        }
        setFilteredMovies(filteredMovies)
    }
  
  function sortYear(a: Movie, b: Movie) {
     const yearA = a.image;
     const yearB = b.image;
     if (yearA < yearB) {
        return -1;
     } 
     if (yearA> yearB) {
        return 1;
     } 
        return 0;
    }
  
    async function getMovieRequest() {
      const url = 'https://remarkable-bombolone-51a3d9.netlify.app/.netlify/functions/movies';
      const response = await fetch(url);
      const movieList = (await response.json()) as Movie[];
      const genres = new Set(movieList.map(movie => movie.genre));
      const years = new Set(movieList.map(movie=> movie.productionYear));
      movieList.sort(sortYear);
      if(filteredMovies.length === 0 && selectedYear==undefined && selectedGenre ==undefined){
        setFilteredMovies(movieList);
      }
      setMovies(movieList);
      setAvaliableYears(Array.from(years.values()).sort());
      setAvaliableGenre(Array.from(genres.values()))
    };

    useEffect(() =>{
        console.log('s')
      getMovieRequest();
    });

    async function getYearFromFilter(selected : string){
        setSelectedYearFilter(avaliableYears[Number(selected)])
    }

    async function getGenreFromFilter(selected : string){
        setSelectedGenreFilter(avaliableGenre[Number(selected)])
    }


    return (
        <div>  
            <div>
            <div className='row'>
            <div className="col-2">
            </div>
            <div className="col-3">
                <Form.Select className="yearForm" aria-label="Default select example" onChange={e => getYearFromFilter(e.target.value)}>
                    <option>All Years</option>
                    {avaliableYears.map((year, index)=> <option value={index}>{year}</option>)}
                </Form.Select>
            </div>
            <div className="col-3">
                <Form.Select className="genreForm" aria-label="Default select example" onChange={e => getGenreFromFilter(e.target.value)}>
                    <option>All Genres</option>
                    {avaliableGenre.map((genre, index)=> <option value={index}>{genre}</option>)}
                </Form.Select>
            </div>
            <div className="col-2">
                <Button className="button-29" onClick={e => applyFilters()}> Filter</Button>
            </div>
            <div className="col-2">
            </div>
            </div>
            <div className="box">

            {filteredMovies.map((movie, index)=>
              <div className='container'>
                      <img src={require(('../../public/static/'+movie.image))}  alt="responsive" className="img-thumbnail" onClick={e => navigate('/description', {state:{name:movie.name,
                                                                                                                                                                          genre :movie.genre,
                                                                                                                                                                          image : movie.image,
                                                                                                                                                                          productionYear : movie.productionYear,
                                                                                                                                                                          synopsis : movie.synopsis,
                                                                                                                                                                          synopsisShort : movie.synopsisShort
                                                                                                                                                                    }})}/> 
            
                      <h1 className="movie_title">{movie['name']}</h1>
                </div>
          )}
        </div>
     </div>
 </div>
);
}

export default MovieList;   