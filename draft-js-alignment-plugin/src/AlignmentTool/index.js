import React from 'react';
import {
  AlignBlockDefaultButton,
  AlignBlockLeftButton,
  AlignBlockCenterButton,
  AlignBlockRightButton,
} from 'draft-js-buttons'; // eslint-disable-line import/no-unresolved
import styles from '../alignmentToolStyles.css';
import buttonStyles from '../buttonStyles.css';

// TODO make toolbarHeight to be determined or a parameter
const toolbarHeight = 44;

export default class AlignmentTool extends React.Component {

  state = {
    position: {},
    alignmentData: {},
  }

  componentWillMount() {
    this.props.store.subscribeToItem('isVisible', this.onVisibilityChanged);
    this.props.store.subscribeToItem('alignmentData', this.onAlignmentDataChange);
  }

  componentWillUnmount() {
    this.props.store.unsubscribeFromItem('isVisible', this.onVisibilityChanged);
    this.props.store.unsubscribeFromItem('alignmentData', this.onAlignmentDataChange);
  }

  onVisibilityChanged = (isVisible) => {
    const boundingRect = this.props.store.getItem('boundingRect');
    const position = isVisible ? {
      top: (boundingRect.top + window.scrollY) - toolbarHeight,
      left: boundingRect.left + window.scrollX + (boundingRect.width / 2),
      transform: 'translate(-50%) scale(1)',
      transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
    } : {
      transform: 'translate(-50%) scale(0)',
    };
    this.setState({
      position,
    });
  }

  onAlignmentDataChange = (alignmentData) => {
    this.setState({
      alignmentData,
    });
  }

  render() {
    const defaultButtons = [
      AlignBlockDefaultButton,
      AlignBlockLeftButton,
      AlignBlockCenterButton,
      AlignBlockRightButton,
    ];
    return (
      <div
        className={styles.alignmentTool}
        style={this.state.position}
      >
        {defaultButtons.map((Button, index) => (
          <Button
            /* the index can be used here as the buttons list won't change */
            key={index}
            alignmentData={this.state.alignmentData}
            setAlignmentData={this.props.store.getItem('setAlignmentData')}
            theme={buttonStyles}
          />
        ))}
      </div>
    );
  }
}
