import React from 'react';

import ButtonExamples from './ButtonExamples';
import ButtonGroupExamples from './ButtonGroupExamples';
import TabsExamples from './TabsExamples';
import ModalExamples from './ModalExamples';
import FormExamples from './FormExamples';

import { Button, Tree, TreeNode } from 'react-lightning-design-system';

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = { section: 'button' };
  }

  onSelectSection(e, props) {
    if (props.name) {
      this.setState({ section: props.name });
    }
  }

  render() {
    let section = this.state.section;
    return (
      <div className='slds-grid'>
        <div className='slds-col slds-size--1-of-4 '>
          <Tree onNodeClick={ this.onSelectSection.bind(this) } toggleOnNodeClick>
            <TreeNode label='Components' defaultOpened={ true }>
              <TreeNode label='Button' leaf={ true } name='button' />
              <TreeNode label='Button Group' leaf={ true } name='buttongroup' />
              <TreeNode label='Tabs' leaf={ true } name='tabs' />
              <TreeNode label='Modal' leaf={ true } name='modal' />
              <TreeNode label='Form' leaf={ true } name='form' />
            </TreeNode>
          </Tree>
        </div>
        <div className='slds-col slds-size--3-of-4 '>
          { section === 'button' ? <ButtonExamples /> : null }
          { section === 'buttongroup' ? <ButtonGroupExamples /> : null }
          { section === 'tabs' ? <TabsExamples /> : null }
          { section === 'modal' ? <ModalExamples /> : null }
          { section === 'form' ? <FormExamples /> : null }
        </div>
      </div>
    );
  }
}
