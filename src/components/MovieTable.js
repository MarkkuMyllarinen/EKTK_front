import React from 'react';
import 'react-table-v6/react-table.css';
import ReactTable from "react-table-v6";

function MovieTable() {

    const [listItems, setListItems] = React.useState([]);


    function fetchData() {
        fetch('http://localhost:8080/api/movies')
            .then(response => response.json())
            .then(responseData => {
                setListItems(responseData);
            })
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
    }];

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
