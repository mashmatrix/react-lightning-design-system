import React from 'react';
import { shallow } from 'enzyme';
import assert from 'power-assert';

import FormElement from '../src/scripts/FormElement';

describe('Form Element', () => {
  describe('render', () => {
    it('should add slds-has-error class to the top-level div when error text is provided', () => {
      const input = <input type='text' value='abc' />;
      const fe = new FormElement({
        id: '123', className: 'test', label: 'Hello World', error: 'not-real',
        children: input,
      });
      const expected = (<div className='slds-form-element slds-has-error test'>
        { fe.renderLabel() }
        { fe.renderControl({ children: input, error: 'not-real' }) }
      </div>);

      expect(shallow(fe.render()).contains(expected)).to.be.true;
    });

    it('should render a label + control if dropdown is false', () => {
      const input = <input type='text' value='abc' />;

      const fe = new FormElement({
        id: '123', className: 'test', label: 'Hello World',
        children: input,
      });

      const expected = (<div className='slds-form-element test'>
        { fe.renderLabel() }
        { fe.renderControl({ children: input }) }
      </div>);

      expect(shallow(fe.render()).contains(expected)).to.be.true;
    });

    it('should render a dropdown when dropdown is true', () => {
      const children = <input type='text' value='abc' />;
      const dropdown = <span>My Dropdown</span>;
      const fe = new FormElement({
        dropdown, id: '123', className: 'test', label: 'Hello World', children,
      });

      const expected = (<div className='slds-form-element react-slds-dropdown-form-element test'>
        <div className='slds-form-element'>
          { fe.renderLabel() }
          { fe.renderControl({ children }) }
        </div>
        <div className='react-slds-dropdown-control-wrapper'>
          { fe.renderControl({ children: dropdown }) }
        </div>
      </div>);

      const component = shallow(fe.render());

      expect(component.contains(expected)).to.be.true;
    });

    it('should render a dropdown with the correct cols and total cols information', () => {
      const children = <input type='text' value='abc' />;
      const dropdown = <span>My Dropdown</span>;
      const fe = new FormElement({
        dropdown, cols: 6, totalCols: 1,
        id: '123', className: 'test', label: 'Hello World', children,
      });

      const expected = (<div className='slds-form-element slds-size--6-of-1 react-slds-dropdown-form-element test'>
        <div className='slds-form-element'>
          { fe.renderLabel() }
          { fe.renderControl({ children }) }
        </div>
        <div className='react-slds-dropdown-control-wrapper'>
          { fe.renderControl({ children: dropdown }) }
        </div>
      </div>);

      const component = shallow(fe.render());

      expect(component.contains(expected)).to.be.true;
    });
  });

  describe('renderLabel', () => {
    it('render an astericks in addition to the label if the field is required', () => {
      const fe = new FormElement({ id: '123', label: 'Hello World', required: true });
      const component = shallow(fe.renderLabel());
      expect(component.contains(
        <label className='slds-form-element__label' htmlFor='123'>
          Hello World
          <abbr className='slds-required'>*</abbr>
        </label>)
      ).to.be.true;
    });

    it('should take in a string and return a label tag containg the string', () => {
      const fe = new FormElement({ id: '123', label: 'Hello World' });
      const component = shallow(fe.renderLabel());

      expect(component.contains(
        <label className='slds-form-element__label' htmlFor='123'>
          Hello World
        </label>)
      ).to.be.true;
    });

    it('should return undefined if no label is set', () => {
      const fe = new FormElement({ id: '123', label: null });
      assert(fe.renderLabel() === undefined);
    });
  });

  describe('renderControl', () => {
    it('should render an input containg all of its children wrapped by a div with the slds-form-element__control class', () => {
      const fe = new FormElement({ id: '123', label: 'Hello World' });
      const component = shallow(fe.renderControl({ children: [<span key={'h'}>Hello</span>, <span key={'w'}>World</span>] }));
      expect(component.contains(
        <div className='slds-form-element__control'>
          <span>Hello</span>
          <span>World</span>
        </div>)
      ).to.be.true;
    });

    it('should render a slds-form-element__help span below the children if error text (as a string) is provided', () => {
      const fe = new FormElement({ id: '123', label: 'Hello World' });
      const component = shallow(fe.renderControl({
        children: [<span key={'h'}>Hello</span>, <span key={'w'}>World</span>],
        error: 'some text',
      }));

      expect(component.contains(
        <div className='slds-form-element__control'>
          <span>Hello</span>
          <span>World</span>
          <span className='slds-form-element__help'>some text</span>
        </div>)
      ).to.be.true;
    });

    it('should render a slds-form-element__help span below the children if error text (as an object) is provided', () => {
      const fe = new FormElement({ id: '123', label: 'Hello World' });
      const component = shallow(fe.renderControl({
        children: [<span key={'h'}>Hello</span>, <span key={'w'}>World</span>],
        error: { message: 'some text' },
      }));

      expect(component.contains(
        <div className='slds-form-element__control'>
          <span>Hello</span>
          <span>World</span>
          <span className='slds-form-element__help'>some text</span>
        </div>)
      ).to.be.true;
    });
  });
});
