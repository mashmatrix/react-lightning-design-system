import React from 'react';

import ButtonExamples from './ButtonExamples';
import ButtonGroupExamples from './ButtonGroupExamples';
import DatepickerExamples from './DatepickerExamples';
import DropdownButtonExamples from './DropdownButtonExamples';
import FormExamples from './FormExamples';
import GridExamples from './GridExamples';
import IconExamples from './IconExamples';
import LookupExamples from './LookupExamples';
import ModalExamples from './ModalExamples';
import NotificationExamples from './NotificationExamples';
import TabsExamples from './TabsExamples';
import TreeExamples from './TreeExamples';
import BadgeExamples from './BadgeExamples';

import { Router } from 'director';

import { Grid, Row, Col, Tree, TreeNode } from 'react-lightning-design-system';


const SECTIONS = {
  'badge': { label: 'Badge', klass: BadgeExamples },
  'button': { label: 'Button', klass: ButtonExamples },
  'buttongroup': { label: 'Button Group', klass: ButtonGroupExamples },
  'datepicker': { label: 'Datepicker', klass: DatepickerExamples },
  'dropdownbutton': { label: 'Dropdown Button', klass: DropdownButtonExamples },
  'form': { label: 'Form', klass: FormExamples },
  'grid': { label: 'Grid', klass: GridExamples },
  'icon': { label: 'Icon', klass: IconExamples },
  'lookup': { label: 'Lookup', klass: LookupExamples },
  'modal': { label: 'Modal', klass: ModalExamples },
  'notification': { label: 'Notification', klass: NotificationExamples },
  'tabs': { label: 'Tabs', klass: TabsExamples },
  'tree': { label: 'Tree', klass: TreeExamples },
};

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = { section: 'button' };
  }

  componentDidMount() {
    const routes = {};
    for (const [section] of Object.entries(SECTIONS)) {
      routes[`/${section}`] = this.setState.bind(this, { section });
    }
    routes['/'] = this.setState.bind(this, { section: 'button' });
    /* eslint-disable new-cap */
    const router = Router(routes);
    router.init();
  }

  onSelectSection(e, props) {
    if (props.name) {
      location.hash = '#/' + props.name;
    }
  }

  render() {
    const targetSection = this.state.section;
    return (
      <Grid frame>
        <Row>
          <Col className='slds-page-header'>
            <h1>Lightning Design System for React</h1>
          </Col>
        </Row>
        <Row cols={5} className='slds-has-flexi-truncate' nowrap>
          <Col cols={1}>
            <Tree onNodeClick={ this.onSelectSection.bind(this) } toggleOnNodeClick>
              <TreeNode label='Components' defaultOpened>
                {
                  Object.keys(SECTIONS).map((name, index) => {
                    const section = SECTIONS[name];
                    return (
                      <TreeNode
                        key={ index }
                        name={ name }
                        label={ section.label }
                        leaf
                        selected={ name === targetSection }
                      />
                    );
                  })
                }
              </TreeNode>
            </Tree>
          </Col>
          <Col cols={4} padded='large' className='slds-scrollable--y'>
            {
              Object.keys(SECTIONS).filter((name) => name === targetSection)
                .map((name, index) => {
                  const Example = SECTIONS[name].klass;
                  return <Example key={ index }/>;
                })
            }
          </Col>
        </Row>
      </Grid>
    );
  }
}
