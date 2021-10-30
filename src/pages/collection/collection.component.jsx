import React from "react";

import './collection.styles.scss';
import {connect} from "react-redux";
import {createSelector} from "reselect";
import CollectionItem from "../../components/collection-item/collection-item.component";

const CollectionPage = ({collection}) => {
    if (!collection) {
        return <div>URL not found</div>
    }
    const {title, items} = collection;
    return (
        <div className='collection-page'>
            <h2 className='title'>{title}</h2>
            <div className='items'>
                {
                    items.map(item => <CollectionItem key={item.id} item={item}/>)
                }
            </div>
        </div>)
}

const selectCategory = createSelector(
    [state => state.shop.collections, (state, props) => props.match.params.category],
    (collections, category) => collections[category]
)

const mapStateToProps = (state, props) => ({
    collection: selectCategory(state, props)
});

export default connect(mapStateToProps)(CollectionPage);