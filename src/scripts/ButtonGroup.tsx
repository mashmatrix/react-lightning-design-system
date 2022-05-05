import React, { Children, HTMLAttributes, FC, createContext } from 'react';
import classnames from 'classnames';

/**
 *
 */
export type ButtonGroupProps = HTMLAttributes<HTMLDivElement>;

/**
 *
 */
export const ButtonGroupContext = createContext<{
  grouped: true;
  isFirstInGroup: boolean;
  isLastInGroup: boolean;
} | null>(null);

/**
 *
 */
export const ButtonGroup: FC<ButtonGroupProps> = (props) => {
  const { className, children, ...rprops } = props;
  const btnGrpClassNames = classnames(className, 'slds-button-group');
  const cnt = React.Children.count(children);
  return (
    <div className={btnGrpClassNames} role='group' {...rprops}>
      {Children.map(children, (child, index) => (
        <ButtonGroupContext.Provider
          value={{
            grouped: true,
            isFirstInGroup: index === 0,
            isLastInGroup: index === cnt - 1,
          }}
        >
          {child}
        </ButtonGroupContext.Provider>
      ))}
    </div>
  );
};
