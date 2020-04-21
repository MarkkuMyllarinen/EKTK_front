import React from 'react';
import 'react-table-v6/react-table.css';
import ReactTable from "react-table-v6";
import Rating from "@material-ui/lab/Rating";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

function MovieTable() {

    const [listItems, setListItems] = React.useState([]);
    const [rowState, setRow] = React.useState();
    const [open, setOpen] = React.useState(false);
    React.createRef();
    let rating = [{value: 0}];

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    function fetchData() {
        fetch('https://ektk.herokuapp.com/api/movies')
            .then(response => response.json())
            .then(responseData => {
                setListItems(responseData);
            })
    }

    const updateRating = () => {

        fetch('https://ektk.herokuapp.com/api/addrating/movieid=' + rowState, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rating)
        })
            .then(res => fetchData())
            .catch(err => console.log(err))
    };


    const onStarChange = (nextValue) => {
        console.log(nextValue)
        rating = ([{value: nextValue}])
        console.log(JSON.stringify(rating))
        updateRating();
        setOpen(true);
    }
    const onStarClick = (row) => {
        console.log(row.original.id)
        setRow(row.original.id)
    }

    React.useEffect(() => {
        fetchData();
    }, []);


    const columns = [{
        Header: 'Movie',
        accessor: 'movieName'
    }, {
        Header: 'Year',
        accessor: 'year',
    }, {
        Header: 'Rating',
        accessor: 'avarageRating',
    }, {
        accessor: "progress",
        filterable: false,
        sortable: false,
        Cell: row => (<Rating style={{margin: 20}}
                              max={10} value={0}
                              onChange={(event, nextValue) => {
                                  onStarChange(nextValue);
                              }}
                              onClick={(event, nextValue) => onStarClick(row, nextValue)}
        />)
    }]

    const defaultSorted = [{
        id: "stringTime",
        desc: true
    }];

    return (
        <div className="App">
            <ReactTable data={listItems}
                        columns={columns} sortable={true}
                        defaultPageSize={20}
                        defaultSorted={defaultSorted}/>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Arvostelusi on rekisteröity!
                </Alert>
            </Snackbar>
        </div>
    );
}

export default MovieTable;
