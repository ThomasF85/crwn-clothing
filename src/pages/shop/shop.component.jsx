import React from 'react';
import {Route, Switch} from "react-router-dom";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import {subscribeToCollections} from "../../firebase/firebase.utils";
import {updateCollections} from "../../redux/shop/shop.actions";
import {connect} from "react-redux";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    state = {
        loading: true
    };

    unsubscribeFromCollection = null;

    componentDidMount() {
        const {update} = this.props;
        this.unsubscribeFromCollection = subscribeToCollections(collections => {
            update(collections);
            this.setState({ loading: false });
        });
    }

    componentWillUnmount() {
        if (this.unsubscribeFromCollection) {
            this.unsubscribeFromCollection();
        }
    }

    render() {
        const {match} = this.props;
        const {loading} = this.state;
        return (
            <div className='shop-page'>
                <Switch>
                    <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />}/>
                    <Route path={`${match.path}/:category`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />}/>
                </Switch>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    update: collections => dispatch(updateCollections(collections))
});

export default connect(null, mapDispatchToProps)(ShopPage);