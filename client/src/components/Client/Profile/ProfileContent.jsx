import React, { useState, useEffect } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import {
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { MdTrackChanges } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import {RiCloseLine} from "react-icons/ri";
// import {
//   deleteUserAddress,
//   loadUser,
//   updateUserInformation,
//   updatUserAddress,
// } from "../../../redux/actions/user";
import { Country, State } from "country-state-city";
import profil from '../../../assets/profile.jpg'
import { toast } from "react-toastify";
import axios from "axios";
// import { getAllOrdersOfUser } from "../../../redux/actions/order";

const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(profil);
  const dispatch = useDispatch();


  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(updateUserInformation(name, email, phoneNumber, password));

  };

  const handleImage = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        axios
          .put(
            `http://localhost:3000/profile/user/update-avatar`,
            { avatar: reader.result },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            // dispatch(loadUser());
            toast.success("avatar updated successfully!");
          })
          .catch((error) => {
            toast.error(error);
          });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="w-full p-20 mx-auto ">
      {/* profile */}
      {active === 1 && (
        <>
          <div className="w-full px-5">
            <form
              onSubmit={handleSubmit}
              aria-required={true}
              className="flex flex-col items-center"
            >
              {/* Image Upload */}
              <div className="relative  mb-4 cursor-pointer">
                 
                  <img
                    alt="Profile Image"
                    src={avatar || user.avatar}
                    className="w-32 h-32 object-cover rounded-full border-2 border-indigo-600"
                    onClick={() => document.getElementById("image").click()}
                  />
                  
                  <label htmlFor="image">
                    <AiOutlineCamera color="black" size={30} className="absolute bottom-0 bg-white right-0 p-2 rounded-full shadow-md cursor-pointer" />
                  </label>
                  
                  <input
                    type="file"
                    id="image"
                    className="hidden"
                    onChange={handleImage}
                  />
              
              </div>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Full Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Email Address"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Password"
                  variant="outlined"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
             
            </form>
            <br/>
              <Button variant="contained" color="primary" type="submit">
                Update
              </Button>
          </div>
        </>
      )}

      {/* order */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* Refund */}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}

      {/* Change Password */}
      {active === 4 && (
        <div>
          <ChangePassword />
        </div>
      )}

      {/* user Address */}
      {active === 5 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};


const AllOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getAllOrdersOfUser(user?._id));
  }, [dispatch, user]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: item.totalPrice + " DH",
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const AllRefundOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getAllOrdersOfUser(user?._id));
  }, [dispatch, user]);

  const eligibleOrders =
    orders && orders.filter((item) => item.status === "Processing refund");

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  eligibleOrders &&
    eligibleOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: item.totalPrice + " DH" ,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};

const TrackOrder = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getAllOrdersOfUser(user?._id));
  }, [dispatch, user]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/track/order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: item.totalPrice + " DH",
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        "http://localhost:3000/profile/user/update-user-password",
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      );

      toast.success(response.data.success);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div style={{ padding: "0 5px" }}>
      <Typography variant="h4" align="center" fontWeight="600" mb={8}>
        Change Password
      </Typography>
      <form
        aria-required
        onSubmit={passwordChangeHandler}
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <TextField
          label="Enter your old password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <TextField
          label="Enter your new password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          label="Enter your confirm password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        
      </form>
      <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{marginTop: "8px" }}
        >
          Update
        </Button>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addressTypeData = [
    { name: "Default" },
    { name: "Home" },
    { name: "Office" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill in all the fields!");
    } else {
      dispatch(
        // updatUserAddress(
        //   country,
        //   city,
        //   address1,
        //   address2,
        //   zipCode,
        //   addressType
        // )
      );
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setZipCode("");
      setAddressType("");
    }
  };

  const handleDelete = (item) => {
    const id = item._id;
    // dispatch(deleteUserAddress(id));
  };

  return (
    <div className="w-full p-10 ">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          My Addresses
        </h1>
        <Button
          variant="outlined"
          onClick={() => setOpen(true)}
          sx={{ borderColor: "#000" }}
        >
          Add New
        </Button>
      </div>
      <br />

      {/* {user && */}
        {/* user.addresses.map((item, index) => ( */}
          <div
            className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center p-6 shadow justify-between pr-10 mb-5"
            // key={index}
          >
            <div className="flex items-center">
              {/* <h5 className="pl-5 font-[600]">{item.addressType}</h5> */}
              <h5 className="pl-5 font-[600]">Office</h5> 
            </div>
            <div className="pl-8 flex items-center">
              {/* <h6 className="text-[12px] 800px:text-[unset]">
                {item.address1} {item.address2}
              </h6> */}
              <h6 className="text-[12px] 800px:text-[unset]">
                35 Rue Salama casablanca
              </h6>
            </div>
            <div className="pl-8 flex items-center">
              {/* <h6 className="text-[12px] 800px:text-[unset]">
                {user && user.phoneNumber}
              </h6> */}
              <h6 className="text-[12px] 800px:text-[unset]">
                    06 77 44 44 44
              </h6>
            </div>
            <div className="min-w-[10%] flex items-center justify-between pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                // onClick={() => handleDelete(item)}
              />
            </div>
          </div>
        {/* ))} */}

      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[18px]">
          You do not have any saved addresses!
        </h5>
      )}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          <div className="flex justify-between items-center">
            <h1 className="text-center text-2xl font-Poppins">
              Add New Address
            </h1>
            <RiCloseLine
              size={30}
              className="cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="w-full block p-4 space-y-4">
              <div className="w-full pb-2">
                <InputLabel>Country</InputLabel>
                <Select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-[95%] border h-[40px] rounded-[5px]"
                >
                  <MenuItem value="">
                    <em>Choose your country</em>
                  </MenuItem>
                  {Country &&
                    Country.getAllCountries().map((item) => (
                      <MenuItem key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </div>

              <div className="w-full pb-2">
                <InputLabel>Choose your City</InputLabel>
                <Select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-[95%] border h-[40px] rounded-[5px]"
                >
                  <MenuItem value="">
                    <em>Choose your city</em>
                  </MenuItem>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <MenuItem key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </div>

              <div className="w-full pb-2">
                <InputLabel>Address 1</InputLabel>
                <TextField
                  type="address"
                  className="w-full border p-1 rounded-[5px]"
                  required
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                />
              </div>
              <div className="w-full pb-2">
                <InputLabel>Address 2</InputLabel>
                <TextField
                  type="address"
                  className="w-full border p-1 rounded-[5px]"
                  required
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                />
              </div>

              <div className="w-full pb-2">
                <InputLabel>Zip Code</InputLabel>
                <TextField
                  type="number"
                  className="w-full border p-1 rounded-[5px]"
                  required
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>

              <div className="w-full pb-2">
                <InputLabel>Address Type</InputLabel>
                <Select
                  value={addressType}
                  onChange={(e) => setAddressType(e.target.value)}
                  className="w-[95%] border h-[40px] rounded-[5px]"
                >
                  <MenuItem value="">
                    <em>Choose your Address Type</em>
                  </MenuItem>
                  {addressTypeData &&
                    addressTypeData.map((item) => (
                      <MenuItem key={item.name} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </div>

              <div className=" w-full py-2 my-8 rounded-[5px] cursor-pointer bg-yellow-600">
                <Button
                  type="submit"
                  className="w-full"
                  required
                  readOnly
                >
                  Add Address
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default ProfileContent;
