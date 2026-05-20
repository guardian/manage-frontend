import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSans15,
	textSans17,
	textSansBold15,
	textSansBold17,
	textSansBold20,
} from '@guardian/source/foundations';
import {
	Button,
	themeButtonReaderRevenueBrand,
} from '@guardian/source/react-components';
import { Pill } from '../../shared/Pill';

interface DigitalPlusUpgradeBannerProps {
	headline?: string;
	body?: string;
	onUpgradeClick: () => void;
	isLoading?: boolean;
	disabled?: boolean;
}

const DEFAULT_HEADLINE =
	'Unlock Digital plus for an extra £2 per month for the next 6/12 months';
const DEFAULT_BODY =
	'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.';

const containerCss = css`
	background-color: ${palette.labs[400]};
	border-radius: ${space[2]}px;
	margin-top: ${space[5]}px;
	display: flex;
	flex-direction: column-reverse;
	gap: ${space[3]}px;

	${from.tablet} {
		flex-direction: row;
		gap: 0px;
	}
`;

const contentCss = css`
	padding: 0px ${space[3]}px ${space[5]}px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: ${space[1]}px;

	${from.tablet} {
		padding: ${space[3]}px 0px ${space[6]}px ${space[3]}px;
	}
`;

const headlineCss = css`
	${textSansBold17};
	margin: 0;
	margin-top: ${space[1]}px;

	${from.tablet} {
		${textSansBold20};
	}
`;

const bodyCss = css`
	${textSans15};
	margin: 0;

	${from.tablet} {
		${textSans17};
	}
`;

const pillCss = css`
	${textSansBold15};
	padding: ${space[1]}px ${space[2]}px;
`;

const buttonCss = css`
	margin-top: ${space[4]}px;
	width: 100%;

	${from.tablet} {
		margin-top: ${space[5]}px;
		width: auto;
	}
`;

const imageSlotCss = css`
	width: 100%;
	height: 100%;
	padding: ${space[3]}px ${space[6]}px 0 ${space[6]}px;
	background: linear-gradient(
			180deg,
			rgba(0, 0, 0, 0) 0%,
			rgba(0, 0, 0, 0.1) 100%
		),
		${palette.labs[400]};

	${from.tablet} {
		min-width: 0;
		background: none;
		align-self: flex-end;
		padding: ${space[3]}px ${space[9]}px 0 ${space[9]}px;
	}
`;

export const DigitalPlusUpgradeBanner = ({
	headline = DEFAULT_HEADLINE,
	body = DEFAULT_BODY,
	onUpgradeClick,
	isLoading = false,
	disabled = false,
}: DigitalPlusUpgradeBannerProps) => {
	return (
		<div css={containerCss}>
			<div css={contentCss}>
				<Pill
					copy="Limited offer"
					colour={palette.sport[400]}
					copyColour={palette.neutral[100]}
					additionalCss={pillCss}
				/>
				<h2 css={headlineCss}>{headline}</h2>
				<p css={bodyCss}>{body}</p>
				<Button
					aria-label="Upgrade to Digital plus"
					data-cy="digital-plus-upgrade-banner-button"
					size="small"
					priority="primary"
					theme={themeButtonReaderRevenueBrand}
					isLoading={isLoading}
					disabled={disabled || isLoading}
					cssOverrides={buttonCss}
					onClick={onUpgradeClick}
				>
					Upgrade now
				</Button>
			</div>
			<img
				css={imageSlotCss}
				src="https://i.guim.co.uk/img/media/e50f3d80d7c49eec39b1a6a38ba31e874d15b64e/0_0_1024_768/1024.png?width=1024&quality=100&s=225a4b0690b45169ad54ff50c9975006"
			/>
		</div>
	);
};
