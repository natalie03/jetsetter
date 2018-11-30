import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { undoItemAction, redoItemAction } from '../actions/items-actions';


const mapDispatchToProps = (dispatch) => bindActionCreators({
	undo: undoItemAction,
	redo: redoItemAction
}, dispatch);

export default connect(null, mapDispatchToProps)(({undo, redo}) => ((
	<div>
		<button onClick={undo}>Undo</button>
		<button onClick={redo}>Redo</button>
	</div>
)));
