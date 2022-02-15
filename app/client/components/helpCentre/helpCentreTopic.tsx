import { navigate, RouteComponentProps } from '@reach/router';
import { captureException, captureMessage } from '@sentry/browser';
import React, { useEffect, useState } from 'react';
import { SelectedTopicObjectContext } from '../sectionContent';
import { Spinner } from '../spinner';
import { WithStandardTopMargin } from '../WithStandardTopMargin';
import { BackToHelpCentreLink } from './BackToHelpCentreLink';
import { HelpCentreMoreTopics } from './helpCentreMoreTopics';
import { HelpCentreSingleTopic } from './helpCentreSingleTopic';
import { MoreTopics, SingleTopic } from './HelpCentreTypes';

export interface HelpCentreTopicProps extends RouteComponentProps {
	topicCode?: string;
}

const HelpCentreTopic = (props: HelpCentreTopicProps) => {
	const [singleTopic, setSingleTopic] = useState<SingleTopic | undefined>(
		undefined,
	);
	const [moreTopics, setMoreTopics] = useState<MoreTopics | undefined>(
		undefined,
	);

	const setSelectedTopicObject = React.useContext(SelectedTopicObjectContext);

	useEffect(() => {
		setSingleTopic(undefined);
		setMoreTopics(undefined);
		fetch(`/api/help-centre/topic/${props.topicCode}`)
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					captureMessage(
						`Fetching topic ${props.topicCode} returned ${response.status}.`,
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
					`Failed to fetch topic ${props.topicCode}. Error: ${error}`,
				),
			);
		setSelectedTopicObject(props.topicCode);
	}, [props.topicCode]);

	return (
		<>
			{getTopicComponent(props.topicCode, singleTopic, moreTopics)}
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
