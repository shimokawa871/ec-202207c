import useSWR from 'swr';

type Option = {
  id: number;
  name: string;
  priceM: number;
  priceL: number;
};


export default function Option() {
  const fetcher = (resource: string, init: undefined) =>
  fetch(resource, init).then((res) => res.json());

  function OptionData() {
    const { data, error } = useSWR('/api/options', fetcher);

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;

    return(
      <h1>{data[0].name}</h1>
    )
}

return (
  <OptionData />
)
}
