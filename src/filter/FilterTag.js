import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Tag from '../common/Tag';
import { actions } from '../ducks/filters';

export default connect(
    null,
    (dispatch, ownProps) => {
        return bindActionCreators({
            onRemove: () => actions.onRemove(ownProps.value)
        }, dispatch);
    }
)(Tag);