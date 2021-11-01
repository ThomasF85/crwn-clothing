import React, {useEffect, useState} from 'react';
import {Route, Switch} from "react-router-dom";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import {subscribeToCollections} from "../../firebase/firebase.utils";
import {updateCollections} from "../../redux/shop/shop.actions";
import {connect} from "react-redux";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({match, update}) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribeFromCollection = subscribeToCollections(collections => {
            update(collections);
            setLoading(false);
        });
        return () => {
            console.log("UNSUB");
            if (unsubscribeFromCollection) {
                unsubscribeFromCollection();
            }
        }
    }, []);

        return (
            <div className='shop-page'>
                <Switch>
                    <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />}/>
                    <Route path={`${match.path}/:category`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />}/>
                </Switch>
            </div>
        )
}

const mapDispatchToProps = dispatch => ({
    update: collections => dispatch(updateCollections(collections))
});

export default connect(null, mapDispatchToProps)(ShopPage);