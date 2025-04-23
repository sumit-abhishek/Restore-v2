import { Box, FormControlLabel, FormGroup, Paper } from "@mui/material";
import { useFetchFiltersQuery } from "./catalogApi";
import { CheckBox } from "@mui/icons-material";
import Search from "./Search";
import RadioButtonGroup from "../../app/shared/components/RadioButtonGroup";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { setOrderBy } from "./catalogSlice";

const sortOptions = [
  { value: "name", lable: "Alphabetically" },
  { value: "priceDesc", lable: "Price High to Low" },
  { value: "price", lable: "Price: Low to High" },
];

export default function Filters() {
  const { data } = useFetchFiltersQuery();
  const { orderBy } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Paper>
        <Search />
      </Paper>
      <Paper sx={{ p: 3 }}>
        <RadioButtonGroup
          options={sortOptions}
          onChange={(e) => dispatch(setOrderBy(e.target.value))}
          selectedValue={orderBy}
        />
      </Paper>
      <Paper sx={{ p: 3 }}>
        <FormGroup>
          {data &&
            data.brands.map((item) => (
              <FormControlLabel
                key={item}
                control={
                  <CheckBox color="secondary" sx={{ py: 0.7, fontSize: 40 }} />
                }
                label={item}
              />
            ))}
        </FormGroup>
      </Paper>
      <Paper sx={{ p: 3 }}>
        <FormGroup>
          {data &&
            data.types.map((item) => (
              <FormControlLabel
                key={item}
                control={
                  <CheckBox color="secondary" sx={{ py: 0.7, fontSize: 40 }} />
                }
                label={item}
              />
            ))}
        </FormGroup>
      </Paper>
    </Box>
  );
}
