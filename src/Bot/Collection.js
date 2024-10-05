import React, { useEffect, Fragment, useState } from "react";
import { 
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Typography
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { CollectionList, CollectionForm } from './../Collection';


export default function Collection(props) {

    const [collection_modal, setCollectionModal] = useState(false);
    const [new_collection_modal, setNewCollectionModal] = useState(false);
    const [preload, setPreload] = useState([]);

    // redux
    const redux = useSelector(state => state);

    useEffect(() => {
        setCollectionModal(true); // show modal on load
    },[]);

    return (
        <Fragment>
            <Dialog
                fullWidth={true}
                maxWidth={'sm'}
                open={collection_modal}
                onClose={() => { setCollectionModal(false); props.callback(); }}
                aria-labelledby="collection-modal"
            >
                <div className="d-flex align-items-center justify-content-between">
                    <DialogTitle id="collection-modal">
                        Your Collections
                    </DialogTitle> 
                    <div className="pr-3">
                        <Button color="primary" onClick={() => setNewCollectionModal(true)}>
                            Create New Collection
                        </Button>
                    </div>
                </div>
                <DialogContent>
                    <Typography variant="body2" className="mb-3">Select a collection to add this bot:</Typography>
                    <CollectionList
                        query={{ 'user': redux.app.user._id, '_sort': 'createdAt:desc' }}
                        bot_id={props.bot_id}
                        preload={preload}
                        mode="add"
                    />
                </DialogContent>
                <DialogActions className="pt-0">
                    <Button onClick={() => { setCollectionModal(false); props.callback(); }} color="default" variant="outlined">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                fullWidth={true}
                maxWidth={'sm'}
                open={new_collection_modal}
                onClose={() => setNewCollectionModal(false)}
                aria-labelledby="new-collection-modal"
            >
                <DialogTitle id="new-collection-modal">
                    Create New Collection
                </DialogTitle> 
                <DialogContent>
                    <CollectionForm
                        callback={(new_collection) => {
                            setNewCollectionModal(false);
                            console.log("new_collection", new_collection)
                            setPreload([new_collection]);
                        }}
                        mode="new"
                    />
                </DialogContent>
                <DialogActions className="pt-0">
                    <Button onClick={() => { setNewCollectionModal(false); }} color="default" variant="outlined">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )

}
