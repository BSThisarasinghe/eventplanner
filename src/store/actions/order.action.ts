import { getMockdata } from '../../services/order.service';
import orderStore from '../reducers/order.reducer';

export const fetchMockdata = (): any => {
    return (dispatch: any) => {
        getMockdata()
            .then((response: any) => {
                dispatch(orderStore.actions.orderFetchSuccess(response));
            })
            .catch((error: any) => {
                dispatch(orderStore.actions.orderFetchFail());
            });
    }
};