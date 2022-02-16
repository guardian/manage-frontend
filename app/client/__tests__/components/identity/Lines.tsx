import serializer from 'jest-emotion';
import React from 'react';
import { create } from 'react-test-renderer';
import { Lines } from '../../../components/identity/Lines';

expect.addSnapshotSerializer(serializer);

describe('Lines', () => {
	it('draws one line when n = 1', () => {
		const container = create(<Lines n={1} />);
		expect(container).toMatchSnapshot();
	});
	it('draws one line when n = 2', () => {
		const container = create(<Lines n={2} />);
		expect(container).toMatchSnapshot();
	});
});
