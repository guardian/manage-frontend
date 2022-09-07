export const base64FromFile = (file: File) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.addEventListener(
			'load',
			() => {
				resolve(
					removeDataUrlDeclarationFromBase64(reader.result as string),
				);
			},
			false,
		);

		reader.addEventListener(
			'error',
			() => {
				reject();
			},
			false,
		);

		reader.readAsDataURL(file);
	});
};

export const MAX_FILE_ATTACHMENT_SIZE_KB = 5000;

export const VALID_IMAGE_FILE_MIME_TYPES: string[] = [
	'image/png',
	'image/jpeg',
	'image/jpg',
	'image/gif',
	'application/pdf',
];

export const VALID_IMAGE_FILE_EXTENSIONS: string[] = [
	'.png',
	'.jpeg',
	'.jpg',
	'.gif',
	'.pdf',
];

export const validateBase64FileSize = (fileBase64: string) => {
	// calculate the file size of the image based on the base64 string, as per:
	// https://softwareengineering.stackexchange.com/questions/288670/know-file-size-with-a-base64-string
	const fileSizeInKb = (fileBase64.length * (3 / 4)) / 1024;
	return fileSizeInKb <= MAX_FILE_ATTACHMENT_SIZE_KB;
};

export const validateImageFileExtension = (fileName: string) =>
	VALID_IMAGE_FILE_EXTENSIONS.filter((validFileExtension) =>
		fileName.endsWith(validFileExtension),
	).length > 0;

const removeDataUrlDeclarationFromBase64 = (fileBase64: string) =>
	fileBase64.replace(/data:(.*)base64,/m, '');
