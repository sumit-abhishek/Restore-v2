import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import {
  useLazyGet400ErrorQuery,
  useLazyGet401ErrorQuery,
  useLazyGet404ErrorQuery,
  useLazyGet500ErrorQuery,
  useLazyGetValidationErrorQuery,
} from "./errorApi";

const AboutPage = () => {
  const [trigger400Error] = useLazyGet400ErrorQuery();
  const [trigger401Error] = useLazyGet401ErrorQuery();
  const [trigger404Error] = useLazyGet404ErrorQuery();
  const [trigger500Error] = useLazyGet500ErrorQuery();
  const [triggerValidationError] = useLazyGetValidationErrorQuery();

  const getValidationError = async () => {
    try {
      await triggerValidationError().unwrap();
    } catch (error: any) {
      const errorArray = error.message.split(", ");
      console.log(error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography gutterBottom variant="h3">
        Errors for Testing
      </Typography>
      <ButtonGroup fullWidth>
        <Button
          variant="contained"
          onClick={() => trigger400Error().catch((err) => console.log(err))}
        >
          Test 400 Error
        </Button>
        <Button
          variant="contained"
          onClick={() => trigger401Error().catch((err) => console.log(err))}
        >
          Test 401 Error
        </Button>
        <Button
          variant="contained"
          onClick={() => trigger404Error().catch((err) => console.log(err))}
        >
          Test 404 Error
        </Button>
        <Button
          variant="contained"
          onClick={() => trigger500Error().catch((err) => console.log(err))}
        >
          Test 500 Error
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            triggerValidationError()
              .unwrap()
              .catch((err) => console.log(err))
          }
        >
          Test Validation Error
        </Button>
      </ButtonGroup>
    </Container>
  );
};
export default AboutPage;
