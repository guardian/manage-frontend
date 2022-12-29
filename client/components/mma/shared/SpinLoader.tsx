import {Spinner} from "../../shared/Spinner";
import {WithStandardTopMargin} from "../../shared/WithStandardTopMargin";

interface SpinLoaderProps {
	readonly loadingMessage: string;
	readonly inline?: true;
	readonly spinnerScale?: number;
}

export default function SpinLoader({
									   loadingMessage,
									   inline,
									   spinnerScale
								   }: SpinLoaderProps) {
	return inline ? (
		<Spinner
			loadingMessage={loadingMessage}
			inline={inline}
			scale={spinnerScale}
		/>
	) : (
		<WithStandardTopMargin>
			<Spinner loadingMessage={loadingMessage} />
		</WithStandardTopMargin>
	);
}
