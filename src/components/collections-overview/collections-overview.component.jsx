import React from "react";
import CollectionPreview from "../collection-preview/collection-preview.component";
import {connect} from "react-redux";

import './collections-overview.styles.scss';
import {createSelector} from "reselect";

const CollectionsOverview = ({collections}) => (
    <div className='collections-overview'>
        {
            collections.map(({id, ...otherProps}) => (
                <CollectionPreview key={id} {...otherProps} />
            ))
        }
    </div>
)

const selectCollectionsArray = createSelector(
    (state) => state.shop.collections,
    collections => Object.values(collections)
)

const mapStateToProps = state => ({
    collections: selectCollectionsArray(state)
});

export default connect(mapStateToProps)(CollectionsOverview);