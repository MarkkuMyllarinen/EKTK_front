import React from 'react';
import 'react-table-v6/react-table.css';
import Rating from '@material-ui/lab/Rating';

function StarRating(props) {



    const onStarClick = (nextValue, event, prevValue, name) => {
       // props.rating([{value: nextValue}])
        //props.setStatus(true)
        console.log(props.row)

    }


    return (
        <div>
            <Rating style={{margin: 20}}
                    name="ratingValue"
                    max={10} value={0}
                    onChange={(event, nextValue) => {
                        onStarClick(nextValue, event);
                    }}
            />
        </div>
    );
}

export default StarRating;
