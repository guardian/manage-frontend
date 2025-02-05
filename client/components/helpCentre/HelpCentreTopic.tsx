import { captureException, captureMessage } from '@sentry/browser';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SelectedTopicObjectContext } from '../shared/SectionContent';
import { Spinner } from '../shared/Spinner';
import { WithStandardTopMargin } from '../shared/WithStandardTopMargin';
import { BackToHelpCentreLink } from './BackToHelpCentreLink';
import { HelpCentreMoreTopics } from './HelpCentreMoreTopics';
import { HelpCentreSingleTopic } from './HelpCentreSingleTopic';
import type { MoreTopics, SingleTopic } from './HelpCentreTypes';

export const HelpCentreTopic = () => {
	const [singleTopic, setSingleTopic] = useState<SingleTopic | undefined>(
		undefined,
	);
	const [moreTopics, setMoreTopics] = useState<MoreTopics | undefined>(
		undefined,
	);

	const setSelectedTopicObject = useContext(SelectedTopicObjectContext);

	const navigate = useNavigate();
	const { topicCode } = useParams();

	useEffect(() => {
		setSingleTopic(undefined);
		setMoreTopics(undefined);
		fetch(`/api/help-centre/topic/${topicCode}`)
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					captureMessage(
						`Fetching topic ${topicCode} returned ${response.status}.`,
					);
					navigate('/help-centre');
				}
			})
			.then((topicData) => {
				if (topicData.topics) {
					setMoreTopics(topicData as MoreTopics);
				} else {
					setSingleTopic(topicData as SingleTopic);
				}
			})
			.catch((error) =>
				captureException(
					`Failed to fetch topic ${topicCode}. Error: ${error}`,
				),
			);
		setSelectedTopicObject(topicCode);
	}, [topicCode, navigate, setSelectedTopicObject]);

	return (
		<>
			{getTopicComponent(topicCode, singleTopic, moreTopics)}
			<BackToHelpCentreLink />
		</>
	);
};

const getTopicComponent = (
	topicCode: string | undefined,
	singleTopic: SingleTopic | undefined,
	moreTopics: MoreTopics | undefined,
) => {
	if (singleTopic) {
		return (
			<HelpCentreSingleTopic id={topicCode ?? ''} topic={singleTopic} />
		);
	}

	if (moreTopics) {
		return (
			<HelpCentreMoreTopics
				id={topicCode ?? ''}
				moreTopics={moreTopics}
			/>
		);
	}

	return (
		<WithStandardTopMargin>
			<Spinner loadingMessage={'Fetching topic...'} />
		</WithStandardTopMargin>
	);
};
