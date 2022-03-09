import { useLocation } from 'react-router-dom';

const exceptions: string[] = ['/help-centre/contact-us/'];


const shouldScrollToTop = (path: string) =>
	!exceptions.some((exception) => path.startsWith(exception));

export const ScrollToTop = () => {
	const location = useLocation();

	if (location && document) {
		if (shouldScrollToTop(location.pathname)) {
			// tslint:disable-next-line:no-object-mutation
			document.body.scrollTop = 0; // For Safari
			// tslint:disable-next-line:no-object-mutation
			document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
		}
	}
	return <></>;
};
