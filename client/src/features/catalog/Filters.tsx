import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  Paper,
  Radio,
} from "@mui/material";
import { useFetchFiltersQuery } from "./catalogApi";
import { CheckBox } from "@mui/icons-material";
import Search from "./Search";

const sortOptions = [
  { value: "name", lable: "Alphabetically" },
  { value: "priceDesc", lable: "Price High to Low" },
  { value: "price", lable: "Price: Low to High" },
];

export default function Filters() {
  const { data } = useFetchFiltersQuery();
  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Paper>
        <Search />
      </Paper>
      <Paper sx={{ p: 3 }}>
        <FormControl>
          {sortOptions.map(({ value, lable }) => (
            <FormControlLabel
              key={lable}
              control={<Radio sx={{ py: 0.7 }} />}
              label={lable}
              value={value}
            />
          ))}
        </FormControl>
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
