export const getFirstDateInMonth = () => {
	const firstDateInMonth = new Date();
	firstDateInMonth.setDate(1);
	firstDateInMonth.setMinutes(0);
	firstDateInMonth.setHours(0);
	firstDateInMonth.setSeconds(0);
	firstDateInMonth.setMilliseconds(0);

	return firstDateInMonth;
};
