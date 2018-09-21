import Select from '../common/Select';
import { connect } from 'react-redux';

const onSelect = (name, value) => ({
    type: "ON_FILTER_SELECT",
    payload: { name, value }
});

export default connect(
    (state, ownProps) => ({
        ...ownProps,
    }),
    { onSelect }
)(Select);