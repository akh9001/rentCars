import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { IoAddOutline } from 'react-icons/io5'
// import SearchBar from '../components/Layout/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { listCars } from '../slices/Admin/Cars/listCarSlice';
import { Link } from 'react-router-dom';



function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}
const headCells = [
	{
		_id: 'name',
		numeric: false,
		disablePadding: true,
		label: 'Car Model',
	},
	{
		_id: 'vin',
		numeric: true,
		disablePadding: false,
		label: 'Price (per day)',
	},
	{
		_id: 'brand',
		numeric: true,
		disablePadding: false,
		label: 'Type',
	},
	{
		_id: 'discount_price',
		numeric: true,
		disablePadding: false,
		label: 'Capacity',
	},
	{
		_id: 'price',
		numeric: true,
		disablePadding: false,
		label: 'Transmission',
	},
];



function EnhancedTableHead(props) {
	const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
		props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};



	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox
						color="primary"
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{
							'aria-label': 'select all desserts',
						}}
					/>
				</TableCell>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell._id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell._id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell._id}
							direction={orderBy === headCell._id ? order : 'asc'}
							onClick={createSortHandler(headCell._id)}
						>
							{headCell.label}
							{orderBy === headCell._id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {

	const { numSelected } = props;

	return (

		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				...(numSelected > 0 && {
					bgcolor: (theme) =>
						alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
				}),
			}}
		>

			{numSelected > 0 ? (
				<Typography
					sx={{ flex: '1 1 100%' }}
					color="inherit"
					variant="subtitle1"
					component="div"
				>
					{numSelected} selected
				</Typography>
			) : (
				<Typography
					sx={{ flex: '1 1 100%' }}
					_id="tableTitle"
					variant="h5"
					component="div"
				>
					All Cars
				</Typography>
			)}



			{numSelected > 0 ? (
				<Tooltip title="Delete">
					<IconButton>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="Filter list">
					<IconButton>
						<FilterListIcon />
					</IconButton>
				</Tooltip>
			)}

		</Toolbar>
	);
}

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
};

export default function DashboardProducts() {
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('vin');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	// const [rows, setRows] = useState([]);
	const dispatch = useDispatch();
	const { rows, status, error } = useSelector((state) => state.listCars);

	useEffect(() => {
		// Dispatch the action to fetch cars from the database
		dispatch(listCars(1))
	}, [dispatch]);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelected = rows.map((n) => n._id);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, _id) => {
		const selectedIndex = selected.indexOf(_id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, _id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}
		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleChangeDense = (event) => {
		setDense(event.target.checked);
	};

	const isSelected = (_id) => selected.indexOf(_id) !== -1;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const visibleRows = React.useMemo(
		() =>
			stableSort(rows, getComparator(order, orderBy)).slice(
				page * rowsPerPage,
				page * rowsPerPage + rowsPerPage,
			),
		[order, orderBy, page, rowsPerPage],
	);
	
	// if (status === 'loading') {
	// 	return <div>Loading...</div>;
	// }
	// // else 
	// if (error) {
	// 	return <div>Error: {error}</div>;
	// }
	// else if (status === 'succeeded')
	// {
	// 	return (
	// 		<TableContainer component={Paper}>
	// 			<Table>
	// 				<TableHead>
	// 					<TableRow>
	// 						<TableCell>ID</TableCell>
	// 						<TableCell>Name</TableCell>
	// 						<TableCell>VIN</TableCell>
	// 						<TableCell>Brand</TableCell>
	// 						<TableCell>Discount Price</TableCell>
	// 						<TableCell>Price</TableCell>
	// 					</TableRow>
	// 				</TableHead>
	// 				<TableBody>
	// 					{rows.map(row => (
	// 						<TableRow key={row.id}>
	// 							<TableCell>{row.id}</TableCell>
	// 							<TableCell>{row.name}</TableCell>
	// 							<TableCell>{row.vin}</TableCell>
	// 							<TableCell>{row.brand}</TableCell>
	// 							<TableCell>{row.discount_price}</TableCell>
	// 							<TableCell>{row.price}</TableCell>
	// 						</TableRow>
	// 					))}
	// 				</TableBody>
	// 			</Table>
	// 		</TableContainer>
	// 	);
	// }
		return (
			<Box className="large:p-24 small:px-8 small:py-20 relative w-full">
	
				<Paper sx={{ width: '100%', mb: 2 }}>
					<EnhancedTableToolbar numSelected={selected.length} />
					<TableContainer>
						<Table
							sx={{ minWidth: 750 }}
							aria-labelledby="tableTitle"
							size={dense ? 'small' : 'medium'}
						>
							<EnhancedTableHead
								numSelected={selected.length}
								order={order}
								orderBy={orderBy}
								onSelectAllClick={handleSelectAllClick}
								onRequestSort={handleRequestSort}
								rowCount={rows.length}
							/>
							<TableBody>
								{visibleRows.map((row, index) => {
									const isItemSelected = isSelected(row._id);
									const labelId = `enhanced-table-checkbox-${index}`;
	
									return (
										<TableRow
											hover
											onClick={(event) => handleClick(event, row._id)}
											role="checkbox"
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={row._id}
											selected={isItemSelected}
											sx={{ cursor: 'pointer' }}
										>
											<TableCell padding="checkbox">
												<Checkbox
													color="primary"
													checked={isItemSelected}
													inputProps={{
														'aria-labelledby': labelId,
													}}
												/>
											</TableCell>
											<TableCell
												component="th"
												id={labelId}
												scope="row"
												padding="none"
											>
												{row.name}
											</TableCell>
											<TableCell align="right">{row.vin}</TableCell>
											<TableCell align="right">{row.brand}</TableCell>
											<TableCell align="right">{row.discount_price}</TableCell>
											<TableCell align="right">{row.price}</TableCell>
										</TableRow>
									);
								})}
								{emptyRows > 0 && (
									<TableRow
										style={{
											height: (dense ? 33 : 53) * emptyRows,
										}}
									>
										<TableCell colSpan={6} />
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={rows.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Paper>
				<FormControlLabel
					control={<Switch checked={dense} onChange={handleChangeDense} />}
					label="Dense padding"
				/>
	
				<Link 
					type='button'
					to="add-car" 
					className="bg-zinc-800 float-right large:w-1/6 small:w-1/3 justify-center flex items-center hover:bg-zinc-600 duration-300 text-white small:text-xs large:text-sm  font-medium small:py small:px-1 py-2 px-4 border border-gray-400 rounded shadow">
						<IoAddOutline size={18} className='mr-2' />   Add a car
				</Link>
			</Box>
	
		);
	// }
}
