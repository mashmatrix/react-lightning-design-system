import React from 'react';
import { Router } from 'director';

import { Grid, Row, Col, Tree, TreeNode } from 'react-lightning-design-system';

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
import BreadCrumbsExamples from './BreadCrumbsExamples';
import PopoverExamples from './PopoverExamples';
import PageHeaderExamples from './PageHeaderExamples';
import MediaObjectExamples from './MediaObjectExamples';
import TableExamples from './TableExamples';
import SpinnerExamples from './SpinnerExamples';
import ToggleExamples from './ToggleExamples';
import FileSelectorExamples from './FileSelectorExamples';

const SECTIONS = {
  table: { label: 'Data Table', klass: TableExamples, src: 'TableExamples' },
  badge: { label: 'Badge', klass: BadgeExamples, src: 'BadgeExamples' },
  breadcrumbs: { label: 'Breadcrumbs', klass: BreadCrumbsExamples, src: 'BreadCrumbsExamples' },
  button: { label: 'Button', klass: ButtonExamples, src: 'ButtonExamples' },
  buttongroup: { label: 'Button Group', klass: ButtonGroupExamples, src: 'ButtonGroupExamples' },
  datepicker: { label: 'Datepicker', klass: DatepickerExamples, src: 'DatepickerExamples' },
  dropdownbutton:
    { label: 'Dropdown Button', klass: DropdownButtonExamples, src: 'DropdownButtonExamples' },
  form: { label: 'Form', klass: FormExamples, src: 'FormExamples' },
  grid: { label: 'Grid', klass: GridExamples, src: 'GridExamples' },
  icon: { label: 'Icon', klass: IconExamples, src: 'IconExamples' },
  lookup: { label: 'Lookup', klass: LookupExamples, src: 'LookupExamples' },
  mediaobject: { label: 'Media Object', klass: MediaObjectExamples, src: 'MediaObjectExamples' },
  modal: { label: 'Modal', klass: ModalExamples, src: 'ModalExamples' },
  notification: { label: 'Notification', klass: NotificationExamples, src: 'NotificationExamples' },
  pageheader: { label: 'Page Header', klass: PageHeaderExamples, src: 'PageHeaderExamples' },
  popover: { label: 'Popovers', klass: PopoverExamples, src: 'PopoverExamples' },
  tabs: { label: 'Tabs', klass: TabsExamples, src: 'TabsExamples' },
  tree: { label: 'Tree', klass: TreeExamples, src: 'TreeExamples' },
  spinner: { label: 'Spinners', klass: SpinnerExamples, src: 'SpinnerExamples' },
  toggle: { label: 'Toggle', klass: ToggleExamples, src: 'ToggleExamples' },
  fileselector: { label: 'File Selector', klass: FileSelectorExamples, src: 'FileSelectorExamples' },
};

const GITHUB_EXAMPLE_SRC_DIR_URL = 'https://github.com/stomita/react-lightning-design-system/blob/master/examples/client/scripts/components/';

export default class Root extends React.Component {
  constructor() {
    super();
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
      location.hash = `#/${props.name}`;
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
        <Row cols={4} nowrap>
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
          <Col cols={4} padded='large'>
            {
              Object.keys(SECTIONS).filter(name => name === targetSection)
                .map((name, index) => {
                  const Example = SECTIONS[name].klass;
                  const src = SECTIONS[name].src;
                  return (
                    <div key={`child-${index}`}>
                      <div style={ { textAlign: 'right' } }>
                        <a
                          target='_blank'
                          rel='noopener noreferrer'
                          href={ `${GITHUB_EXAMPLE_SRC_DIR_URL}${src}.js` }
                        >
                          View source file in Github
                        </a>
                      </div>
                      <Example key={ index } />
                    </div>
                  );
                })
            }
          </Col>
        </Row>
      </Grid>
    );
  }
}
