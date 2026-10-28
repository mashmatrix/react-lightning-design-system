import React, { useRef, useState } from 'react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Button, Popover } from '../src/scripts';

function ConditionalPopover() {
  const [opened, setOpened] = useState(false);
  const [refAttached, setRefAttached] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ padding: 32, textAlign: 'right' }}>
      <Button onClick={() => setRefAttached(contentRef.current != null)}>
        Check forwarded ref
      </Button>
      <span role='status'>
        {refAttached ? 'Ref attached' : 'Ref not checked'}
      </span>
      <div className='slds-dropdown-trigger slds-dropdown-trigger_click'>
        <Button onClick={() => setOpened((value) => !value)}>
          Toggle popover
        </Button>
        {opened && (
          <Popover ref={contentRef} tooltip style={{ width: 320 }}>
            <p>This conditionally mounted popover should become visible.</p>
            <p>Automatic alignment should keep it inside the right edge.</p>
          </Popover>
        )}
      </div>
    </div>
  );
}

const meta: ComponentMeta<typeof ConditionalPopover> = {
  title: 'Popover/StrictMode',
  component: ConditionalPopover,
  parameters: {
    docs: {
      description: {
        component:
          'Run in development mode with React 18 createRoot. Toggle the popover twice to verify mount/unmount, check its forwarded ref, and inspect the console for unknown DOM props. The NODE_ENV=test screenshot command bypasses AutoAlign portals and cannot verify this regression.',
      },
    },
  },
};
export default meta;

export const ConditionalMount: ComponentStoryObj<typeof ConditionalPopover> =
  {};
