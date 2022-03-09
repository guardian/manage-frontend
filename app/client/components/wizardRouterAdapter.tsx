import { neutral } from '@guardian/src-foundations/palette';
import { RouteComponentProps, Router } from '@reach/router';
import * as React from 'react';
import {
	GroupedProductType,
	ProductType,
	WithGroupedProductType,
	WithProductType,
} from '../../shared/productTypes';
import { LinkButton } from './buttons';
import { Navigate } from 'react-router-dom';
interface RouteableProps extends RouteComponentProps {
	path: string;
}

interface RoutablePropsWithChildren extends RouteableProps {
	children?: any; // TODO JSX.Element | React.Component<RouteableProps> | React.FC<RouteableProps> | React.Component<MultiRouteableProps> | React.FC<MultiRouteableProps>[];
}

export type RouteableStepProps = RoutablePropsWithChildren &
	WithProductType<ProductType>;

export type RouteableStepPropsForGrouped = RoutablePropsWithChildren &
	WithGroupedProductType<GroupedProductType>;

export interface MultiRouteableProps extends RouteableStepProps {
	// TODO refactor this out by adding type params to children
	linkLabel: string;
}

export const visuallyNavigateToParent = (
	toRoot?: boolean,
) => (
	<Navigate to={toRoot ? '/' : '..'} replace />
);

export const ReturnToAccountOverviewButton = () => (
	<LinkButton
		to="/"
		text="Return to your account"
		colour={neutral[100]}
		textColour={neutral[0]}
		hollow
		left
	/>
);

interface CurrentStepProps {
	path: '/';
	content: React.ReactNode;
}

const CurrentStep = (props: CurrentStepProps) => <div>{props.content}</div>;

interface WizardStepProps {
	routeableStepProps: RouteableStepProps;
	children: React.ReactNode;
}

export const WizardStep = (props: WizardStepProps) => (
	<>
		<Router>
			<CurrentStep path="/" content={props.children} />
		</Router>
		{props.routeableStepProps.children}
	</>
);
