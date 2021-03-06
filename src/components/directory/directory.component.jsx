import React from 'react';
import MenuItem from "../menu-item/menu-item.component";

import './directory.styles.scss';
import {connect} from "react-redux";

const Directory = ({sections}) => (
    <div className='directory-menu'>
        {
            sections.map(({id, ...otherProps}) => <MenuItem key={id} {...otherProps} />)
        }
    </div>
)

const mapStateToProps = state => ({
    sections: state.directory.sections
});

export default connect(mapStateToProps)(Directory);