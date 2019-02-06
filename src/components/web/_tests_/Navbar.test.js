import React from 'react';
import { shallow, mount, render } from 'enzyme';
import ProfileUser2 from '../ProfileUser2'
// describe what we are testing
describe('fullname input', () => {

    it('should respond to change event and change the state of the fullname textinput ', () => {

        expect(shallow(<ProfileUser2 />).find('#fullName').length).toBeLessThan(0)


    })
})