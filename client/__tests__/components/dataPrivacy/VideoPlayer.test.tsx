import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { VideoPlayer } from '../../../components/mma/dataPrivacy/shared/VideoPlayer';

afterEach(cleanup);

describe('VideoPlayer', () => {
	it('correctly displays the video text', () => {
		render(<VideoPlayer url={'url'} overlayText={'VIDEO_TEXT'} />);
		expect(screen.getAllByText('VIDEO_TEXT')).toBeDefined();
	});
});
