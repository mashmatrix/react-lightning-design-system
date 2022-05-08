import React, {
  ComponentProps,
  ReactElement,
  useCallback,
  useState,
} from 'react';
import { Button, Lookup, LookupEntry, LookupScope } from '../src/scripts';
import COMPANIES from './data/COMPANIES';
import OPPORTUNITIES from './data/OPPORTUNITIES';
import CAMPAIGNS from './data/CAMPAIGNS';
import CASES from './data/CASES';
import SCOPES from './data/SCOPES';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { containerDecorator } from './util';

/**
 * example data set used for lookup datasource
 */
const COMPANY_DATA: LookupEntry[] = COMPANIES.map((label, i) => ({
  icon: 'standard:account',
  label,
  value: `10000${i}`,
  meta: '(888)000-0000 / 1234 XXX Ave, BBB City, CA, 90210 USA',
  scope: 'Account',
}));
const OPP_DATA: LookupEntry[] = COMPANIES.map((label, i) => ({
  icon: 'standard:opportunity',
  label: `${label} - ${OPPORTUNITIES[i % OPPORTUNITIES.length]}`,
  value: `20000${i}`,
  scope: 'Opportunity',
}));
const CAMPAIGN_DATA: LookupEntry[] = CAMPAIGNS.map((label, i) => ({
  icon: 'standard:campaign',
  label,
  value: `30000${i}`,
  scope: 'Campaign',
}));
const CASE_DATA: LookupEntry[] = CASES.map((label, i) => ({
  icon: 'standard:case',
  label,
  value: `40000${i}`,
  scope: 'Case',
}));
const LOOKUP_SCOPES: LookupScope[] = SCOPES.map((label) => ({
  label,
  value: label,
  icon: `standard:${label.toLowerCase()}`,
}));
const LOOKUP_DATASET = [
  ...COMPANY_DATA,
  ...OPP_DATA,
  ...CAMPAIGN_DATA,
  ...CASE_DATA,
];

/**
 * Async function to load datasets
 */
function queryData(
  searchText: string,
  targetScope: string,
  callback: (data: LookupEntry[]) => void
) {
  setTimeout(() => {
    const data = LOOKUP_DATASET.filter(
      (entry) =>
        entry.scope === targetScope &&
        entry.label.toUpperCase().indexOf(searchText.toUpperCase()) === 0
    );
    callback(data);
  }, 1000);
}

/**
 * state wrapper class for showing controlled behavior
 */
type LookupProps = ComponentProps<typeof Lookup>;

const LookupControlled: React.FC<
  LookupProps & { children: (props: LookupProps) => ReactElement }
> = ({
  children: renderer,
  onScopeMenuClick: onScopeMenuClick_,
  onScopeSelect: onScopeSelect_,
  onSearchTextChange: onSearchTextChange_,
  onLookupRequest: onLookupRequest_,
  onSelect: onSelect_,
  onComplete: onComplete_,
  ...props
}) => {
  const [data, setData] = useState<LookupProps['data']>([]);
  const [searchText, setSearchText] = useState<LookupProps['searchText']>('');
  const [selected, setSelected] = useState<LookupProps['selected']>(null);
  const [loading, setLoading] = useState<LookupProps['loading']>(false);
  const [opened, setOpened] = useState<LookupProps['opened']>(false);
  const [targetScope, setTargetScope] = useState<LookupProps['targetScope']>(
    props.targetScope
  );
  const onScopeMenuClick = useCallback(
    (...args: Parameters<NonNullable<LookupProps['onScopeMenuClick']>>) => {
      onScopeMenuClick_?.(...args);
      setOpened(false);
    },
    [onScopeMenuClick_]
  );
  const onScopeSelect = useCallback(
    (targetScope: string) => {
      onScopeSelect_?.(targetScope);
      setTargetScope(targetScope);
    },
    [onScopeSelect_]
  );
  const onSearchTextChange = useCallback(
    (searchText: string) => {
      onSearchTextChange_?.(searchText);
      setSearchText(searchText);
    },
    [onSearchTextChange_]
  );
  const onLookupRequest = useCallback(
    (searchText: string | undefined) => {
      onLookupRequest_?.(searchText ?? '');
      setData([]);
      setLoading(true);
      setOpened(true);
      queryData(searchText ?? '', targetScope ?? 'Account', (data) => {
        setData(data);
        setLoading(false);
      });
    },
    [targetScope, onLookupRequest_]
  );
  const onSelect = useCallback(
    (selected: LookupEntry | null) => {
      onSelect_?.(selected);
      setSelected(selected);
    },
    [onSelect_]
  );
  const onComplete = useCallback(
    (...args: Parameters<NonNullable<LookupProps['onComplete']>>) => {
      onComplete_?.(...args);
      setOpened(false);
    },
    [onComplete_]
  );
  return renderer({
    ...props,
    opened,
    searchText,
    selected,
    data,
    loading,
    targetScope,
    onScopeSelect,
    onScopeMenuClick,
    onSearchTextChange,
    onLookupRequest,
    onSelect,
    onComplete,
  });
};

/**
 *
 */
const meta: ComponentMeta<typeof Lookup> = {
  title: 'Lookup',
  component: Lookup,
  argTypes: {
    onSearchTextChange: { action: 'searchTextChange' },
    onLookupRequest: { action: 'lookupRequest' },
    onSelect: { action: 'select' },
    onScopeMenuClick: { action: 'scopeMenuClick' },
    onScopeSelect: { action: 'scopeSelect' },
    onBlur: { action: 'blur' },
    onComplete: { action: 'complete' },
  },
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 500,
    },
  },
};
export default meta;

/**
 *
 */
export const ControlledWithKnobs: ComponentStoryObj<typeof Lookup> = {
  name: 'Controlled with knobs',
  args: {
    label: 'Lookup Label',
    data: COMPANY_DATA,
  },
  parameters: {
    docs: {
      description: {
        story: 'Lookup controlled with knobs',
      },
    },
  },
};

/**
 *
 */
export const Required: ComponentStoryObj<typeof Lookup> = {
  args: {
    label: 'Lookup Label',
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Lookup component with required attribute',
      },
      iframeHeight: 120,
    },
  },
};

/**
 *
 */
export const Error: ComponentStoryObj<typeof Lookup> = {
  args: {
    label: 'Lookup Label',
    required: true,
    error: 'This field is required',
  },
  parameters: {
    docs: {
      description: {
        story: 'Lookup component with error message',
      },
      iframeHeight: 120,
    },
  },
};

/**
 *
 */
export const Disabled: ComponentStoryObj<typeof Lookup> = {
  args: {
    label: 'Lookup Label',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Lookup component with disabled status',
      },
      iframeHeight: 120,
    },
  },
};

/**
 *
 */
export const WithSearchText: ComponentStoryObj<typeof Lookup> = {
  name: 'With search text',
  args: {
    label: 'Lookup Label',
    searchText: 'A',
  },
  parameters: {
    docs: {
      description: {
        story: 'Lookup component with search input text',
      },
      iframeHeight: 120,
    },
  },
};

/**
 *
 */
export const WithSearchIconInLeft: ComponentStoryObj<typeof Lookup> = {
  name: 'With search icon in left',
  args: {
    label: 'Lookup Label',
    searchText: 'A',
    iconAlign: 'left',
  },
  parameters: {
    docs: {
      description: {
        story: 'Lookup component with search text and search icon in left side',
      },
      iframeHeight: 120,
    },
  },
};

/**
 *
 */
export const WithSelection: ComponentStoryObj<typeof Lookup> = {
  name: 'With selection',
  args: {
    label: 'Lookup Label',
    selected: COMPANY_DATA[0],
  },
  parameters: {
    docs: {
      description: {
        story: 'Lookup component with item selected',
      },
      iframeHeight: 120,
    },
  },
};

/**
 *
 */
export const OpenedInLoading: ComponentStoryObj<typeof Lookup> = {
  name: 'Opened - In Loading',
  args: {
    label: 'Lookup Label',
    searchText: 'A',
    opened: true,
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Lookup component in loading candidates',
      },
      iframeHeight: 150,
    },
  },
};

/**
 *
 */
export const OpenedActive: ComponentStoryObj<typeof Lookup> = {
  name: 'Opened - Active',
  args: {
    label: 'Lookup Label',
    searchText: 'A',
    opened: true,
    data: COMPANY_DATA,
    selected: null,
  },
  decorators: [containerDecorator({ height: 350 })],
  parameters: {
    docs: {
      description: {
        story: 'Lookup component with candidates in dropdown',
      },
    },
  },
};

/**
 *
 */
export const OpenedWithListHeaderFooter: ComponentStoryObj<typeof Lookup> = {
  name: 'Opened - With list header/footer',
  args: {
    label: 'Lookup Label',
    searchText: 'A',
    opened: true,
    data: COMPANY_DATA,
    selected: null,
    listHeader: (
      <Button icon='search' iconAlign='left'>
        &quot;A&quot; in Account
      </Button>
    ),
    listFooter: (
      <Button icon='add' iconAlign='left'>
        Add new Account
      </Button>
    ),
  },
  decorators: [containerDecorator({ height: 420 })],
  parameters: {
    docs: {
      description: {
        story:
          'Lookup component with header/footer component in the candidate list',
      },
    },
  },
};

/**
 *
 */
export const DefaultOpenedInLoading: ComponentStoryObj<typeof Lookup> = {
  name: 'defaultOpened - In Loading',
  args: {
    label: 'Lookup Label',
    searchText: 'A',
    defaultOpened: true,
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Lookup component (defaultOpened = true) in loading candidates',
      },
      iframeHeight: 150,
    },
  },
};

/**
 *
 */
export const DefaultOpenedActive: ComponentStoryObj<typeof Lookup> = {
  name: 'defaultOpened - Active',
  args: {
    label: 'Lookup Label',
    searchText: 'A',
    defaultOpened: true,
    data: COMPANY_DATA,
    selected: null,
  },
  decorators: [containerDecorator({ height: 350 })],
  parameters: {
    docs: {
      description: {
        story:
          'Lookup component (defaultOpened = true) with candidates in dropdown',
      },
    },
  },
};

/**
 *
 */
export const DefaultOpenedWithListHeaderFooter: ComponentStoryObj<
  typeof Lookup
> = {
  name: 'defaultOpened - With list header/footer',
  decorators: [containerDecorator({ height: 420 })],
  args: {
    label: 'Lookup Label',
    searchText: 'A',
    defaultOpened: true,
    data: COMPANY_DATA,
    selected: null,
    listHeader: (
      <Button icon='search' iconAlign='left'>
        &quot;A&quot; in Account
      </Button>
    ),
    listFooter: (
      <Button icon='add' iconAlign='left'>
        Add new Account
      </Button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Lookup component (defaultOpened = true) with header/footer component in the candidate list',
      },
    },
  },
};

/**
 *
 */
export const MultiScope: ComponentStoryObj<typeof Lookup> = {
  args: {
    label: 'Lookup (multiple scope)',
    opened: false,
    selected: null,
    searchText: 'A',
    scopes: LOOKUP_SCOPES,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Lookup component which allows multiples scopes to select as lookup datasource',
      },
      iframeHeight: 120,
    },
  },
};

/**
 *
 */
export const MultiScopeRequired: ComponentStoryObj<typeof Lookup> = {
  name: 'Multi Scope - Required',
  args: {
    label: 'Lookup (multiple scope, required)',
    opened: false,
    selected: null,
    required: true,
    scopes: LOOKUP_SCOPES,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Lookup component which allows multiples scopes selection, with required attribute',
      },
      iframeHeight: 120,
    },
  },
};

/**
 *
 */
export const MultiScopeError: ComponentStoryObj<typeof Lookup> = {
  name: 'Multi Scope - Error',
  args: {
    label: 'Lookup (multiple scope, error)',
    opened: false,
    selected: null,
    required: true,
    error: 'This field is required',
    scopes: LOOKUP_SCOPES,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Lookup component which allows multiples scopes selection, with error message',
      },
      iframeHeight: 120,
    },
  },
};

/**
 *
 */
export const MultiScopeDisabled: ComponentStoryObj<typeof Lookup> = {
  name: 'Multi Scope - Disabled',
  args: {
    label: 'Lookup (multiple scope, disabled)',
    opened: false,
    selected: null,
    disabled: true,
    scopes: LOOKUP_SCOPES,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Lookup component which allows multiples scopes selection, but in disabled status',
      },
      iframeHeight: 120,
    },
  },
};

/**
 *
 */
export const Controlled: ComponentStoryObj<typeof Lookup> = {
  render: (args) => (
    <LookupControlled {...args}>
      {(props) => <Lookup {...props} />}
    </LookupControlled>
  ),
  args: {
    label: 'Lookup (Controlled)',
  },
  parameters: {
    docs: {
      description: {
        story: 'Lookup component whose state is controlled from outside',
      },
    },
  },
};

/**
 *
 */
export const Uncontrolled: ComponentStoryObj<typeof Lookup> = {
  args: {
    label: 'Lookup (Uncontrolled)',
    defaultSearchText: 'A',
    data: COMPANY_DATA,
    lookupFilter: (entry, searchText) =>
      searchText !== undefined &&
      entry.label.toUpperCase().indexOf(searchText.toUpperCase()) === 0,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Lookup component whose state is managed inside of the component',
      },
    },
  },
};

/**
 *
 */
export const ControlledWithMultiScope: ComponentStoryObj<typeof Lookup> = {
  ...Controlled,
  name: 'Controlled with Multi Scope',
  args: {
    label: 'Lookup (Controlled, Multi Scope)',
    scopes: LOOKUP_SCOPES,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Lookup component whose state is controlled from outside, search scope is selectable from multiple scope',
      },
    },
  },
};

/**
 *
 */
export const UncontrolledWithMultiScope: ComponentStoryObj<typeof Lookup> = {
  name: 'Uncontrolled with Multi Scope',
  args: {
    label: 'Lookup (Uncontrolled, Multi Scope)',
    scopes: LOOKUP_SCOPES,
    defaultTargetScope: 'Opportunity',
    defaultSearchText: 'A',
    data: LOOKUP_DATASET,
    lookupFilter: (entry, searchText, scope) =>
      entry.scope === scope &&
      searchText !== undefined &&
      entry.label.toUpperCase().indexOf(searchText.toUpperCase()) === 0,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Lookup component whose state is managed inside of the component, search scope is selectable from multiple scope',
      },
    },
  },
};
