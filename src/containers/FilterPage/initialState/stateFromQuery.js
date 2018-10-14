import update from 'immutability-helper';
import { urlToState } from '../helpers';

export default function getInitialState(state) {
    return update(state, {
        filters: {
            $auto: {
                $merge: urlToState(window.location.href)
            }
        }
    });
}