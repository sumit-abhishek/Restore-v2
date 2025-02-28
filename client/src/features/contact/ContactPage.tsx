import { decrement, increment } from "./contactReducer";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/store";

const ContactPage = () => {
  const { data } = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();
  return (
    <>
      <Typography variant="h2">ContactPage</Typography>
      <Typography>The data is{data}</Typography>
      <ButtonGroup>
        <Button onClick={() => dispatch(increment(1))} color="secondary">
          Increment
        </Button>
        <Button onClick={() => dispatch(decrement(1))} color="error">
          Decrement
        </Button>
        <Button onClick={() => dispatch(increment(5))} color="error">
          Increment by 5
        </Button>
      </ButtonGroup>
    </>
  );
};
export default ContactPage;
