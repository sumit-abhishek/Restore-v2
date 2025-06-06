import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "./accountApi";
import { useForm } from "react-hook-form";
import {
  registerSchema,
  RegistrationSchema,
} from "../../lib/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function RegistrationForm() {
  const [registerUser] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isLoading },
  } = useForm<RegistrationSchema>({
    mode: "onTouched",
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegistrationSchema) => {
    await registerUser(data);
  };
  return (
    <Container component={Paper} maxWidth="sm" sx={{ borderRadius: 3 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop="8"
      >
        <LockOutlined sx={{ mt: 3, color: "secondary.main", fontSize: 40 }} />
        <Typography variant="h5">Sign In</Typography>
        <Box
          component="form"
          width="100%"
          display="flex"
          flexDirection="column"
          gap={3}
          marginY={3}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            fullWidth
            label="Email"
            type="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            variant="contained"
            type="submit"
            disabled={isLoading || !isValid}
          >
            Sign In
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Already have an Account?
            <Typography sx={{ ml: 2 }} component={Link} to="/login">
              Login
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
