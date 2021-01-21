import * as types from '../types';
const initialState = {
    postData: [],
    loading: false,
    error: null,
    totalItem: 10
}
export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_POSTS:
            const { items } = action.payload || []
            return {
                ...state,
                postData: items,
                loading: false,
                error: null
            };
        case types.ADD_POSTS:
            return {
                ...state,

                loading: false,
                error: null
            };
        case types.DELETE_POSTS:
       
            return {
                ...state,
                postData:action.payload,
                loading: false,
                error: null
            };
        default:
            return state;
    }
}