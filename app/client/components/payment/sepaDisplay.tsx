import React from 'react';

interface SepaDisplayProps {
	accountName: string;
	iban: string;
}

export const SepaDisplay = ({ accountName, iban }: SepaDisplayProps) => {
	return (
		<div>
			<div>SEPA</div>

			<div>
				{accountName}
				<br />
				{iban}
			</div>
		</div>
	);
};
