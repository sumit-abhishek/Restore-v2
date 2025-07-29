import {
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useFetchBasketQuery } from "../basket/basketApi";
import { currencyFormat } from "../../lib/util";

export default function Review() {
  const { data: basket } = useFetchBasketQuery();
  return (
    <div>
      <Box mt={4} width="100%">
        <Typography variant="h6" fontWeight="bold">
          Billing and Delivery Information
        </Typography>
        <dl>
          <Typography component="dt" fontWeight="medium">
            Shipping Address
          </Typography>
          <Typography component="dd" mt={1} color="textSecondary">
            Address Goes Here
          </Typography>

          <Typography component="dt" fontWeight="medium">
            Payment Details
          </Typography>
          <Typography component="dd" mt={1} color="textSecondary">
            Payment Details Goes Here
          </Typography>
        </dl>
      </Box>
      <Box mt={6} mx="auto">
        <Divider />
        <TableContainer>
          <Table>
            <TableBody>
              {basket?.items.map((item) => (
                <TableRow
                  key={item.productId}
                  sx={{ borderBottom: "1px solid rgbs(224,224,224,1)" }}
                >
                  <TableCell sx={{ py: 4 }}>
                    <Box display="flex" alignItems="center">
                      <img
                        src={item.pictureUrl}
                        alt={item.name}
                        style={{ width: 40, height: 40 }}
                      />
                      <Typography>{item.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center" sx={{ p: 4 }}>
                    x{item.quantity}
                  </TableCell>
                  <TableCell align="right" sx={{ p: 4 }}>
                    {currencyFormat(item.price)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}
