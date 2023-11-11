import { Comment } from '../../pages/home/models/comments.model';
import { getComments, getEventImages, getPosts, getUsers } from '../../services/event.service';
import orderStore from '../reducers/event.reducer';

export const fetchEventImages = (): any => {
    return (dispatch: any) => {
        getEventImages()
            .then((response: any) => {
                dispatch(orderStore.actions.eventFetchSuccess(response.data));
            })
            .catch((error: any) => {
                dispatch(orderStore.actions.eventFetchFail());
            });
    }
};

export const fetchUsers = (): any => {
    return (dispatch: any) => {
        getUsers()
            .then((response: any) => {
                dispatch(orderStore.actions.userFetchSuccess(response.data));
            })
            .catch((error: any) => {
                dispatch(orderStore.actions.userFetchFail());
            });
    }
};

export const fetchPosts = (): any => {
    return (dispatch: any) => {
        dispatch(orderStore.actions.postsFetchLoading());
        getPosts()
            .then((response: any) => {
                dispatch(orderStore.actions.postsFetchSuccess(response.data));
            })
            .catch((error: any) => {
                dispatch(orderStore.actions.postsFetchFail());
            });
    }
};

export const fetchComments = (postId: number): any => {
    return (dispatch: any) => {
        dispatch(orderStore.actions.commentsFetchLoading());
        getComments()
            .then((response: any) => {
                const commentsForPostId = response.data.filter((comment: Comment) => comment.postId === postId);
                dispatch(orderStore.actions.commentsFetchSuccess(commentsForPostId));
            })
            .catch((error: any) => {
                dispatch(orderStore.actions.commentsFetchFail());
            });
    }
};