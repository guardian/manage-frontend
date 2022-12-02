import { css } from '@emotion/react';

interface SepaDisplayProps {
	accountName: string;
	iban: string;
	inline?: boolean;
}

export const SepaDisplay = ({
	accountName,
	iban,
	inline,
}: SepaDisplayProps) => {
	return (
		<p
			css={css`
				margin: 0;
			`}
		>
			{inline ? (
				`SEPA ${accountName} ${iban}`
			) : (
				<>
					SEPA
					<br />
					{accountName}
					<br />
					{iban}
				</>
			)}
		</p>
	);
};
