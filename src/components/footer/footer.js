import React from 'react';
import styled from 'styled-components';

const FooterContainer = ({ className }) => {
	const [city, setCity] = React.useState('');
	const [temperature, setTemperature] = React.useState('');
	const [weather, setWeather] = React.useState('');

	React.useEffect(() => {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?q=Irkutsk&lang=ru&units=metric&appid=93f45a076c278d60ec109faa7ac08bed'
		)
			.then((res) => res.json())
			.then(({ name, main, weather }) => {
				setCity(name);
				setTemperature(Math.round(main.temp));
				setWeather(weather[0].description);
			});
	}, []);

	return (
		<div className={className}>
			<div>
				<div>Блог веб-разработчика</div>
				<div>web@developer.ru</div>
			</div>
			<div>
				<div>
					{city},{' '}
					{new Date().toLocaleDateString('ru', {
						day: 'numeric',
						month: 'long'
					})}
				</div>
				<div>
					{temperature}, {weather}
				</div>
			</div>
		</div>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 120px;
	width: 1000px;
	padding: 20px 40px;
	font-weight: bold;
	box-shadow: 0px 2px 15px #000;
	background-color: #fff;
`;
