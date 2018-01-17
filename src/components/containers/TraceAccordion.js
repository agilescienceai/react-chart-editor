import Fold from './Fold';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {EDITOR_ACTIONS} from 'lib/constants';
import {connectTraceToPlot} from 'lib';

const TraceFold = connectTraceToPlot(Fold);

class TraceAccordion extends Component {
  addTrace(onUpdate) {
    if (onUpdate) {
      onUpdate({
        type: EDITOR_ACTIONS.ADD_TRACE,
      });
    }
  }

  render() {
    const {data = []} = this.context;
    const {canAdd, children} = this.props;

    const content =
      data.length &&
      data.map((d, i) => {
        return (
          <TraceFold key={i} traceIndex={i} foldIndex={i} canDelete={canAdd}>
            {children}
          </TraceFold>
        );
      });

    return <div className="panel__content">{content}</div>;
  }
}

TraceAccordion.displayName = 'TraceAccordion';

TraceAccordion.contextTypes = {
  data: PropTypes.array,
  fullData: PropTypes.array,
};

TraceAccordion.propTypes = {
  children: PropTypes.node,
  canAdd: PropTypes.bool,
};

export default TraceAccordion;
