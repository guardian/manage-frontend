import { css } from '@emotion/react';
import { from, neutral, space, textSans } from '@guardian/source-foundations';
import { useState } from 'react';
import type { CallCentreNumbersProps } from './CallCentreNumbers';

const contactUsStyles = {
	margin: '0 0 10px',
	paddingRight: '5px',
};

const callCenterStyles = css({
	display: 'flex',
	flexWrap: 'wrap',
	textAlign: 'left',
	fontWeight: 'normal',
});

export type PhoneRegionKey = 'US' | 'AUS' | 'UK & ROW';

interface PhoneRegion {
	key: PhoneRegionKey;
	title: string;
	openingHours: string[];
	phoneNumbers: Array<{ phoneNumber: string; suffix?: string }>;
	additionalOpeningHoursInfo?: string;
}

const EMAIL_ADDRESS: string = 'customer.help@theguardian.com';

const PHONE_DATA: PhoneRegion[] = [
	{
		key: 'UK & ROW',
		title: 'United Kingdom, Europe and rest of world',
		openingHours: [
			'8am - 6pm Monday - Friday (GMT/BST)',
			'9am - 6pm Saturday - Sunday (GMT/BST)',
		],
		phoneNumbers: [
			{
				phoneNumber: '+44 (0) 330 333 6767',
			},
		],
	},
	{
		key: 'AUS',
		title: 'Australia, New Zealand, and Asia Pacific',
		openingHours: ['9am - 5pm Monday - Friday (AEDT)'],
		phoneNumbers: [
			{
				phoneNumber: '1800 773 766',
				suffix: '(within Australia)',
			},
			{
				phoneNumber: '+61 28076 8599',
				suffix: '(outside Australia)',
			},
		],
	},
	{
		key: 'US',
		title: 'Canada and USA',
		openingHours: ['9am - 5pm on weekdays (EST/EDT)'],
		phoneNumbers: [
			{
				phoneNumber: '1-844-632-2010',
				suffix: '(toll free USA)',
			},
			{
				phoneNumber: '+1 917-900-4663',
				suffix: '(outside USA)',
			},
		],
	},
];

export interface CallCentreEmailAndNumbersProps extends CallCentreNumbersProps {
	hideEmailAddress?: boolean;
	phoneRegionFilterKeys?: PhoneRegionKey[];
	compactLayout?: boolean;
	collapsed?: boolean;
	openPhoneRegion?: PhoneRegionKey;
}

export const CallCentreEmailAndNumbers = (
	props: CallCentreEmailAndNumbersProps,
) => {
	const filteredPhoneData = PHONE_DATA.filter(
		(phoneRegion) =>
			!props.phoneRegionFilterKeys ||
			props.phoneRegionFilterKeys.includes(phoneRegion.key),
	);

	const openPhoneRegionIndex = filteredPhoneData.findIndex(
		(region) => region.key === props.openPhoneRegion,
	);

	const initialIndex = props.collapsed
		? -1
		: props.openPhoneRegion
		? openPhoneRegionIndex
		: 0;

	const [indexOfOpenSection, setIndexOfOpenSection] =
		useState<number>(initialIndex);

	const sectionTitleCss = (isOpen: boolean, isNotFirstOption: boolean) => `
    ${textSans.medium()};
    margin: 0;
    padding: ${space[4]}px ${space[4] * 2 + 15}px ${space[4]}px ${space[4]}px;
    position: relative;
    cursor: pointer;
    ${
		isOpen
			? `
        font-weight: bold;
        background-color: ${neutral['97']};
        border-bottom: 1px solid ${neutral['86']};
      `
			: ''
	}
    :after {
      content: "";
      display: block;
      width: 7px;
      height: 7px;
      border-top: 2px solid ${neutral['7']};
      border-right: 2px solid ${neutral['7']};
      position: absolute;
      top: 50%;
      transform: ${
			isOpen
				? 'translateY(-1px) rotate(-45deg)'
				: 'translateY(-3.5px) rotate(135deg)'
		};
      transition: transform 0.4s;
      right: 17px;
    }
    ${
		isNotFirstOption &&
		`
      :before {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: ${neutral['86']}
      }
    `
	}
  `;

	const showHideSpanCss = css`
		display: none;
		user-select: none;
	`;

	const showHideSpanWideCss = css`
		${from.desktop} {
			display: block;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			right: 32px;
			font-weight: normal;
			font-size: 0.75rem;
		}
	`;

	const innerSectionCss = (isOpen: boolean) => `
    display: ${isOpen ? 'block' : 'none'};
    background-color: ${neutral['97']};
    padding: ${space[4]}px;
  `;

	const innerSectionPCss = `
    ${textSans.medium()};
    margin-bottom: 0;
    & + p {
      margin-top: ${space[4]}px;
    }
  `;

	const innerSectionBlockSpanCss = `
      display: block;
      margin-bottom: 4px;
      font-weight: bold;
  `;

	const innerSectionTitleCss = `
    ${textSans.medium()};
    margin: 6px 0 4px;
  `;

	const handleSectionClick = (sectionNum: number) => () => {
		setIndexOfOpenSection(
			indexOfOpenSection === sectionNum ? -1 : sectionNum,
		);
	};
	return (
		<div css={callCenterStyles}>
			{props.prefixText && (
				<p css={contactUsStyles}>{props.prefixText}</p>
			)}
			<div
				css={css`
					width: 100%;
					border: 1px solid ${neutral['86']};
				`}
			>
				{filteredPhoneData.map((phoneRegion, index) => {
					const isOpen = index === indexOfOpenSection;
					const isNotFirstOption = index > 0;
					return (
						<div key={phoneRegion.key}>
							<h2
								css={css`
									${sectionTitleCss(isOpen, isNotFirstOption)}
								`}
								onClick={handleSectionClick(index)}
							>
								{phoneRegion.title}
								<span
									css={[
										showHideSpanCss,
										!props.compactLayout &&
											showHideSpanWideCss,
									]}
									aria-hidden="true"
								>
									{isOpen ? 'Hide' : 'Show'}
								</span>
							</h2>
							<div
								css={css`
									${innerSectionCss(isOpen)}
								`}
							>
								{!props.hideEmailAddress && (
									<>
										<h4
											css={css`
												${innerSectionTitleCss}
											`}
										>
											Email:
										</h4>
										<span
											css={css`
												${textSans.medium({
													fontWeight: 'bold',
												})};
												word-break: break-word;
											`}
										>
											{EMAIL_ADDRESS}
										</span>
									</>
								)}
								{!props.hideEmailAddress && (
									<h4
										css={css`
											${innerSectionTitleCss}
										`}
									>
										Phone:
									</h4>
								)}
								<p
									css={css`
										${innerSectionPCss}
									`}
								>
									{phoneRegion.phoneNumbers.map(
										({ phoneNumber, suffix }) => (
											<span
												key={phoneNumber}
												css={css`
													${innerSectionBlockSpanCss}
												`}
											>
												{phoneNumber}
												{suffix && (
													<span
														css={css`
															font-weight: normal;
														`}
													>
														{' '}
														{suffix}
													</span>
												)}
											</span>
										),
									)}
									{phoneRegion.openingHours.map(
										(
											openingHourLine,
											openingHoursLineKey,
										) => (
											<span
												key={openingHoursLineKey}
												css={css`
													display: block;
												`}
											>
												{openingHourLine}
											</span>
										),
									)}
								</p>
								{phoneRegion.additionalOpeningHoursInfo && (
									<p
										css={css`
											${innerSectionPCss}
										`}
									>
										{phoneRegion.additionalOpeningHoursInfo}
									</p>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
