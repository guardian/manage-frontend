import { captureException, captureMessage } from '@sentry/browser';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SelectedTopicObjectContext } from '../sectionContent';
import { Spinner } from '../spinner';
import { WithStandardTopMargin } from '../WithStandardTopMargin';
import { BackToHelpCentreLink } from './BackToHelpCentreLink';
import { HelpCentreMoreTopics } from './helpCentreMoreTopics';
import { HelpCentreSingleTopic } from './helpCentreSingleTopic';
import { MoreTopics, SingleTopic } from './HelpCentreTypes';

const HelpCentreTopic = () => {
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
				topicData.topics
					? setMoreTopics(topicData as MoreTopics)
					: setSingleTopic(topicData as SingleTopic);
			})
			.catch((error) =>
				captureException(
					`Failed to fetch topic ${topicCode}. Error: ${error}`,
				),
			);
		setSelectedTopicObject(topicCode);
	}, [topicCode]);

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

export default HelpCentreTopic;