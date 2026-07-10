import { css } from '@emotion/react';
import { palette, space, textSans15 } from '@guardian/source/foundations';

interface TaxExclusiveNoticeProps {
	taxExclusive?: boolean;
}

const noticeCss = css`
	${textSans15};
	color: ${palette.neutral[46]};
	margin: ${space[5]}px 0 0;
`;

export const TaxExclusiveNotice = ({
	taxExclusive,
}: TaxExclusiveNoticeProps) => {
	if (!taxExclusive) {
		return null;
	}

	return <p css={noticeCss}>Taxes may apply to future payments.</p>;
};
