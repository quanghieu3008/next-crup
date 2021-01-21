import * as types from '../types'

export const fetchposts = (res) => (
    {
        type: types.GET_POSTS,
        payload: res
    }
);
export const addAction = (res) => (
    {
        type: types.ADD_POSTS,
        payload: res
    }
);
export const deleteAction = (res) => (
    {
        type: types.DELETE_POSTS,
        payload: res
    }
);
export const updateAction = (res) => (
    {
        type: types.UPDATE_POSTS,
        payload: res
    }
);