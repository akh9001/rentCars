import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { getAllUsers } from "../../../redux/actions/user";
import { DataGrid } from "@material-ui/data-grid";
import { AiOutlineDelete } from "react-icons/ai";
import { Button } from "@material-ui/core";
// import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
// import { server } from "../../server";
import { toast } from "react-toastify";
import { listCustomers } from "../../../slices/Customer/listUserSlice";

const AllCustomers = () => {
	const dispatch = useDispatch();
	//   const { customers } = useSelector((state) => state.user);
	const [open, setOpen] = useState(false);
	const [userId, setUserId] = useState("");
	const customers = useSelector((state) => state.customers);
	useEffect(() => {
		dispatch(listCustomers(1));
	}, [dispatch]);

	const handleDelete = async (id) => {
		await axios
			.delete(`http://localhost:3001/customers/${id}`, { withCredentials: true })
			.then((res) => {
				toast.success(res.data.message);
			});

		// dispatch(getAllUsers());
	};
	// {user_name, first_name, last_name, email, image, role, created_at, updated_at}
	// Updated columns definition
	const columns = [
		{ field: "id", headerName: "User ID", minWidth: 150, flex: 0.7 },
		{ field: "user_name", headerName: "Username", minWidth: 130, flex: 0.7 },
		{ field: "first_name", headerName: "First Name", minWidth: 130, flex: 0.7 },
		{ field: "last_name", headerName: "Last Name", minWidth: 130, flex: 0.7 },
		{ field: "email", headerName: "Email", type: "text", minWidth: 130, flex: 0.7 },
		{ field: "role", headerName: "User Role", type: "text", minWidth: 130, flex: 0.7 },
		{ field: "created_at", headerName: "Joined At", type: "text", minWidth: 130, flex: 0.8 },
		{
			field: " ",
			flex: 1,
			minWidth: 150,
			headerName: "Delete User",
			type: "number",
			sortable: false,
			renderCell: (params) => {
				return (
					<>
						<Button onClick={() => setUserId(params.id) || setOpen(true)}>
							<AiOutlineDelete size={20} />
						</Button>
					</>
				);
			},
		},
	];
	// Updated rows creation
	console.log("##########",customers);
	const rows = customers.customers?.map((item) => {
		console.log("item", item);
		return {
			id: item._id,
			user_name: item.user_name,
			first_name: item.first_name,
			last_name: item.last_name,
			email: item.email,
			role: "customer",
			created_at: item.creation_date ? item.creation_date.slice(0, 10) : '', // Check if createdAt is defined
		};
	}) || [];

	return (
		<div className="w-full flex justify-center pt-5 mt-28">
			<div className="w-[97%]">
				<h3 className="text-[22px] font-Poppins pb-2">All Users</h3>
				<div className="w-full bg-white rounded">
					<DataGrid
						rows={rows}
						columns={columns}
						pageSize={10}
						disableSelectionOnClick
						autoHeight
					/>
				</div>
				{open && (
					<div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
						<div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
							<div className="w-full flex justify-end cursor-pointer">
								<RxCross1 size={25} onClick={() => setOpen(false)} />
							</div>
							<h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
								Are you sure you wanna delete this user?
							</h3>
							<div className="w-full flex items-center justify-center">
								<div
									className="bg-red-400 hover:bg-red-300 duration-500  text-center font-bold py-3 px-6 shadow-md m-1 rounded-full cursor-pointer text-white text-[18px] !h-[42px] mr-4"
									onClick={() => setOpen(false)}
								>
									cancel
								</div>
								<div
									className="bg-red-400 hover:bg-red-300 duration-500 text-center font-bold py-3 px-6 shadow-md m-1 rounded-full cursor-pointer text-white text-[18px] !h-[42px] ml-4"
									onClick={() => setOpen(false) || handleDelete(userId)}
								>
									confirm
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default AllCustomers;
