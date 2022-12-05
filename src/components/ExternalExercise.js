import React from "react";

function ExternalExercise(props){
    const {data} = props;
    const {external_code } = data;
    return (
      <React.Fragment>
        {external_code}
      </React.Fragment>
    );
}

export {ExternalExercise};
