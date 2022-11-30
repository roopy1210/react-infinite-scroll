import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

// API Key
const key = "0f5e5765115b2938de9a4d1bb396ef19";

export default function App() {
  const [movies, setMvoies] = useState([]);

  const [hasMore, sethasMore] = useState(true);

  const [page, setpage] = useState(2);

  useEffect(() => {
    const initMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`
      );
      const data = await response.json();
      setMvoies(data.results);
    };

    initMovies();
  }, []);

  // fetch movies
  const fetchMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=${page}`
    );
    const data = await response.json();

    return data.results;
  };

  // fetch data
  const fetchData = async () => {
    const userMovies = await fetchMovies();
    console.log(userMovies);

    setMvoies([...movies, ...userMovies]);
    if (userMovies.length === 0 || userMovies.length < 20) {
      sethasMore(false);
    }

    setpage(page + 1);
  };

  return (
    <div id="scrollableDiv" className="h-[800px] overflow-y-auto scrollbar-hide">
      <InfiniteScroll
        dataLength={movies.length}                            // ① 반복되는 컴포넌트의 개수
        next={fetchData}                                      // ② 스크롤이 화면 맨 아리에 닿았을때 호출 되는 함수
        hasMore={hasMore}                                     // ③ 추가 데이터가 있는지 여부
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="w-full p-6">
          {movies.map((item, id) => (
            <div
              key={id}
              className="w-[190px] sm:w-[230px] md:w-[270px] lg:w-[310px] inline-block cursor-pointer relative p-2"
            >
              <img
                className="w-full h-auto block"
                src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
                alt={item?.title}
              />
              <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                <p className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                  {item?.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
