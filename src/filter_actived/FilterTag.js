import { connect } from 'react-redux';
import Tag from '../common/Tag';
import { bindActionCreators } from 'redux';

const onRemove = (filterType, filterId) => () => ({
    type: "REMOVE_ACTIVATED_FILTER",
    payload: {
        filterType,
        filterId
    }
});

export default connect(
    null,
    (dispatch, ownProps) => {
        return bindActionCreators({
            onRemove: onRemove(ownProps.filterType, ownProps.filterId)
        }, dispatch);
    }
)(Tag);