import { GetStaticProps } from 'next';
import { api } from '../services/api';

type Episode = {
  id: string;
  title: string;
  members: string;
};

type HomeProps = {
  episodes: Episode[];
};

export default function Home(props: HomeProps) {
  console.log(props.episodes);

  return <p>{JSON.stringify(props.episodes)}</p>;
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get(
    'episodes?_limit=12&_sort=published_at&_order=desc'
  );
  const data = response.data;

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  };
};
