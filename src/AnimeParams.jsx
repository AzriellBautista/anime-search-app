import {
  RiSearchLine,     // query
  RiAddLine,        // genresInclude
  RiSubtractLine,   // genresExclude
  RiEyeLine,        // rating
  RiHashtag,        // type
  RiPlayLine,       // status
  RiFilter3Line,    // orderBy
  RiSortAsc,        // sort:asc
  RiSortDesc,       // sort:desc
} from 'react-icons/ri';

import { 
  GenresEnums,
  OrderByEnums,
  SortEnums,
  RatingEnums,
  StatusEnums,
  TypeEnums,
} from './AnimeApiEnums';

const AnimeParams = ({ searchParams }) => {
  const {
    query = '',
    genresInclude = '',
    genresExclude = '',
    rating = '',
    status = '',
    orderBy = '',
    sort = '',
    type = ''
  } = searchParams;

  const _mapGenreID2Name = (genresToName, genresCatalog) => {
    return genresCatalog.filter(genre => {
      return genresToName.split(',').map(Number).includes(genre.value)
    })
  }

  const includedGenres = _mapGenreID2Name(genresInclude, GenresEnums)
  const excludedGenres = _mapGenreID2Name(genresExclude, GenresEnums)

  const tw_pill = `text-slate-800 font-light px-2 py-1 m-1 rounded-full inline-block from-[#E0FF00] to-[#00E0FF] bg-gradient-to-br shadow-md `;
  const tw_icon = `inline-block align-middle -mt-1 mr-1 `;

  return <>
    <div className='overflow-auto text-center my-9 mx-12 sm:mx-12 md:mx-24 lg:mx-64 select-none'>
      { (query || genresInclude || genresExclude || rating || status || orderBy || sort) 
        ? <span
            className='text-slate-300 font-semibold text-lg drop-shadow-sm'
          >Applied search filters:</span>
        : <></>
      }

      { query && (
          <span className={ tw_pill }>
            <RiSearchLine className={ tw_icon }/>
            <strong>Query: </strong>
            { query } 
          </span>
      )}

      { includedGenres.map((genre, index) => {
          return <>
            <span className={ tw_pill } key={ index }>
              <RiAddLine className={ tw_icon }/>
              <strong>Include: </strong>
              { genre.label }
            </span>
          </>
      })}

      { excludedGenres.map((genre, index) => {
          return <>
            <span className={ tw_pill } key={ index }>
              <RiSubtractLine className={ tw_icon }/>
              <strong>Exclude: </strong>
              { genre.label }
            </span>
          </>
      })}

      { type && (
        <span className={ tw_pill }>
          <RiHashtag className={ tw_icon }/>
          <strong>Type: </strong>
          { TypeEnums.find(e => e.value === type).label }
        </span>
      )}

      { status && (
          <span className={ tw_pill }>
            <RiPlayLine className={ tw_icon }/>
            <strong>Status: </strong>
            { StatusEnums.find(e => e.value === status).label }
          </span>
      )}
        
      { rating && (
          <span className={ tw_pill }>
            <RiEyeLine className={ tw_icon }/>
            <strong>Rating: </strong>
            { RatingEnums.find(e => e.value === rating).label }
          </span>
      )}

      { orderBy && (
          <span className={ tw_pill }>
            <RiFilter3Line className={ tw_icon }/>
            <strong>Order: </strong>
            { OrderByEnums.find(e => e.value === orderBy).label }
          </span>  
      )}

      { sort && (
          <span className={ tw_pill }>
            { SortEnums.find(e => e.value === sort).label === 'Ascending' 
              ? <><RiSortAsc className={ tw_icon }/><strong>Sort: </strong>Ascending</> 
              : <><RiSortDesc className={ tw_icon }/><strong>Sort: </strong>Descending</>
            }
          </span>
      )}
    </div>
  </>
};

export default AnimeParams;