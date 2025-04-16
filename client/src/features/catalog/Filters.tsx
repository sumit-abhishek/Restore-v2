import { useFetchFiltersQuery } from "./catalogApi";

export default function Filters() {
  const { data } = useFetchFiltersQuery();
  console.log(data);
  return <div> Filters Goes Here</div>;
}
