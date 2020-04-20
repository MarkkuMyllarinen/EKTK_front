import React from 'react';
import 'react-table-v6/react-table.css';
import ReactTable from "react-table-v6";
import StarRating from "./StarRating";
import Rating from "@material-ui/lab/Rating";

function MovieTable() {

    const [listItems, setListItems] = React.useState([]);
    //const [rating, setRating] = React.useState([{value: 0}]);
    const [status, setStatus] = React.useState(false);
    const [rowState, setRow] = React.useState();

    let rating = [{value: 0}];


    function fetchData() {
        fetch('http://localhost:8080/api/movies')
            .then(response => response.json())
            .then(responseData => {
                setListItems(responseData);
            })
    }

    const updateRating = () => {

        fetch('http://localhost:8080/api/addrating/movieid=' + rowState, {
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
        // props.rating([{value: nextValue}])
        //props.setStatus(true)
        console.log(nextValue)
        rating = ([{value: nextValue}])
        console.log(JSON.stringify(rating))
        updateRating();
    }
    const onStarClick = (row) => {
        // props.rating([{value: nextValue}])
        //props.setStatus(true)
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
        </div>
    );
}

export default MovieTable;
