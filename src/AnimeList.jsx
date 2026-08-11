import { useEffect } from 'react';
import { RiLoader4Line, RiArrowUpSLine } from 'react-icons/ri';

import Anime from './Anime'
import AnimePaginator from './AnimePaginator';

const AnimeList = ({ searchResults, onPageChange, isLoading }) => {
  const animes = searchResults.data
  const pagination = searchResults?.pagination || {
    current_page: 0,
    last_visible_page: 0,
  }
  
  if (animes === undefined) return <></>
  if (isLoading) {
    return <>
      <AnimePaginator pagination={ pagination } onPageChange={ () => {} } />
      <div className='from-[#E0FF00] to-[#00E0FF] bg-gradient-to-br h-max py-2 my-4 rounded-md shadow-md hover:shadow-2xl'>
        <div className='flex flex-col items-center justify-center bg-slate-900 h-32 p-0'>
          <RiLoader4Line className="animate-spin h-16 w-16 fill-slate-800" />
          <span
            className='text-lg text-slate-800 font-medium before:content-["Fetching_data..."]'
          ></span>
        </div>
      </div>
      <AnimePaginator pagination={ pagination } onPageChange={ () => {} } />
    </>
  }
  if (animes?.length < 1) {
    return <>
      <div className='from-[#E0FF00] to-[#00E0FF] bg-gradient-to-br h-max py-2 rounded-md shadow-md hover:shadow-2xl'>
        <div className='flex flex-col items-center justify-center bg-slate-900 h-32 p-0'>
          <span 
            // className="text-3xl text-slate-800 font-medium before:content-['\00AF\005C\005F\0028\30C4\0029\005F\002F\00AF']"
            className="text-3xl text-slate-700 font-medium before:content-['\2510\0028\FFE3\03C9\FFE3\003B\0020\0029\250C']"
          ></span>
          <span
            className="text-slate-700 font-medium before:content-['No_anime_found.']"
          ></span>
        </div>
      </div>
    </> 
  }

  return <>
    <ScrollToTopButton />

    <AnimePaginator pagination={ pagination } onPageChange={ onPageChange } />
    <>{ animes.map((anime) => <Anime key={ anime.id } anime={ anime }/>)}</>
    <AnimePaginator pagination={ pagination } onPageChange={ onPageChange } />
  </>
};

export default AnimeList;

const ScrollToTopButton = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const button = document.getElementById('top');
      
      if (button) {
        scrollTop > 300 ? button.classList.remove('hidden') : button.classList.add('hidden');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      id="top"
      className="fixed bottom-4 right-4 z-10 w-12 h-12 rounded-full shadow from-[#E0FF00] to-[#00E0FF] bg-gradient-to-br hidden "
      onClick={ scrollToTop }
    >
      <RiArrowUpSLine className='h-8 w-8 inline-block text-center text-slate-200 drop-shadow-md'/>
    </button>
  );
};