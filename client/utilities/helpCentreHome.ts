import { conf } from '../../server/config';
import { helpCentreHomeForStage } from '../../server/helpCentreRedirect';

export const getHelpCentreHomeUrl = (): string =>
	helpCentreHomeForStage(conf.STAGE);
