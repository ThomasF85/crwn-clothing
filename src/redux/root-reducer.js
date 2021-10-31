import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import { persistReducer } from "redux-persist";
import localStorage from "redux-persist/lib/storage";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";

const cartPersistConfig = {
    key: 'cart',
    storage: localStorage,
    whitelist: ['nullUserCartItems']
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: persistReducer(cartPersistConfig, cartReducer),
    directory: directoryReducer,
    shop: shopReducer
});

export default rootReducer;