import React, { Fragment} from "react";
import Alert from '@material-ui/lab/Alert';

export default function Error({error}) {

    return (
        <Fragment>
            {
                error.map(item => 
                    <Alert key={item.id} className="mb-3" severity="error">
                        {item.message}
                    </Alert>
                ) 
            }
        </Fragment>
    )

}
