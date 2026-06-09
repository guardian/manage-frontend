import { css } from '@emotion/react';
import { palette, space, textSans15 } from '@guardian/source/foundations';

interface TaxExclusiveNoticeProps {
	extraTaxApplies?: boolean;
}

const noticeCss = css`
	${textSans15};
	color: ${palette.neutral[46]};
	margin: ${space[2]}px 0 0;
`;

export const TaxExclusiveNotice = ({
	extraTaxApplies,
}: TaxExclusiveNoticeProps) => {
	if (!extraTaxApplies) {
		return null;
	}

	return (
		<p css={noticeCss}>All prices shown exclude Tax. Taxes may apply.</p>
	);
};
