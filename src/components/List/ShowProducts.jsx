// import React from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   IconButton,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Badge,
//   Pagination,
// } from "@mui/material";
// import { List, GridOn, Add, Search } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// const UserList = () => {
//   const [view, setView] = React.useState("list");
//   const [search, setSearch] = React.useState("");

//   const handleViewChange = (view) => {
//     setView(view);
//   };

//   const handleDepartmentChange = (event) => {
//     setDepartment(event.target.value);
//   };

//   const handleDesignationChange = (event) => {
//     setDesignation(event.target.value);
//   };

//   const handleSearchChange = (event) => {
//     setSearch(event.target.value);
//   };
//   const navigate = useNavigate();
//   return (
//     <div>
//       <AppBar position="static" color="default">
//         <Toolbar>
//           <Typography variant="h6" style={{ flexGrow: 1 }}>
//             Product List
//           </Typography>
//           <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => navigate("/products/add-Product")}>
//             Add Product
//           </Button>
//         </Toolbar>
//       </AppBar>

//       <div style={{ padding: "20px" }}>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             marginBottom: "20px",
//           }}
//         >
//           <TextField
//             variant="outlined"
//             placeholder="Search…"
//             value={search}
//             onChange={handleSearchChange}
//             InputProps={{
//               startAdornment: <Search />,
//             }}
//             style={{ width: "30%" }}
//           />
//           <div>
//             <IconButton
//               color={view === "list" ? "primary" : "default"}
//               onClick={() => handleViewChange("list")}
//             >
//               <List />
//             </IconButton>
//             <IconButton
//               color={view === "grid" ? "primary" : "default"}
//               onClick={() => handleViewChange("grid")}
//             >
//               <GridOn />
//             </IconButton>
//           </div>
//         </div>

//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Designation</TableCell>
//                 <TableCell>Email</TableCell>
//                 <TableCell>Phone No.</TableCell>
//                 <TableCell>Role</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               <TableRow>
//                 <TableCell>
//                   <div style={{ display: "flex", alignItems: "center" }}>
//                     <img
//                       src="/src/assets/images/user.png"
//                       alt="Avatar"
//                       style={{
//                         borderRadius: "50%",
//                         width: "40px",
//                         marginRight: "10px",
//                       }}
//                     />
//                     John Doe
//                   </div>
//                 </TableCell>
//                 <TableCell>Front-End Developer</TableCell>
//                 <TableCell>Software</TableCell>
//                 <TableCell>john.doe@example.com</TableCell>
//                 <TableCell>+1234567890</TableCell>
//                 <TableCell>
//                   Admin
//                 </TableCell>
//                 <TableCell>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     sx={{ marginRight: "10px", backgroundColor: 'green', color: 'white' }}
//                   >
//                     Update
//                   </Button>
//                   <Button variant="contained" color="secondary" sx={{ backgroundColor: 'red', color: 'white' }}>
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             marginTop: "20px",
//           }}
//         >
//           <Pagination count={10} color="primary" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserList;

import React, { useEffect, useState, useCallback } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  CircularProgress,
} from "@mui/material";
import { List, GridOn, Add, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const ProductList = () => {
  const [view, setView] = useState("list");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  // Fetch products from API
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://92.112.181.199:5000/api/v1/get-All-Products/?page=${page}&limit=5`
      );
      setProducts(response.data.products);
      setTotalPages(response.data.pagination.totalPages);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Product List
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => navigate("/products/add-Product")}
          >
            Add Product
          </Button>
        </Toolbar>
      </AppBar>

      <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <TextField
            variant="outlined"
            placeholder="Search products..."
            value={search}
            onChange={handleSearchChange}
            InputProps={{ startAdornment: <Search /> }}
            sx={{ width: { xs: "100%", sm: "40%" } }}
          />
          <div>
            <IconButton color={view === "list" ? "primary" : "default"} onClick={() => setView("list")}>
              <List />
            </IconButton>
          </div>
        </div>

        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Warranty</TableCell>
                  <TableCell>Expiry Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product.productName}</TableCell>
                    <TableCell>{product.productType}</TableCell>
                    <TableCell>{product.productDescription}</TableCell>
                    <TableCell>
                      {product.warrantyPeriod} {product.warrantyPeriodUnit}
                    </TableCell>
                    <TableCell>{new Date(product.warrantyEndDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {/* <Button
                        variant="contained"
                        sx={{ marginRight: "10px", backgroundColor: "green", color: "white" }}
                      >
                        Update
                      </Button> */}
                      <Button variant="contained" sx={{ backgroundColor: "red", color: "white" }}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Pagination */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <Pagination count={totalPages} page={page} onChange={(_, value) => setPage(value)} color="primary" />
        </div>
      </div>
    </div>
  );
};

export default ProductList;



