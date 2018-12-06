import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Tag from '../../../../components/common/Tag';
import { onRemove } from '../../actions';

export default connect(
    null,
    (dispatch, ownProps) => {
        return bindActionCreators({
            onRemove: () => onRemove(ownProps.value)
        }, dispatch);
    }
)(Tag);