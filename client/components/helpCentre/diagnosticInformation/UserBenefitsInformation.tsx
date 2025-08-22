import { useEffect, useState } from 'react';
import { z } from 'zod';
import { fetchWithDefaultParameters } from '../../../utilities/fetch';

const userBenefitsSchema = z.object({
	benefits: z.array(z.string()),
});
type UserBenefits = z.infer<typeof userBenefitsSchema>;

async function fetchUserBenefitsData(): Promise<UserBenefits | 'failed'> {
	const response = await fetchWithDefaultParameters('/api/benefits/me');
	if (response.ok) {
		const json = await response.json();
		return userBenefitsSchema.parse(json);
	}
	return 'failed';
}

export const UserBenefitsInformation = () => {
	const [userBenefits, setUserBenefits] = useState<
		UserBenefits | 'failed' | 'loading'
	>('loading');

	useEffect(() => {
		fetchUserBenefitsData()
			.then((userBenefitsData) => setUserBenefits(userBenefitsData))
			.catch((e) => {
				setUserBenefits('failed');
				console.error(e);
			});
	}, []);

	if (userBenefits === 'loading') {
		return (
			<>
				<h3>Account Information</h3>
				<p>Loading...</p>
			</>
		);
	}

	if (userBenefits === 'failed') {
		return (
			<>
				<h3>User Benefits Information</h3>
				<p>
					User is not logged in / no user benefits information
					available
				</p>
			</>
		);
	}

	return (
		<>
			<h3>User Benefits Information:</h3>
			<ul>
				{userBenefits.benefits.map((benefit) => (
					<li key={benefit}>{benefit}</li>
				))}
			</ul>
		</>
	);
};
