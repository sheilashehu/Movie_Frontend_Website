import '../styles/Description.css';
import {useLocation} from 'react-router-dom';

interface Movie {
    genre: string;
    image: string;
    name: string;
    productionYear: number;
    synopsis: string;
    synopsisShort: string;
   }
const Description = () => {
    const state = useLocation();
    const beta = state.state as Movie;
    console.log(beta.genre)


    return (
        <div className='container'>
            <div className='row-h'>
                <div className='col-d'>{beta.name}</div>
                <div className='col-d'>{beta.genre}</div>
                <div className='col-d'>{beta.productionYear}</div>
                <div className='col-d'>{beta.synopsisShort}</div>
                <div className='col-d'>{beta.synopsis}</div>
            </div>
        </div>
    );
}
export default Description;   