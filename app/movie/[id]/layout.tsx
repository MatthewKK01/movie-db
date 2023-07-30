import { Movie } from "@/app/interfaces";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

async function getData(movie_id: string | number) {
  const url = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}`, {
    headers: {
      accept: "application/json",
      Authorization: process.env.THEMOVIEDATABASE_API as string,
    },
    next: {
      revalidate: 60,
    },
  });
  return url.json();
}

async function MovieId({
  params,
  children,
}: {
  children: ReactNode;
  params: { id: string };
}) {
  const data: Movie = await getData(params.id);

  return (
    <div className="min-h-screen p-10">
      <div className="h-[50vh] relative">
        <Image
          alt="movie-poster"
          fill
          src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
          className="object-cover  rounded-lg"
        />
      </div>
      <h1 className="text-4xl font-bold text-center pt-5">{data.title}</h1>

      <div className="flex mt-10 gap-x-10">
        <div className="w-1/2">
          <h1>
            <span className="underline">Homepage:</span>{" "}
            <Link href={data.homepage} target="_blank">
              link
            </Link>
          </h1>
          <h1>
            <span className="underline">Original Language:</span>{" "}
            {data.original_language}
          </h1>
          <p>
            <span className="underline">Overview:</span> {data.overview}
          </p>

          <p>
            <span className="underline">Release Date: </span>{" "}
            {data.release_date}{" "}
          </p>
        </div>
        <div className="bg-gray-100 w-1/2">{children}</div>
      </div>
    </div>
  );
}

export default MovieId;
