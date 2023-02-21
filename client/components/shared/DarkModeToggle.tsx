export const DarkModeToggle = () => {
	const savedDarkMode = localStorage.getItem('darkMode') === 'dark';
	const darkModeToggleClick = () => {
		localStorage.setItem('darkMode', !savedDarkMode ? 'dark' : 'light');
		location.reload();
	};
	return (
		<a href="" onClick={darkModeToggleClick}>
			{savedDarkMode ? '🌕' : '🌑'}
		</a>
	);
};
