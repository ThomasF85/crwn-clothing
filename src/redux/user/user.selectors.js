import {createSelector} from "reselect";

export const selectNullUser = createSelector(
    [state => state.user.currentUser],
    user => !user
)