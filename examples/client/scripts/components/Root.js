import React from 'react';

import ButtonExamples from './ButtonExamples';
import ButtonGroupExamples from './ButtonGroupExamples';
import DropdownButtonExamples from './DropdownButtonExamples';
import FormExamples from './FormExamples';
import GridExamples from './GridExamples';
import ModalExamples from './ModalExamples';
import TabsExamples from './TabsExamples';
import TreeExamples from './TreeExamples';

import { Button, Grid, Row, Col, Tree, TreeNode } from 'react-lightning-design-system';

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
    const targetSection = this.state.section;
    const sections = {
      'button': { label: 'Button', klass: ButtonExamples },
      'buttongroup': { label: 'Button Group', klass: ButtonGroupExamples },
      'dropdwonbutton': { label: 'Dropdown Button', klass: DropdownButtonExamples },
      'form': { label: 'Form', klass: FormExamples },
      'grid': { label: 'Grid', klass: GridExamples },
      'modal': { label: 'Modal', klass: ModalExamples },
      'tabs': { label: 'Tabs', klass: TabsExamples },
      'tree': { label: 'Tree', klass: TreeExamples },
    };
    return (
      <Grid frame>
        <Row>
          <Col className='slds-page-header'>
            <h1>Lightning Design System for React</h1>
          </Col>
        </Row>
        <Row cols={5} style={ { height: '100%' } }>
          <Col cols={1}>
            <Tree onNodeClick={ this.onSelectSection.bind(this) } toggleOnNodeClick>
              <TreeNode label='Components' defaultOpened={ true }>
                {
                  Object.keys(sections).map((name) => {
                    let section = sections[name];
                    return (
                      <TreeNode
                        name={ name }
                        label={ section.label }
                        leaf={ true }
                        selected={ name === targetSection } />
                    );
                  })
                }
              </TreeNode>
            </Tree>
          </Col>
          <Col cols={4} padded='large' className='slds-scrollable--y'>
            {
              Object.keys(sections).filter((name) => name === targetSection)
                .map((name) => {
                  const Example = sections[name].klass;
                  return <Example />;
                })
            }
          </Col>
        </Row>
      </Grid>
    );
  }
}
