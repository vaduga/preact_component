// import { html, render, Component } from 'https://unpkg.com/htm/preact/index.mjs?module'
//yarn start build deploy 
import { render, Component } from 'preact';
import { useState } from 'preact/hooks' 

import { html } from 'htm/react';

import Person from './components/person.js';

console.log('Привет, Мир!!');

const App = () => {
	let initState = {
		persons: [ { id: 0, name: 'MaryxxxJ', age: 10, end: 2 }, { id: 1, name: 'Jane', age: 15, end: 5 } ]
	};

	const [state, setState] = useState(initState)

	const increase = (name) => {
		console.log(name + ' minus');

		setState((state) => ({
			persons: state.persons.map((el) => (el.name === name ? { ...el, age: el.age + 1 } : el))
		}));
	};

	const decrease = (name) => {
		console.log(name + ' minus');

		setState((state) => ({
			persons: state.persons.map((el) => (el.name === name ? { ...el, age: el.age - 1 } : el))
		}));
	};

			const f = () => console.log('clicker');
		const list = state.persons.map(
			(person) => html`
<${Person}
				name=${person.name}
				age=${person.age}
				end=${person.end}
				clickPlus=${() => increase(person.name)}
				clickMinus=${() => decrease(person.name)}
			/>`
		);

		return html`
		<div>
			<h1>Hello, Wosrldаа!</h1>
			${list}
		</div>
	`;
	
}

render(html`<${App}/>`, document.querySelector('#root'));
